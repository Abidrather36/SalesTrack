using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;

namespace salesTrack.Application.Abstraction.IService
{
    public interface ILeadSourceService
    {
        Task<ApiResponse<LeadSourceResponseModel>> AddLeadSource(LeadSourceRequestModel model);
        Task<ApiResponse<IEnumerable<LeadSourceResponseModel>>>GetAllLeadSoucres();
        Task<ApiResponse<LeadSourceResponseModel>> GetLeadSourceById(Guid id);
        Task<ApiResponse<LeadSourceResponseModel>> DeleteLeadSource(Guid id);
        Task<ApiResponse<LeadSourceResponseModel>> UpdateLeadSource(LeadSourceRequestModel model);
    }
}
