﻿using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;

namespace salesTrack.Application.Abstraction.IService
{
    public interface ILeadService
    {
        Task<ApiResponse<LeadResponseModel>> AddLead(LeadRequestModel model);
        Task<ApiResponse<LeadResponseModel>> DeleteLead(Guid id);   
        Task<ApiResponse<LeadResponseModel>> GetLeadById(Guid leadId);
        Task<ApiResponse<IEnumerable<LeadResponseModel>>> GetAllLeadsAsync();
        Task<ApiResponse<LeadResponseModel>> UpdateLead(LeadUpdateModel model);
        Task<ApiResponse<ProcessResponseModel>> AddProcessSteps(ProcessRequestModel model);
        Task<ApiResponse<ProcessResponseModel>> UpdateProcessSteps(ProcessUpdateModel model);

    }
}
