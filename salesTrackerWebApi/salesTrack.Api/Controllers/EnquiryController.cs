using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;

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

        [HttpPost]

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

        [HttpGet]

        public async Task<ApiResponse<IEnumerable<EnquiryResponseModel>>> GetAllEnquiries()
        {
            try
            {
                return await enquiryService.GetAllEnquiries();
            }
            catch(Exception ex)
            {
                throw;  
            }
        }

        [HttpGet("EnquiryById")]

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
    }
}
