using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Enums;
using salesTrack.Domain.Models;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Abstraction.IService;
using SalesTrack.Application.Common;
using SalesTrack.Domain.Entities.Models.Request;

namespace salesTrack.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;
        private readonly IUserService userService;

        public AuthController(IAuthService authService,
                               IUserService userService)
        {
            this.authService = authService;
            this.userService = userService;
        }

        [HttpPost("User-SignUp")]
        public async Task<ApiResponse<UserResponseModel>> Post(UserRequest model)
        {
            try
            {
                return await userService.AddUser(model);
            }
            catch (Exception ex)
            {
                throw ;
            }
        }

        [HttpPost("login")]
        public async Task<ApiResponse<LoginResponseModel>> Login(LoginRequestModel model)
        {
            try
            {
                return await authService.Login(model);
            }

            catch (Exception ex)
            {
                throw;
            }
        }
        [HttpPost("ChangePassword")]

        public async Task<ApiResponse<string>> ChangePassword(ChangePasswordModel model)
        {
            try
            {
                return await authService.ChangePassword(model);
            }
            catch (Exception ex) 
            {
                throw;
            }
        }
        [HttpPost("Forgetpassword")]

        public async Task<ApiResponse<string>> ForgetPassword(string email)
        {
            try
            {
                return await authService.ForgotPassword(email); 
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [HttpPost("Reset-Password")]

        public async Task<ApiResponse<string>> ResetPassword(ResetPasswordModel model)
        {
            try
            {
                return await authService.ResetPassword(model);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet("GetAllUsers")]
        public async Task<ApiResponse<IEnumerable<UserResponseModel>>> GetAllUsers( )
        {
            try
            {
                return await authService.GetAllUsers();
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [HttpGet("GetUserById{id:guid}")]
        public async Task<ApiResponse<UserResponseModel>> GetUserById(Guid id)
        {
            try
            {
                return await authService.GetUserById(id);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

    }
}
