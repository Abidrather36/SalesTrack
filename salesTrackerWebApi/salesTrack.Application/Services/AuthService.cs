using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Application.Abstraction.Jwt;
using salesTrack.Application.Utils;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using SalesTrack.Application.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository authRepository;
        private readonly IJwtProvider jwtProvider;

        public AuthService(IAuthRepository authRepository,IJwtProvider jwtProvider)
        {
            this.authRepository = authRepository;
            this.jwtProvider = jwtProvider;
        }
        public async Task<ApiResponse<LoginResponseModel>> Login(LoginRequestModel model)
        {
            try
            {
                var user = await authRepository.FirstOrDefaultAsync(x => x.Email == model.Email);
                if (user == null)
                    return ApiResponse<LoginResponseModel>.ErrorResponse(ApiMessages.Auth.InvalidCredential, HttpStatusCodes.BadRequest);

               if(! AppEncryption.ComparePassword(model.Password, user.Password, user.Salt))
                {
                    return ApiResponse<LoginResponseModel>.ErrorResponse(ApiMessages.Auth.InVaildEmailAddress, HttpStatusCodes.BadRequest);

                }
                LoginResponseModel login = new()
                {
                    UserId = user.Id,
                    FullName = user.Name,
                    Token = jwtProvider.GenerateToken(user).Token,
                    IsPasswordTemporary=user.IsPasswordTemporary,

                };
                return ApiResponse<LoginResponseModel>.SuccessResponse(login, ApiMessages.Auth.LoggedIn, HttpStatusCodes.Accepted);
            }
            catch(Exception ex)
            {
                return ApiResponse<LoginResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
            }
        }
    }
}
