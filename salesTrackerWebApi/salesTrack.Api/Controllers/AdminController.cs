using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Enums;
using salesTrack.Domain.Models;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using SalesTrack.Domain.Entities.Models.Request;

namespace salesTrack.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles =nameof(UserRole.Admin))]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService adminService;

        public AdminController(IAdminService adminService)
        {
            this.adminService = adminService;
        }
        [HttpPost("register")]
        public async Task<ApiResponse<UserResponseModel>> AddAdmin(UserRequestModel model)
        {
            try
            {
              return  await adminService.AddAdmin(model);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPost("add-process-steps")]
        public async Task<ApiResponse<AdminProcessStepResponseModel>> AddProcessStep(AdminProcessStepRequestModel model)
        {
            try
            {
                return await adminService.AddAdminProcessStep(model);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPut("update-process-steps")]
        public async Task<ApiResponse<AdminProcessStepResponseModel>> UpdateProcessStep(UpdateAdminProcessStepModel model)
        {
            try
            {
                return await adminService.UpdateAdminProcessStep(model);
            }
            catch (Exception ex)
            {
                throw ;  
            }
        }

        [HttpGet("getAll-process-steps")]
        public async Task<ApiResponse<IEnumerable<AdminProcessStepResponseModel>>> GetAllProcessSteps()
        {
            try
            {
               return await adminService.GetAllAdminProcessSteps();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet("GetById-process-step/{id:guid}")]
        public async Task<ApiResponse<AdminProcessStepResponseModel>> GetProcessStepById(Guid Id)
        {
            try
            {
                return await adminService.GetAdminProcessStepById(Id);
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        [HttpDelete("{id:guid}")]
        public async Task<ApiResponse<DeleteAdminProcessStepResponseModel>> DeleteAdminProcessStepById(Guid Id)
        {
            try
            {
                return await adminService.DeleteAdminProcessStep(Id);
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
