using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using salesTrack.Application.Abstraction.IService;
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

        [HttpPost]
        public async Task<ApiResponse<UserResponse>> Post(UserRequest model)
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
    }
}
