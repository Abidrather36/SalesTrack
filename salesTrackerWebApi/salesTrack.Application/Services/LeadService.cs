using salesTrack.Application.Abstraction.Iidentity;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Application.Utils;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Enums;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Abstraction.IRepository;
using SalesTrack.Application.Common;
using SalesTrack.Application.Shared;
using SalesTrack.Domain.Entities;

namespace salesTrack.Application.Services
{
    public class LeadService : ILeadService
    {
        private readonly ILeadRepository leadRepository;
        private readonly IContextService contextService;
        private readonly IUserRepository userRepository;

        public LeadService(ILeadRepository leadRepository,IContextService contextService,IUserRepository userRepository)
        {
            this.leadRepository = leadRepository;
            this.contextService = contextService;
            this.userRepository = userRepository;
        }
        
        public async Task<ApiResponse<LeadResponseModel>> AddLead(LeadRequestModel model)
        {
            try
            {
                var salesExecutiveId = contextService.UserId();
                if (salesExecutiveId == Guid.Empty)
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
                }

                if (await userRepository.IsExistsAsync(x => x.Email == model.Email))
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.LeadManagement.LeadEmailExist, HttpStatusCodes.BadRequest);
                }

                User user = new()
                {
                    Id = Guid.NewGuid(),
                    Name = model.Name,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    Password = AppEncryption.GenerateRandomPassword(model.Email!),
                    Salt = AppEncryption.GenerateSalt(),
                    UserRole = UserRole.Lead,
                    CreatedBy=salesExecutiveId,
                    CreatedDate = DateTime.UtcNow,
                    DeletedBy=salesExecutiveId,
                    DeletedDate = DateTime.UtcNow,  
                    IsActive=true,
                    ModifiedBy=salesExecutiveId,
                    ModifiedDate = DateTime.UtcNow, 
                };

                var userAdded = await userRepository.InsertAsync(user);
                if (userAdded <= 0)
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                }

                Lead lead = new()
                {
                    Id = user.Id,
                    AssignTo = model.AssignTo,
                    LeadSourceId = model.LeadSourceId,
                    IsActive = true,
                    Comments = model.Comments,
                    FinalStatus = model.FinalStatus,
                    CreatedBy = salesExecutiveId,
                    ModifiedBy = salesExecutiveId,
                    DeletedBy = salesExecutiveId,
                    CreatedDate = DateTime.Now,
                    DeletedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now,
                    
                };

                var leadAdded = await leadRepository.InsertAsync(lead);
                var assignUserId = await userRepository.GetByIdAsync(lead.AssignTo);

                if (leadAdded <= 0)
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                }

                LeadResponseModel leadModel = new()
                {
                    Id= lead.Id,    
                    Name=user.Name,
                    Email=user.Email,
                    AssignedTo=assignUserId!.Name,
                    AssignToId=lead.AssignTo,
                    PhoneNumber=user.PhoneNumber,
                    Comments = lead.Comments,
                    LeadSourceId = lead.LeadSourceId,
                    FinalStatus = lead.FinalStatus,
                };

                return ApiResponse<LeadResponseModel>.SuccessResponse(leadModel, ApiMessages.LeadManagement.LeadAddedSuccessfully, HttpStatusCodes.Created);
            }
            catch (Exception ex)
            {
                return ApiResponse<LeadResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.InternalServerError);
            }
        }


        public async Task<ApiResponse<LeadResponseModel>> DeleteLead(Guid id)
        {
            try
            {
               var salesExecutive= contextService.UserId();
                var user = await userRepository.GetByIdAsync(id);
                if (user is null)
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.LeadManagement.LeadNotFound, HttpStatusCodes.BadRequest);

                }
                else
                {
                    user.IsActive = false;
                    user.ModifiedBy = salesExecutive;
                    user.DeletedBy = salesExecutive;    


                }
                if (await userRepository.UpdateAsync(user) > 0)
                {
                    var lead = await leadRepository.GetLeadById(user.Id);

                    return ApiResponse<LeadResponseModel>.SuccessResponse(lead, ApiMessages.LeadManagement.LeadDeletedSuccessfully, HttpStatusCodes.OK);
                }
                else
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError}", HttpStatusCodes.BadRequest);

                }
            }
            catch(Exception ex)
            {
                return ApiResponse<LeadResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }

        }

        public async Task<ApiResponse<IEnumerable<LeadResponseModel>>> GetAllLeadsAsync()
        {
            try
            {
                    var leads = await leadRepository.GetAllLeadsAsync();
                foreach (var lead in leads)
                {
                    var assignUser = await userRepository.GetByIdAsync(lead.AssignToId);
                    lead.AssignedTo = assignUser?.Name;  
                }

                if (leads is not  null)
                {
                   
                    return ApiResponse<IEnumerable<LeadResponseModel>>.SuccessResponse(leads, ApiMessages.LeadManagement.LeadListRetrievedSuccessfully, HttpStatusCodes.OK);
                }
                return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(ApiMessages.LeadManagement.LeadNotFound, HttpStatusCodes.BadRequest);


            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.InternalServerError);

            }
        }

        public async Task<ApiResponse<LeadResponseModel>> GetLeadById(Guid leadId)
        {
            try
            {

                var compactLead = await leadRepository.GetLeadById(leadId);
                if (compactLead is null)
                {

                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.LeadManagement.LeadNotFound, HttpStatusCodes.BadRequest);
                }
                else
                {

                    var assignUserId = await userRepository.GetByIdAsync(compactLead.AssignToId);
                    LeadResponseModel leadResponseModel = new()
                    {
                        Id = compactLead.Id,
                        Name = compactLead.Name,
                        Email = compactLead.Email,
                        PhoneNumber = compactLead.PhoneNumber,
                        Comments = compactLead.Comments,
                        AssignedTo = assignUserId!.Name,
                        AssignToId = compactLead.AssignToId,
                        FinalStatus = compactLead.FinalStatus,
                        LeadSourceName = compactLead.LeadSourceName,
                        LeadSourceId = compactLead.LeadSourceId,
                        UserRole = compactLead.UserRole,

                    };
                    return ApiResponse<LeadResponseModel>.SuccessResponse(leadResponseModel, ApiMessages.LeadManagement.LeadFound, HttpStatusCodes.OK);

                }
            }
            catch (Exception ex)
            {
                    return ApiResponse<LeadResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);
            }
        }
    }
}
