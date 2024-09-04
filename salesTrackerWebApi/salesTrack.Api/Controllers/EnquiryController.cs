using Microsoft.AspNetCore.Mvc;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using SalesTrack.Application.Shared;

namespace salesTrack.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnquiryController : ControllerBase
    {
        private readonly IEnquiryService enquiryService;

        public EnquiryController(IEnquiryService enquiryService)
        {
            this.enquiryService = enquiryService;
        }

        [HttpPost("register")]

        public async Task<ApiResponse<EnquiryResponseModel>> PostEnquiry(EnquiryRequestModel model)
        {
            try
            {
                return await enquiryService.AddEnquiry(model);

            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet("getAll-enquiries")]
        public async Task<ApiResponse<IEnumerable<EnquiryResponseModel>>> GetAllEnquiries()
        {
            try
            {
                return await enquiryService.GetAllEnquiries();
            }
            catch(Exception ex)
            {
                return ApiResponse<IEnumerable<EnquiryResponseModel>>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.InternalServerError);
            }
        }

        [HttpGet("getById/{id:guid}")]

        public async Task<ApiResponse<EnquiryResponseModel>> GetEnquiryById(Guid Id)
        {
            try
            {
                return  await enquiryService.GetEnquiryById(Id);
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        [HttpDelete("{id:guid}")]
        public async Task<ApiResponse<EnquiryResponseModel>> Delete(Guid id)
        {
            try
            {
                return await enquiryService.DeleteEnquiry(id);
            }
            catch(Exception ex)
            {
                throw;  
            }
        }

        [HttpPut("UpdateEnquiry")]
        public async Task<ApiResponse<EnquiryUpdateResponse>> EnquiryUpdate(EnquiryUpdateRequest model)
        {
            try
            {
                return await enquiryService.UpdateEnquiry(model);
            }
            catch (Exception ex)
            {
                 throw;
            }
        }
    }
}
