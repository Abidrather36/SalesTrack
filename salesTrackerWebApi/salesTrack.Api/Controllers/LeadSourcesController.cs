using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Enums;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;

namespace salesTrack.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = nameof(UserRole.SalesExecutive))]
    public class LeadSourcesController : ControllerBase
    {
        private readonly ILeadSourceService leadSourceService;

        public LeadSourcesController(ILeadSourceService leadSourceService)
        {
            this.leadSourceService = leadSourceService;
        }

        [HttpPost("addLeadSource")]
        public async Task<ApiResponse<LeadSourceResponseModel>> AddLeadSource(LeadSourceRequestModel model)
        {
            try
            {
                return await leadSourceService.AddLeadSource(model);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("GetAllLeadSources")]
        public async Task<ApiResponse<IEnumerable<LeadSourceResponseModel>>> GetAllLeadSoucres()
        {
            try
            {
                return await leadSourceService.GetAllLeadSoucres();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        [HttpGet("GetLeadSourceById/{id:guid}")]
        public async Task<ApiResponse<LeadSourceResponseModel>> GetLeadSourceById(Guid id)
        {
            try
            {
                return await leadSourceService.GetLeadSourceById(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}
