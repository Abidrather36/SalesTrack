using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Application.Services;
using salesTrack.Domain.Enums;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using SalesTrack.Application.Shared;

namespace salesTrack.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = nameof(UserRole.SalesExecutive) + "," + nameof(UserRole.SalesManager) + "," + nameof(UserRole.CompanyAdmin))]
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

        [HttpDelete("deleteLeadById/{id:guid}")]
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
        public async Task<ApiResponse<TimeSheetResponseModel>> AddTimeSheet(TimeSheetRequestModel model)
        {
            try
            {
                /*model.Date = model.Date.AddDays(1);*/
                return await leadService.AddTimeSheet(model);
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }
        [HttpGet("getTimeSheetById/{id:guid}")]
        public async Task<IActionResult> GetTimeSheetById(Guid id)
        {
            try
            {
                return Ok(await leadService.GetTimeSHeetById(id));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
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


        [HttpDelete("deleteTimeSheetById/{id:guid}")]
        public async Task<IActionResult> DeleteTimeSheet(Guid id)
        {
            try
            {
                return Ok(await leadService.DeleteTimeSheetById(id));
            }
            catch (Exception ex)
            {
                throw new Exception ($"Could not delete {id}");
            }
        }

        [HttpPost("registerLeadCompany")]
        public async Task<IActionResult> AddLeadCompany(LeadCompanyNameRequest  model)
        {
            try
            {
                var res = await leadService.AddLeadCompanyName(model);
                return Ok(res);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        [HttpGet("getAllLeadCompanyNames")]
        public async Task<IActionResult> GetAllLeadCompanyNames()
        {
            try
            {
                var res = await leadService.GetAllCompaniesLeads();
                return Ok(res);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        [HttpPost("updateLeadCompany")]
        public async Task<IActionResult> UpdateLeadCompany(UpdateLeadCompany model)
        {
            try
            {
               return  Ok(await leadService.UpdateLeadCompany(model));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("deleteLeadCompanyById/{id:guid}")]
        public async Task<IActionResult> DeleteCompany(Guid id)
        {
            try
            {
                return Ok(await leadService.DeleteLeadCompany(id));
            }
            catch (Exception ex )
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("addMultipleLeads")]
        public async Task<IActionResult> AddMultipleLeads([FromBody] List<LeadMutipleRequestModel> leadModels)
        {
          
            try
            {
                var result = await leadService.AddMultipleLeads(leadModels);

                if (result.IsSuccess)
                {
                    return Ok(result);
                }

                return StatusCode((int)result.StatusCode, result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ApiResponse<string>.ErrorResponse($"An error occurred: {ex.Message}", HttpStatusCodes.InternalServerError));
            }
        }


        [HttpGet("getLeadCategoriesByCompany")]
        public async Task<IActionResult> GetLeadCategory()
        {
            try
            {
                return Ok(await leadService.GetAllLeadCategoriesByCompany());
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
                
            }
        }
        [HttpGet("GetAllTimeSheetStepsByCompany")]
        public async Task<IActionResult> GetAllTimeSheetStepsByCompany()
        {
            try
            {
                return Ok(await leadService.GetAllTimeSheetStepsByCompany());
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
                return Ok(await leadService.GetAllProjectsByUser());

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


    }
}
