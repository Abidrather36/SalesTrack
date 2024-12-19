using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;

namespace salesTrack.Application.Abstraction.IService
{
    public interface ILeadService
    {
        Task<ApiResponse<IEnumerable<LeadResponseModel>>> AddMultipleLeads(List<LeadRequestModel> leadModels);
        Task<ApiResponse<LeadResponseModel>> AddLead(LeadRequestModel model);
        Task<ApiResponse<LeadResponseModel>> DeleteLead(Guid id);
        Task<ApiResponse<LeadResponseModel>> GetLeadById(Guid leadId);
        Task<ApiResponse<IEnumerable<LeadResponseModel>>> GetAllLeadsAsync();
        Task<ApiResponse<IEnumerable<LeadResponseModel>>> GetAllLeadsByCompany();
        Task<ApiResponse<LeadResponseModel>> UpdateLead(LeadUpdateModel model);
        Task<ApiResponse<LeadProcessResponseModel>> AddLeadProcessStep(LeadProcessRequestModel model);
        Task<ApiResponse<LeadProcessResponseModel>> UpdateLeadProcessSteps(LeadProcessUpdateModel model);
        Task<ApiResponse<LeadCommentsResponseModel>> AddComment(LeadCommentsRequestModel model);
        Task<ApiResponse<LeadFollowUpdateResponse>> AddLeadFollowUpdate(LeadFollowUpdateRequest model);
        Task<ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>> ShowLeadFollowUpHistory(Guid leadId);
        Task<ApiResponse<bool>> AddLeadFollowUpHistory(FollowUpReq model);
        Task<ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>> TodaysFollowUpDate(TodaysFollowUpdateRequest model);
        Task<ApiResponse<TimeSheetResponseModel>> AddTimeSheet(TimeSheetRequestModel model);
        Task<ApiResponse<IEnumerable<TimeSheetResponseModel>>> GetAllTimeSheets();
        Task<ApiResponse<TimeSheetResponseModel>> GetTimeSHeetById(Guid id);
        Task<ApiResponse<TimeSheetResponseModel>> UpdateTimeSheet(UpdateTimeSheetModel model);
        Task<ApiResponse<TimeSheetResponseModel>> DeleteTimeSheetById(Guid id);
        Task<ApiResponse<LeadCompanyNameResponse>> AddLeadCompanyName(LeadCompanyNameRequest model);
        Task<ApiResponse<IEnumerable<LeadCompanyNameResponse>>> AddLeadCompanyNameBulkInsert(List<LeadCompanyNameRequest> models);
        Task<ApiResponse<IEnumerable<LeadCompanyNameResponse>>> GetAllCompaniesLeads();
        Task<ApiResponse<LeadCompanyNameResponse>> DeleteLeadCompany(Guid id);
        Task<ApiResponse<UpdateLeadCompany>> UpdateLeadCompany(UpdateLeadCompany model);
        Task<ApiResponse<IEnumerable<LeadCategoryResponse>>> GetAllLeadCategoriesByCompany();
        Task<ApiResponse<IEnumerable<CompanyTimeSheetResponse>>> GetAllTimeSheetStepsByCompany();


    }
}
