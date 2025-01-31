using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Abstraction.IRepository;

namespace salesTrack.Application.Abstraction.IRepository
{
    public interface ILeadRepository:IBaseRepository<Lead>
    {
        Task<int> AddLeadsAsync(List<Lead> models);
        Task<Lead> AddLead(LeadRequestModel model,Guid userId,Guid id);
        Task<LeadResponseModel> GetLeadById(Guid leadId);
        Task<IEnumerable<LeadResponseModel>> GetAllLeadsByCompanyId(Guid id,Guid assignTo);
        Task<IEnumerable<LeadResponseModel>> GetAllLeadsAsync(Guid companyId);
        Task<int> AddLeadProcessStep(LeadProcessSteps model);
        Task<int> UpdateLeadProcessStep(LeadProcessSteps model);
        Task<LeadProcessSteps> GetLeadProcessStepById(Guid id);
        Task<int> AddComment(LeadComments model);
        Task<int> AddfollowUpdate(FollowUpDate model);
        Task<IEnumerable<LeadFollowUpHistoryResponse>> ShowLeadHistory(Guid leadId);
        Task<bool> AddProcessStep(FollowUpReq model);
        Task<IEnumerable<LeadFollowUpHistoryResponse>> TodaysFollowUpdate(TodaysFollowUpdateRequest models,Guid id,Guid userId);
        Task<int> AddTimeSheet(TimeSheet model);
        Task<IEnumerable<TimeSheetResponseModel>> GetAllTimeSheetsByUser(Guid? userId = null, DateTimeOffset? startDate = null, DateTimeOffset? endDate = null);
        Task<int> UpdateTimeSheet(TimeSheet model);
        Task<TimeSheet> GetTimeSheetById(Guid id);
        Task<int> AddLeadCategory(LeadCategory model);
        Task<IEnumerable<LeadCategoryResponse>> GetLeadCategories(Guid companyId);
        Task<LeadCategory?> GetLeadCategoryById(Guid? id);
        Task<int> UpdateLeadCategory(LeadCategory model);
        Task<int> AddLeadCompanyName(LeadCompany model);
        Task<LeadCompany?> GetLeadCompanyByName(string leadCompanyName);
        Task<bool> IsLeadCompanyExists(string leadCompanyName);
        Task<int> AddLeadCompanyNamesBulk(List<LeadCompany> models);
        Task<LeadCompany> GetLeadCompanyNameById(Guid? id); 
        Task<IEnumerable<LeadCompanyNameResponse>> GetAllLeadCompanyNames(Guid companyId);
        Task<int> UpdateLeadCompany(LeadCompany model);
        Task<IEnumerable<LeadResponseModel>> GetLeadDetailsByIdsAsync(List<Guid> ids);
        Task<LeadSource?> GetLeadSoureByName(string leadSourceName);
    
       

    }
}
