using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Enums;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using System.Net;

namespace salesTrack.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = nameof(UserRole.SalesExecutive))]
    public class LeadsController : ControllerBase
    {
        private readonly ILeadService leadService;

        public LeadsController(ILeadService leadService)
        {
            this.leadService = leadService;
        }

        [HttpPost("register")]

        public async Task<IActionResult> AddLead(LeadRequestModel model)
        {
            try
            {
                var res = await leadService.AddLead(model);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetLeadById/{id:guid}")]

        public async Task<IActionResult> GetLeadById(Guid id)
        {
            try
            {
                var res = await leadService.GetLeadById(id);
                return Ok(res);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("Get-All-Leads")]

        public async Task<ApiResponse<IEnumerable<LeadResponseModel>>> GetAllLeads()
        {
            try
            {
                return await leadService.GetAllLeadsAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("GetAllLeads-ByCompany")]
        public async Task<ApiResponse<IEnumerable<LeadResponseModel>>> GetAllLeadsByCompanyId()
        {
            try
            {
                return await leadService.GetAllLeadsByCompany();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpDelete("Delete-Lead/{id:guid}")]
        public async Task<ApiResponse<LeadResponseModel>> DeleteLead(Guid id)
        {
            try
            {
                return await leadService.DeleteLead(id);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [HttpPost("Update-Lead")]
        public async Task<ApiResponse<LeadResponseModel>> UpdateLead(LeadUpdateModel model)
        {
            try
            {
                return await leadService.UpdateLead(model);
            }
            catch (Exception ex)
            {
                throw;
            }

        }
        [HttpPost("addLeadProcessStep")]
        public async Task<ApiResponse<LeadProcessResponseModel>> AddLeadProcessStep(LeadProcessRequestModel model)
        {
            try
            {
                return await leadService.AddLeadProcessStep(model);
            }
            catch (Exception ex)
            {
                throw;
            }

        }


        [HttpPost("updateLeadProcessStep")]
        public async Task<ApiResponse<LeadProcessResponseModel>> UpdateLeadProcessStep(LeadProcessUpdateModel model)
        {
            try
            {
                return await leadService.UpdateLeadProcessSteps(model);
            }

            catch (Exception ex)
            {
                throw;
            }
        }



        [HttpPost("addLeadComment")]
        public async Task<ApiResponse<LeadCommentsResponseModel>> AddLeadComment(LeadCommentsRequestModel model)
        {
            try
            {
                return await leadService.AddComment(model);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPost("addLeadFollowUpdate")]
        public async Task<ApiResponse<LeadFollowUpdateResponse>> AddLeadFollowUpdate(LeadFollowUpdateRequest model)
        {
            try
            {
                return await leadService.AddLeadFollowUpdate(model);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [HttpGet("showLeadFollowUpHistory/{leadId:guid}")]
        public async Task<ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>> ShowLeadHistory(Guid leadId)
        {
            try
            {
                return await leadService.ShowLeadFollowUpHistory(leadId);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPost("AddManageLead")]
        public async Task<ApiResponse<bool>> ManageLead(FollowUpReq model)
        {
            try
            {
                return await leadService.AddLeadFollowUpHistory(model);
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpPost("TodaysFollowUpDate")]
        public async Task<ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>> TodaysFollowUpDate(TodaysFollowUpdateRequest model)
        {
            try
            {
                return await leadService.TodaysFollowUpDate(model);
            }
            catch (Exception ex)
            {
                throw;

            }

        }
        [HttpPost("addTimeSheet")]
        public async Task<ApiResponse<TimeSheetRequestModel>> AddTimeSheet(TimeSheetRequestModel model)
        {
            try
            {
                model.Date = model.Date.AddDays(1);
                return await leadService.AddTimeSheet(model);
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }
        [HttpGet("getTimeSheetList")]
        public async Task<IActionResult> GetAllTimeSheets()
        {
            try
            {
                var res = await leadService.GetAllTimeSheets();
                return Ok(res);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpPost("UpdateTimeSheet")]
        public async Task<IActionResult> UpdateTimeSheet(UpdateTimeSheetModel model)
        {
            try
            {
                var res = await leadService.UpdateTimeSheet(model);
                return Ok(res);
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
                return Ok(await leadService.AddLeadCategory(model));

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
                return Ok(await leadService.GetAllLeadCategories());
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
                return Ok(await leadService.UpdateLeadCategory(model));
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
                return Ok(await leadService.DeleteLeadCategory(id));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
