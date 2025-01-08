using Microsoft.AspNetCore.Mvc;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Models.Request;
using SalesTrack.Application.Abstraction.IService;
using SalesTrack.Application.Common;

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

    

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestModel model)
        {
            try
            {
               return  Ok( await authService.Login(model));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
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
        [HttpPost("forgetPassword/{email}")]

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
        [HttpPost("refresh-Token")]
        public async Task<IActionResult> RefreshToken(RefreshTokenRequestModel model)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


    }
}
