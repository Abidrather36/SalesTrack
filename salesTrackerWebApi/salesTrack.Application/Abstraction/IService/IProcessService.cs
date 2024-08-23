using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;

namespace salesTrack.Application.Abstraction.IService
{
    public interface IProcessService
    {
        Task<ApiResponse<ProcessResponseModel>> AddProcess(ProcessRequestModel model);
        Task<ApiResponse<ProcessResponseModel>> UpdateProcess(ProcessUpdateModel model);
        Task<ApiResponse<IEnumerable<ProcessResponseModel>>> GetProcessList();
        Task<ApiResponse<ProcessResponseModel>> DeleteProcess(Guid id);
        Task<ApiResponse<ProcessResponseModel>> GetProcessById(Guid id);
    }
}