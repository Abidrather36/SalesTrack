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
    public class EnquiresController : ControllerBase
    {
        private readonly IEnquiryService enquiryService;

        public EnquiresController(IEnquiryService enquiryService)
        {
            this.enquiryService = enquiryService;
        }

        [HttpPost]
        public async Task<ApiResponse<EnquiryResponseModel>> PostEnquiry(EnquiryRequestModel model) =>await enquiryService.AddEnquiry(model); 
    }
}
