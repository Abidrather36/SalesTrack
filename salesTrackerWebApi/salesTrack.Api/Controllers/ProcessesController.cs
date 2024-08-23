using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers;
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

        [HttpGet("GetAll-Processes")]
        public async Task<ApiResponse<IEnumerable<ProcessResponseModel>>> GetAllProcess()
        {
            try
            {
                return await processService.GetProcessList();
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        [HttpPut("UpdateProcess")]
        public async Task<ApiResponse<ProcessResponseModel>> UpdateProcess(ProcessUpdateModel model)
        {
            try
            {
                return await processService.UpdateProcess(model);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpDelete("{id:guid}")]
        public async Task<ApiResponse<ProcessResponseModel>>DeleteProcess(Guid id)
        {
            try
            {
                return await processService.DeleteProcess(id);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet("GetById{id:guid}")]
        public async Task<ApiResponse<ProcessResponseModel>> GetProcessById(Guid id)
        {
            try
            {
                return await processService.GetProcessById(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        
    }
}
