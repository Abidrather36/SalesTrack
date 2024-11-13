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

        public async Task<ApiResponse<LeadSourceResponseModel>> DeleteLeadSource(Guid id)
        {
            try
            {
                var loggedInUser = contextService.UserId();
                var leadSource = await leadSourceRepository.GetByIdAsync(id);
                if (leadSource is null)
                {
                    return ApiResponse<LeadSourceResponseModel>.ErrorResponse("No such Lead Source", HttpStatusCodes.BadRequest);
                }
                leadSource.IsActive = false;
                leadSource.ModifiedBy = loggedInUser;
                leadSource.ModifiedDate = DateTime.Now;

                var delResponse = await leadSourceRepository.UpdateAsync(leadSource);
                if (delResponse > 0)
                {
                    var leadSourceDeleted = await leadSourceRepository.GetByIdAsync(leadSource.Id);
                    LeadSourceResponseModel model = new()
                    {
                        Id = leadSourceDeleted.Id,
                        LeadSourceName = leadSourceDeleted.LeadSourceName,
                        Description = leadSourceDeleted.Description,
                    };
                    return ApiResponse<LeadSourceResponseModel>.SuccessResponse(model, "Lead Source Deleted Successfully", HttpStatusCodes.OK);
                }
                return ApiResponse<LeadSourceResponseModel>.ErrorResponse("Something went wrong can't delete", HttpStatusCodes.BadRequest);

            }
            catch (Exception ex)
            {
                return ApiResponse<LeadSourceResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError}: {ex.Message}", HttpStatusCodes.InternalServerError);

            }

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
                        IsActive=leadSource.IsActive,
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

        public async Task<ApiResponse<LeadSourceResponseModel>> UpdateLeadSource(LeadSourceUpdate model)
        {

            try
            {

                var loggedInUser = contextService.UserId();

                if (string.IsNullOrEmpty(model.LeadSourceName) || string.IsNullOrEmpty(model.Description))
                {
                    return ApiResponse<LeadSourceResponseModel>.ErrorResponse("Update failed. Please try again.", HttpStatusCodes.BadRequest);
                }

                var leadSource = await leadSourceRepository.GetByIdAsync(model.Id);

                if (leadSource is null)
                {
                    return ApiResponse<LeadSourceResponseModel>.ErrorResponse("Lead source not found.", HttpStatusCodes.BadRequest);
                }

                leadSource.LeadSourceName = model.LeadSourceName;
                leadSource.Description = model.Description;
                leadSource.ModifiedBy = loggedInUser;
                leadSource.ModifiedDate = DateTime.Now;

                var res = await leadSourceRepository.UpdateAsync(leadSource);
                if (res > 0)
                {
                    var responseModel = new LeadSourceResponseModel
                    {
                        Id = leadSource.Id,
                        LeadSourceName = leadSource.LeadSourceName,
                        Description = leadSource.Description
                    };

                    return ApiResponse<LeadSourceResponseModel>.SuccessResponse(responseModel, "Lead source updated successfully.");
                }
                else
                {
                    return ApiResponse<LeadSourceResponseModel>.ErrorResponse("Failed to update lead source. Please try again.", HttpStatusCodes.InternalServerError);
                }
            
            }
            catch (Exception ex)
            {
                return ApiResponse<LeadSourceResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError}: {ex.Message}", HttpStatusCodes.InternalServerError);

            }
        }

    }
}

