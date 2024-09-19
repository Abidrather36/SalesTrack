using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SalesTrack.Application.Common;
using salesTrack.Application.Services;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using salesTrack.Application.Abstraction.IService;

namespace salesTrack.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class PortalAdminController : ControllerBase
    {
        private readonly IPortalAdminService portalAdminService;

        public PortalAdminController(IPortalAdminService portalAdminService)
        {
            this.portalAdminService = portalAdminService;
        }
        [HttpPost("AddCompany")]
        public async Task<ApiResponse<CompanyResponseModel>> AddCompany(CompanyRequestModel model)
        {
            try
            {
                return await portalAdminService.AddCompany(model);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet("Get-All-Companies")]
        public async Task<ApiResponse<IEnumerable<CompanyResponseModel>>> GetAllCompanies()
        {
            try
            {
                return await portalAdminService.GetAllComapnies();
            }

            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpDelete("Delete-Company/{id:guid}")]
        public async Task<ApiResponse<CompanyResponseModel>> DeleteCompany(Guid id)
        {
            try
            {
                return await portalAdminService.DeleteCompany(id);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet("GetCompanyById/{id:guid}")]
        public async Task<ApiResponse<CompanyResponseModel>> GetCompanyById(Guid id)
        {
            try
            {
                return await portalAdminService.GetCompanyById(id);

            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
