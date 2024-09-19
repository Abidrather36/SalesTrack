using salesTrack.Domain.Models;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;


namespace salesTrack.Application.Abstraction.IService
{
    public interface IAuthService
    {
        Task<ApiResponse<LoginResponseModel>> Login(LoginRequestModel model);
        Task<ApiResponse<string>> ChangePassword(ChangePasswordModel model);
        Task<ApiResponse<string>> ForgotPassword(string email);
        Task<ApiResponse<string>> ResetPassword(ResetPasswordModel model);



    }
}
