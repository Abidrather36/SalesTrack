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
        private readonly ILeadSourceRepository leadSourceRepository;

        public LeadService(ILeadRepository leadRepository,IContextService contextService,IUserRepository userRepository,ILeadSourceRepository leadSourceRepository)
        {
            this.leadRepository = leadRepository;
            this.contextService = contextService;
            this.userRepository = userRepository;
            this.leadSourceRepository = leadSourceRepository;
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

                if (leadAdded <= 0)
                {

                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                }
                else
                {
                     var sourceLead = await leadRepository.GetLeadById(lead.Id);
                     sourceLead.AssignedTo = (await userRepository.GetByIdAsync(lead.AssignTo))!.Name;


                    return ApiResponse<LeadResponseModel>.SuccessResponse(sourceLead, ApiMessages.LeadManagement.LeadAddedSuccessfully, HttpStatusCodes.Created);

                }


            }
            catch (Exception ex)
            {
                return ApiResponse<LeadResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.InternalServerError);
            }
        }

        /*
                public async Task<ApiResponse<LeadResponseModel>> DeleteLead(Guid id)
                {
                    try
                    {
                       var salesExecutive= contextService.UserId();
                        var user = await userRepository.GetByIdAsync(id);
                        var lead = await leadRepository.GetByIdAsync(id);

                        if (user is null)
                        {
                            return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.User.UserNotFound, HttpStatusCodes.BadRequest);

                        }
                        else
                        {
                            user.IsActive = false;
                            user.ModifiedBy = salesExecutive;
                            user.DeletedBy = salesExecutive;    


                        }
                        if(lead is null)
                        {
                            return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.LeadManagement.LeadNotFound, HttpStatusCodes.BadRequest);

                        }
                        else
                        {
                            lead.IsActive = false;
                            lead.ModifiedBy=salesExecutive;
                            lead.DeletedBy=salesExecutive;
                        }
                        if (await userRepository.UpdateAsync(user) > 0)
                        {
                            if(await leadRepository.UpdateAsync(lead) > 0)

                            var leadDeleted = await leadRepository.GetLeadById(.Id));


                            return ApiResponse<LeadResponseModel>.SuccessResponse(leadDeleted, ApiMessages.LeadManagement.LeadDeletedSuccessfully, HttpStatusCodes.OK);
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

                }*/
        public async Task<ApiResponse<LeadResponseModel>> DeleteLead(Guid id)
        {
            try
            {
                var salesExecutive = contextService.UserId();
                var user = await userRepository.GetByIdAsync(id);
                var lead = await leadRepository.GetByIdAsync(id);

                if (user is null)
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.User.UserNotFound, HttpStatusCodes.BadRequest);
                }

                if (lead is null)
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.LeadManagement.LeadNotFound, HttpStatusCodes.BadRequest);
                }

                // Mark user as inactive and update modified/deleted fields
                user.IsActive = false;
                user.ModifiedBy = salesExecutive;
                user.DeletedBy = salesExecutive;

                // Mark lead as inactive and update modified/deleted fields
                lead.IsActive = false;
                lead.ModifiedBy = salesExecutive;
                lead.DeletedBy = salesExecutive;

                // Update the user and lead in the database
                var userUpdateResult = await userRepository.UpdateAsync(user);
                var leadUpdateResult = await leadRepository.UpdateAsync(lead);

                if (userUpdateResult > 0 && leadUpdateResult > 0)
                {
                    var leadDeleted = await leadRepository.GetLeadById(lead.Id);
                    return ApiResponse<LeadResponseModel>.SuccessResponse(leadDeleted, ApiMessages.LeadManagement.LeadDeletedSuccessfully, HttpStatusCodes.OK);
                }
                else
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                }
            }
            catch (Exception ex)
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
                 

                    var leadResponseModel = await leadRepository.GetLeadById(leadId);
                    leadResponseModel.AssignedTo = (await userRepository.GetByIdAsync(compactLead.AssignToId))!.Name;
             /*       LeadResponseModel leadResponseModel = new()
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
                        IsActive=true,
                    };*/
                    return ApiResponse<LeadResponseModel>.SuccessResponse(leadResponseModel, ApiMessages.LeadManagement.LeadFound, HttpStatusCodes.OK);

                }
            }
            catch (Exception ex)
            {
                    return ApiResponse<LeadResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);
            }
        }

        public async Task<ApiResponse<LeadResponseModel>> UpdateLead(LeadUpdateModel model)
        {
            try
            {
                var salesExecutiveId = contextService.UserId();
                if (salesExecutiveId == Guid.Empty)
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
                }
                var user = await userRepository.GetByIdAsync(model.Id);
                var lead = await leadRepository.GetByIdAsync(model.Id);


                if (user is null)
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.User.UserNotFound, HttpStatusCodes.BadRequest);

                }
                else
                {
                    user.Name = model.Name;
                    user.Email = model.Email;
                    user.CreatedBy = salesExecutiveId;
                    user.ModifiedBy = salesExecutiveId;
                    user.ModifiedDate = DateTime.UtcNow;

                    var updatedUser = await userRepository.UpdateAsync(user);


                }
                if (lead is null)
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.LeadManagement.LeadNotFound, HttpStatusCodes.BadRequest);
                }
                else
                {
                    lead.LeadSourceId = model.LeadSourceId;
                    lead.FinalStatus = model.FinalStatus;
                    lead.ModifiedBy = salesExecutiveId;
                    lead.CreatedBy = salesExecutiveId;
                    lead.ModifiedDate = DateTime.UtcNow;
                    lead.AssignTo = model.AssignTo;
                    lead.IsActive = true;

                    var updatedLead = await leadRepository.UpdateAsync(lead);
                    var assignUserId = await userRepository.GetByIdAsync(lead.AssignTo);



                    if (updatedLead > 0)
                    {
                        var leadSource = await leadSourceRepository.GetByIdAsync(lead.LeadSourceId);
                        if(leadSource is null)
                        {
                          return   ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.LeadSourceManagement.InvalidLeadSourceData, HttpStatusCodes.BadRequest);
                        }
                        else
                        {
                            LeadResponseModel leadResponseModel = new()
                            {
                                Id = lead.Id,
                                Name = user.Name,
                                Email = user.Email,
                                PhoneNumber = user.PhoneNumber,
                                LeadSourceId = lead.LeadSourceId,
                                LeadSourceName = leadSource.LeadSourceName,
                                AssignToId = lead.AssignTo,
                                AssignedTo = assignUserId!.Name,
                                Comments = model.Comments,
                                IsActive = true,
                                FinalStatus = model.FinalStatus,
                                UserRole=UserRole.Lead
                                
                            };
                            return ApiResponse<LeadResponseModel>.SuccessResponse(leadResponseModel, ApiMessages.LeadManagement.LeadUpdateSuccess, HttpStatusCodes.OK);
                        }
                    }
                    else
                    {
                        return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.TechnicalError , HttpStatusCodes.BadRequest);

                    }
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<LeadResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }
        }
    }
}
