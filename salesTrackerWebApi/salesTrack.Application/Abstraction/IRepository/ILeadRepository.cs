using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Abstraction.IRepository;
using SalesTrack.Application.Common;

namespace salesTrack.Application.Abstraction.IRepository
{
    public interface ILeadRepository:IBaseRepository<Lead>
    {
        Task<LeadResponseModel> GetLeadById(Guid leadId);
        Task<IEnumerable<LeadResponseModel>> GetAllLeadsByCompanyId(Guid id);
        Task<IEnumerable<LeadResponseModel>> GetAllLeadsAsync();
        Task<int> AddLeadProcessStep(LeadProcessSteps model);
        Task<int> UpdateLeadProcessStep(LeadProcessSteps model);
        Task<LeadProcessSteps> GetLeadProcessStepById(Guid id);
        Task<int> AddComment(LeadComments model);
        Task<int> AddfollowUpdate(FollowUpDate model);
        Task<IEnumerable<LeadFollowUpHistoryResponse>> ShowLeadHistory(Guid leadId);
        Task<bool> AddProcessStep(FollowUpReq model);
        Task<IEnumerable<LeadFollowUpHistoryResponse>> TodaysFollowUpdate(TodaysFollowUpdateRequest models);
        Task<int> AddTimeSheet(TimeSheet model);

    }
}
