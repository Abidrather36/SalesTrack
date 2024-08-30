using salesTrack.Application.Abstraction.IEmailService;
using salesTrack.Application.Utils;
using salesTrack.Domain.Enums;
using salesTrack.Domain.Models;
using SalesTrack.Application.Abstraction.IRepository;
using SalesTrack.Application.Abstraction.IService;
using SalesTrack.Application.Common;
using SalesTrack.Application.Shared;
using SalesTrack.Domain.Entities;
using SalesTrack.Domain.Entities.Models.Request;

namespace salesTrack.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IEmailHelperService emailHelperService;

        public UserService(IUserRepository userRepository,IEmailHelperService emailHelperService)
        {
            this.userRepository = userRepository;
            this.emailHelperService = emailHelperService;
        }
        public async Task<ApiResponse<UserResponseModel>> AddUser(UserRequestModel model)
        {

            try
            {
                if (await userRepository.IsExistsAsync(x => x.Email == model.Email))
                    return ApiResponse<UserResponseModel>.ErrorResponse(ApiMessages.AlreadyAvailable, HttpStatusCodes.BadRequest);

                var newPassword = AppEncryption.GenerateRandomPassword(model.Email!);
                User user = new User()
                {

                    Name = model.Name,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    UserType = model.UserType,
                    ReportsTo = model.ReportsTo,
                    CreatedDate=DateTime.Now,
                    IsActive=true,
                    UserRole = model.UserType == UserType.SalesExecutive ? UserRole.SalesExecutive : UserRole.SalesManager,
                    

                    
                };
                user.Salt = AppEncryption.GenerateSalt();
                user.Password = AppEncryption.CreatePassword(newPassword, user.Salt);
                var dbUser = await userRepository.InsertAsync(user);
                if (dbUser > 0)
                {
                   var isEmailSent= await emailHelperService.AddRegistrationEmail(user.Email!, newPassword, user.Name!);
                    if (isEmailSent)
                    {
                        return ApiResponse<UserResponseModel>.SuccessResponse(new UserResponseModel
                        {
                            Id = user.Id,
                            Name = user.Name,
                            Email = user.Email,
                            PhoneNumber = user.PhoneNumber,
                            UserRole = user.UserRole,
                            UserType = user.UserType,
                            ReportsTo = user.ReportsTo,
                            IsPasswordTemporary = user.IsPasswordTemporary

                        }, ApiMessages.User.UserAddedSuccessfully, HttpStatusCodes.Created);
                    }
                    else
                    {
                        return ApiResponse<UserResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);                    }
                }
                else
                {
                    return ApiResponse<UserResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                }

            }
              
            catch (Exception ex)
            {
                throw;
            }
            }


    }
}
