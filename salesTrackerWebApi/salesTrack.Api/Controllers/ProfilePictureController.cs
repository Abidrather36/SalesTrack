using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Enums;
using salesTrack.Domain.Models.Request;

namespace salesTrack.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = nameof(UserRole.SalesExecutive) + "," + nameof(UserRole.SalesManager) + "," + nameof(UserRole.CompanyAdmin))]

    public class ProfilePictureController : ControllerBase
    {
        private readonly IProfilePictureService profilePictureService;

        public ProfilePictureController(IProfilePictureService profilePictureService)
        {
            this.profilePictureService = profilePictureService;
        }
        [HttpPost("uploadProfilePicture")]
        public async Task<IActionResult> UploadProfilePicture([FromForm] UploadProfilePitcureRequest model)
        {
            try
            {
                return Ok(await profilePictureService.UploadProfilePicture(model));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("getFilePath")]
        public async Task<IActionResult> GetFilePath()
       {
            try
            {
                return Ok(await profilePictureService.GetFilePath());
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
