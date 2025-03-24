using Microsoft.AspNetCore.Authorization;
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
    [Authorize(Roles = nameof(UserRole.CompanyAdmin) + "," + nameof(UserRole.SalesExecutive) + "," + nameof(UserRole.SalesManager) + "," + nameof(UserRole.PortalAdmin))]
    public class CompanyAdminController : ControllerBase
    {
        private readonly IAdminService adminService;

        public CompanyAdminController(IAdminService adminService)
        {
            this.adminService = adminService;
        }
        [HttpPost("register-User")]
        public async Task<IActionResult> AddUser([FromForm] UserRequestModel model)
        {
            try
            {
                return Ok( await adminService.AddUser(model));
            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("GetAllUsersByCompany")]
        public async Task<ApiResponse<IEnumerable<UserResponseModel>>> GetAllUsersByCompanyId()
        {
            try
            {
                return await adminService.GetAllUsersByCompanyId();
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [HttpGet("GetUserById/{id:guid}")]
        public async Task<ApiResponse<UserResponseModel>> GetUserById(Guid id)
        {
            try
            {
                return await adminService.GetUserById(id);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [HttpPost("Update-User")]
        public async Task<IActionResult> UpdateUser(UserUpdateModel model)
        {
            try
            {
                return Ok(await adminService.UpdateUser(model));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("delete-User/{id:guid}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            try
            {
                return Ok(await adminService.DeleteUser(id));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("add-process-steps")]
        public async Task<IActionResult> AddProcessStep(AdminProcessStepRequestModel model)
        {
            try
            {
                var res= await adminService.AddAdminProcessStep(model);
                return Ok(res);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("update-process-step")]
        public async Task<ApiResponse<AdminProcessStepResponseModel>> UpdateProcessStep(UpdateAdminProcessStepModel model)
        {
            try
            {
                return await adminService.UpdateAdminProcessStep(model);
            }
            catch (Exception ex)
            {
                throw;
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
        [HttpGet("getAll-Adminprocess-steps-ByCompany")]
        public async Task<IActionResult> GetAllAdminProcessStepsByCompany()
        {
            try
            {
                var res = await adminService.GetAllAdminProcessStepsByCompany();
                return Ok(res);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("GetById-process-step/{id:guid}")]
        public async Task<ApiResponse<AdminProcessStepResponseModel>> GetProcessStepById(Guid Id)
        {
            try
            {
                return await adminService.GetAdminProcessStepById(Id);
            }
            catch (Exception ex)
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
        [HttpPost("viewTimeSheet")]
        public async Task<IActionResult> GetTimeSheetForCompany(DateTimeOffset? startDate,DateTimeOffset? endDate,Guid? userId=null)
        {
            try
            {
                var res = await adminService.GetTimeSheetByUser(startDate, endDate, userId);
                return Ok(res);
            }
            catch (Exception ex)
            {
                throw new Exception (ex.Message);
            }
        }
        [HttpPost("approveCompanyTimeSheet/{userId:guid}")]
        public async Task<IActionResult> ApproveTimeSheet(Guid userId)
        {
            try
            {
               return  Ok(await adminService.UpdateTimeSheetIsApproved(userId));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }
        [HttpPost("Add-LeadCategory")]
        public async Task<IActionResult> AddLeadCategory(LeadCategoryRequest model)
        {
            try
            {
                return Ok(await adminService.AddLeadCategory(model));

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("getAll-LeadCategories")]
        public async Task<IActionResult> GetAllLeadCategories()
        {
            try
            {
                return Ok(await adminService.GetAllLeadCategories());
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }
        [HttpPost("UpdateLeadCategory")]
        public async Task<IActionResult> UpdateLeadCategory(UpdateLeadCategory model)
        {
            try
            {
                return Ok(await adminService.UpdateLeadCategory(model));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }
        [HttpDelete("deleteLeadCategory/{id:guid}")]
        public async Task<IActionResult> DeleteLeadCategory(Guid id)
        {
            try
            {
                return Ok(await adminService.DeleteLeadCategory(id));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("getListOfLeadsByCompany")]
        public async Task<IActionResult> GetAll()
        {
            try
            {

                return Ok(await adminService.GetAllLeadsByCompany());
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        [HttpPost("addCompanyTimeSheet")]
        public async Task<IActionResult> AddCompanyTimeSheet(CompanyTimeSheetRequest model)
        {
            try
            {
                return Ok(await adminService.AddCompanyTimeSheet(model));

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("getAllCompanyTimeSheets")]
        public async Task<IActionResult> GetCompanyTimeSheets()
        {
            try
            {
                return Ok(await adminService.GetCompanyTimeSheet());
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpPost("addProject")]
        public async Task<IActionResult> Addproject(ProjectRequestModel model)
        {
            try
            {
                return Ok(await adminService.AddProject(model));

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }
        [HttpGet("getProjectById/{id:guid}")]
        public async Task<IActionResult> GetProjectById(Guid id)
        {
            try
            {
                return Ok(await adminService.GetProjectById(id));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("getProjectByName/{projectName:alpha}")]
        public async Task<IActionResult> GetProjectByName(string projectName)
        {
            try
            {
                return  Ok( await adminService.GetProjectByName(projectName));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpPost("updateProject")]
        public async Task<IActionResult> UpdateProject(ProjectUpdateModel model)
        {
            try
            {
                return Ok(await adminService.UpdateProject(model));

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }
        [HttpGet("getProjectsByUser")]
        public async Task<IActionResult> GetProjectsByUser()
        {
            try
            {
                return Ok(await adminService.GetAllProjectsByUser());

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpDelete("deleteProjectcById/{id:guid}")]
        public async Task<IActionResult> DeleteProject(Guid id)
        {
            try
            {
               return Ok(await adminService.DeleteProjectById(id));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
