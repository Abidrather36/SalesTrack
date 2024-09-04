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
    public class LeadSourceService : ILeadSourceService
    {
        private readonly ILeadSourceRepository leadSourceRepository;
        private readonly IContextService contextService;

        public LeadSourceService(ILeadSourceRepository leadSourceRepository, IContextService contextService)
        {
            this.leadSourceRepository = leadSourceRepository;
            this.contextService = contextService;
        }
        public async Task<ApiResponse<LeadSourceResponseModel>> AddLeadSource(LeadSourceRequestModel model)
        {
            try
            {
                var salesExecutiveId = contextService.UserId();

                if (salesExecutiveId ==Guid.Empty)
                {
                    return ApiResponse<LeadSourceResponseModel>.ErrorResponse("Sales Executive ID is null.", HttpStatusCodes.BadRequest);
                }

                var leadSourceExists = await leadSourceRepository.IsExistsAsync(x => x.LeadSourceName == model.LeadSourceName);

                if (leadSourceExists)
                {
                    return ApiResponse<LeadSourceResponseModel>.ErrorResponse(ApiMessages.LeadSourceManagement.DuplicateLeadSourceName, HttpStatusCodes.BadRequest);
                }

                LeadSource leadSource = new()
                {
                    Id = Guid.NewGuid(),
                    LeadSourceName = model.LeadSourceName,
                    Description=model.Description,
                    CreatedBy = salesExecutiveId,
                    ModifiedBy = salesExecutiveId,
                    ModifiedDate = DateTime.Now,
                    CreatedDate = DateTime.Now,
                    DeletedBy = salesExecutiveId,
                    DeletedDate = DateTime.Now,
                    IsActive = true,
                };

                var leadSourceAdded = await leadSourceRepository.InsertAsync(leadSource);
                if (leadSourceAdded > 0)
                {
                    LeadSourceResponseModel leadSourceResponseModel = new()
                    {
                        Id = leadSource.Id,
                        LeadSourceName = leadSource.LeadSourceName,
                        Description=leadSource.Description,
                    };
                    return ApiResponse<LeadSourceResponseModel>.SuccessResponse(leadSourceResponseModel, ApiMessages.LeadSourceManagement.LeadSourceAddedSuccessfully, HttpStatusCodes.Created);
                }
                else
                {
                    return ApiResponse<LeadSourceResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<LeadSourceResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError}: {ex.Message}", HttpStatusCodes.InternalServerError);
            }
        }

        public Task<ApiResponse<LeadSourceResponseModel>> DeleteLeadSource(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<ApiResponse<IEnumerable<LeadSourceResponseModel>>> GetAllLeadSoucres()
        {
            try
            {
                var leadSources = await leadSourceRepository.GetAllAsync();
                if (leadSources.Any())
                {
                    var LeadSourceList = leadSources.Select(leadSource => new LeadSourceResponseModel
                    {
                        Id = leadSource.Id,
                        LeadSourceName = leadSource.LeadSourceName,
                        Description = leadSource.Description,
                    });
                    return ApiResponse<IEnumerable<LeadSourceResponseModel>>.SuccessResponse(LeadSourceList, ApiMessages.LeadSourceManagement.LeadSourceListRetrievedSuccessfully, HttpStatusCodes.OK);

                }
                else
                {
                    return ApiResponse<IEnumerable<LeadSourceResponseModel>>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                }
            }
            catch(Exception ex)
            {
                return ApiResponse<IEnumerable<LeadSourceResponseModel>>.ErrorResponse($"{ApiMessages.TechnicalError}: {ex.Message}", HttpStatusCodes.InternalServerError);
            }
        }

        public async Task<ApiResponse<LeadSourceResponseModel>> GetLeadSourceById(Guid id)
        {
            var leadSource=await leadSourceRepository.GetByIdAsync(id);
            if(leadSource is not null)
            {
                LeadSourceResponseModel leadSourceResponseModel = new()
                {
                    Id=leadSource.Id,
                    LeadSourceName=leadSource.LeadSourceName,
                    Description=leadSource.Description,

                };
                return ApiResponse<LeadSourceResponseModel>.SuccessResponse(leadSourceResponseModel, ApiMessages.LeadSourceManagement.LeadSourceFound, HttpStatusCodes.OK);
            }
            else
            {
                return ApiResponse<LeadSourceResponseModel>.ErrorResponse( ApiMessages.LeadSourceManagement.LeadSourceNotFound, HttpStatusCodes.BadRequest);

            }
        }

        public Task<ApiResponse<LeadSourceResponseModel>> UpdateLeadSource(LeadSourceRequestModel model)
        {
            throw new NotImplementedException();
        }
    }
    }

