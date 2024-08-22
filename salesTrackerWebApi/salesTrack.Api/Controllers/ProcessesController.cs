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
    [Authorize(Roles=nameof(UserRole.Admin))]
    public class ProcessesController : ControllerBase
    {
        private readonly IProcessService processService;

        public ProcessesController(IProcessService processService)
        {
            this.processService = processService;
        }
        [HttpPost("Process")]
        public async Task<ApiResponse<ProcessResponseModel>> AddProcess(ProcessRequestModel model)
        {
            try
            {
                return await processService.AddProcess(model);
            }
            catch (Exception ex)
            {
                {
                    throw;
                }
            }
        }
    }
}
