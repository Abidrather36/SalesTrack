using MimeKit;
using salesTrack.Application.Abstraction.IEmailService;
using salesTrack.Application.Abstraction.Iidentity;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Application.Abstraction.Jwt;
using salesTrack.Application.Utils;
using salesTrack.Domain.Enums;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using SalesTrack.Application.Shared;

namespace salesTrack.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository authRepository;
        private readonly IJwtProvider jwtProvider;
        private readonly IContextService contextService;
        private readonly IEmailHelperService emailHelperService;

        public AuthService(IAuthRepository authRepository,IJwtProvider jwtProvider,IContextService contextService,IEmailHelperService emailHelperService)
        {
            this.authRepository = authRepository;
            this.jwtProvider = jwtProvider;
            this.contextService = contextService;
            this.emailHelperService = emailHelperService;
        }

        public async  Task<ApiResponse<string>> ChangePassword(ChangePasswordModel model)
        {
            var userId=contextService.UserId();
            var user=await authRepository.GetByIdAsync(userId);
            if(user is null)
            {
                return ApiResponse<string>.ErrorResponse(ApiMessages.Auth.InvalidCredential, HttpStatusCodes.BadRequest);
            }
            if (!AppEncryption.ComparePassword(user.Password, model.OldPassowrd, user.Salt))
            {
                return ApiResponse<string>.ErrorResponse(ApiMessages.Auth.IncorrectOldPassword, HttpStatusCodes.BadRequest);
            }

           user.Password= AppEncryption.CreatePassword(model.NewPassword, user.Salt);
           var updatedUser=await authRepository.UpdateAsync(user);
            
            if(updatedUser > 0)
            {
                return ApiResponse<string>.SuccessResponse(default,ApiMessages.Auth.PasswordChangedSuccess, HttpStatusCodes.Created);
            }
            else
            {
                return ApiResponse<string>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
            }
        }

        public async Task<ApiResponse<string>> ForgotPassword(string email)
        {
            var user=await authRepository.FirstOrDefaultAsync(x => x.Email == email);
            if(user is null)
            {
                return ApiResponse<string>.ErrorResponse(ApiMessages.Auth.InVaildEmailAddress, HttpStatusCodes.BadRequest);
            }
            user.ResetCode =Convert.ToInt32( AppEncryption.GetRandomConfirmationCode());
            user.ResetExpiry = DateTime.Now.AddMinutes(5);
            await authRepository.UpdateAsync(user);

            try
            {
               var forgetEmailResponse= emailHelperService.SendForgotPasswordEmail(email,user.ResetCode);
                return ApiResponse<string>.SuccessResponse(ApiMessages.Auth.CheckEmailToResetPassword, HttpStatusCodes.OK.ToString());
            }
            catch (Exception ex)
            {
                return ApiResponse<string>.ErrorResponse("Failed to send reset code. Please try again.", HttpStatusCodes.InternalServerError);
            }
        }

        public async Task<ApiResponse<LoginResponseModel>> Login(LoginRequestModel model)
        {
            try
            {
                var user = await authRepository.FirstOrDefaultAsync(x => x.Email == model.Email);
                if (user == null)
                    return ApiResponse<LoginResponseModel>.ErrorResponse(ApiMessages.Auth.InvalidCredential, HttpStatusCodes.BadRequest);

               if(!AppEncryption.ComparePassword(user.Password!, model.Password!, user.Salt!))
               return ApiResponse<LoginResponseModel>.ErrorResponse(ApiMessages.Auth.InvalidCredential, HttpStatusCodes.BadRequest);

                var userTokens = jwtProvider.GenerateToken(user);
                LoginResponseModel login = new()
                {
                    UserId = user.Id,
                    FullName = user.Name,
                    Token = userTokens.Token,
                    IsPasswordTemporary=user.IsPasswordTemporary,
                    UserRole= userTokens.UserRole?? UserRole.Admin 
                };
                return ApiResponse<LoginResponseModel>.SuccessResponse(login, ApiMessages.Auth.LoggedIn, HttpStatusCodes.Accepted);
            }
            catch(Exception ex)
            {
                return ApiResponse<LoginResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
            }
        }

     

        public async Task<ApiResponse<string>> ResetPassword(ResetPasswordModel model)
        {
            var user=  (await authRepository.FindByAsync(x => x.ResetCode == model.ResetCode)).FirstOrDefault();
            if (user!.ResetCode <=0 )
            {
                return ApiResponse<string>.ErrorResponse(ApiMessages.Auth.InValidResetCode, HttpStatusCodes.BadRequest);
            }
            if (user.ResetExpiry <= DateTime.UtcNow)
            {
                return ApiResponse<string>.ErrorResponse(ApiMessages.Auth.LinkExpired, HttpStatusCodes.BadRequest);
            }
            user.Salt = AppEncryption.GenerateSalt();
            user.Password= AppEncryption.CreatePassword(model.NewPassword, user.Salt);
            if((await authRepository.UpdateAsync(user)) > 0)
            {
                return ApiResponse<string>.SuccessResponse(ApiMessages.Auth.PasswordResetSuccess, HttpStatusCodes.Created.ToString());
            }
            else
            {
                return ApiResponse<string>.ErrorResponse(ApiMessages.TechnicalError,HttpStatusCodes.BadRequest);
            }

        }
    }
}
