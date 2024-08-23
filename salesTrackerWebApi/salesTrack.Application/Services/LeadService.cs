using salesTrack.Application.Abstraction.Iidentity;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using SalesTrack.Application.Shared;

namespace salesTrack.Application.Services
{
    public class LeadService : ILeadService
    {
        private readonly ILeadRepository leadRepository;
        private readonly IContextService contextService;

        public LeadService(ILeadRepository leadRepository,IContextService contextService)
        {
            this.leadRepository = leadRepository;
            this.contextService = contextService;
        }
        public async Task<ApiResponse<LeadResponseModel>> AddLead(LeadRequestModel model)
        {
            var salesExecutiveId = contextService.UserId();
            if(salesExecutiveId == Guid.Empty)
            {
                return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
            }
           if(await leadRepository.IsExistsAsync(x => x.Email == model.Email))
            {
                return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.LeadManagement.LeadEmailExist, HttpStatusCodes.BadRequest);
            }

            Lead lead = new()
            {
                Id = Guid.NewGuid(),
                Email = model.Email,
                Name = model.Name,
                PhoneNumber = model.PhoneNumber,
                AssignTo = model.AssignTo,
                IsActive = true,
                Comments = model.Comments,
                LeadSource = model.LeadSource,
                FinalStatus = model.FinalStatus,
                CreatedBy = salesExecutiveId,
                ModifiedBy = salesExecutiveId,
                DeletedBy = salesExecutiveId,
                CreatedDate = DateTime.Now,
                DeletedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
            };
            var leadAdded=await leadRepository.InsertAsync(lead);
            if(leadAdded > 0)
            {
                LeadResponseModel leadModel = new()
                {
                    Id = lead.Id,
                    Name = lead.Name,
                    PhoneNumber = lead.PhoneNumber,
                    AssignTo = lead.AssignTo,
                    Email = lead.Email,
                    Comments = lead.Comments,
                    LeadSource = lead.LeadSource,
                    FinalStatus = lead.FinalStatus,
                };
                return ApiResponse<LeadResponseModel>.SuccessResponse(leadModel, ApiMessages.LeadManagement.LeadAddedSuccessfully, HttpStatusCodes.Created) ;
            }
            else
            {
                return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
            }
        
        }

        public Task<ApiResponse<LeadResponseModel>> DeleteLead(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
