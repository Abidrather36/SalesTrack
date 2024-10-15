using salesTrack.Application.Abstraction.Iidentity;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Application.Utils;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Enums;
using salesTrack.Domain.Models;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Abstraction.IRepository;
using SalesTrack.Application.Common;
using SalesTrack.Application.Shared;
using SalesTrack.Domain.Entities;
using System.ComponentModel.Design;

namespace salesTrack.Application.Services
{
    public class LeadService : ILeadService
    {
        private readonly ILeadRepository leadRepository;
        private readonly IContextService contextService;
        private readonly IUserRepository userRepository;
        private readonly ICompanyRepository companyRepository;
        private readonly ILeadSourceRepository leadSourceRepository;

        public LeadService(ILeadRepository leadRepository,
                          IContextService contextService,
                          IUserRepository userRepository,
                          ICompanyRepository companyRepository,
                          ILeadSourceRepository leadSourceRepository)
        {
            this.leadRepository = leadRepository;
            this.contextService = contextService;
            this.userRepository = userRepository;
            this.companyRepository = companyRepository;
            this.leadSourceRepository = leadSourceRepository;
        }

        public async Task<ApiResponse<LeadResponseModel>> AddLead(LeadRequestModel model)
        {
            try
            {
                var salesExecutiveId = contextService.UserId();
                var salesEx = await userRepository.GetUserById(salesExecutiveId);
                var companyId = salesEx!.CompanyId;
                if (salesExecutiveId == Guid.Empty)
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
                }

                if (await userRepository.IsExistsAsync(x => x.Email == model.Email))
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.LeadManagement.LeadEmailExist, HttpStatusCodes.BadRequest);
                }

                MasterUser user = new()
                {
                    Id = Guid.NewGuid(),
                    Name = model.Name,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    Password = AppEncryption.GenerateRandomPassword(model.Email!),
                    Salt = AppEncryption.GenerateSalt(),
                    UserRole = UserRole.Lead,
                    CreatedDate = DateTime.UtcNow,
                    DeletedDate = DateTime.UtcNow,
                    IsActive = true,
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
                    LeadSourceId = model.LeadSourceId != Guid.Empty ? model.LeadSourceId : throw new ArgumentException("lead SouceId is Required"),
                    IsActive = true,
                    Comment = model.Comment,
                    CreatedBy = salesExecutiveId,
                    ModifiedBy = Guid.Empty,
                    FinalStatus = FinalStatus.Open,
                    CreatedDate = DateTime.Now,
                    DeletedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now,
                    CompanyId = companyId,



                };

                var leadAdded = await leadRepository.InsertAsync(lead);

                if (leadAdded <= 0)
                {

                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                }
                else
                {
                    var sourceLead = await leadRepository.GetLeadById(lead!.Id);
                    var returnVal = await userRepository.GetByIdAsync(sourceLead.AssignToId);
                    sourceLead.AssignedTo = returnVal!.Name;
                    var returnCompany = await companyRepository.GetByIdAsync(lead.CompanyId);
                    sourceLead.CompanyName = returnCompany!.CompanyName;




                    return ApiResponse<LeadResponseModel>.SuccessResponse(sourceLead, ApiMessages.LeadManagement.LeadAddedSuccessfully, HttpStatusCodes.Created);

                }


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

                if (leads is not null)
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
                    user.PhoneNumber = model.PhoneNumber;

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
                    lead.Comment = model.Comment;

                    var updatedLead = await leadRepository.UpdateAsync(lead);
                    var assignUserId = await userRepository.GetByIdAsync(lead.AssignTo);



                    if (updatedLead > 0)
                    {
                        var leadSource = await leadSourceRepository.GetByIdAsync(lead.LeadSourceId);
                        if (leadSource is null)
                        {
                            return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.LeadSourceManagement.InvalidLeadSourceData, HttpStatusCodes.BadRequest);
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
                                AssignedTo = assignUserId != null ? assignUserId.Name : null,
                                Comment = model.Comment,
                                IsActive = true,
                                FinalStatus = model.FinalStatus,
                                UserRole = UserRole.Lead

                            };
                            return ApiResponse<LeadResponseModel>.SuccessResponse(leadResponseModel, ApiMessages.LeadManagement.LeadUpdateSuccess, HttpStatusCodes.OK);
                        }
                    }
                    else
                    {
                        return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);

                    }
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<LeadResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }
        }


        /*   public async Task<ApiResponse<ProcessResponseModel>> UpdateLeadProcessSteps(LeadProcessUpdateModel model)
           {
               try
               {
                   var processStep = await leadRepository.GetLeadProcessStepById(model.Id);
                   if (processStep is null)
                   {
                       return ApiResponse<ProcessResponseModel>.ErrorResponse(ApiMessages.Process.ProcessNotFound, HttpStatusCodes.BadRequest);
                   }
                   else
                   {
                       processStep.StepDescription = model.StepDescription;

                       var result = await leadRepository.UpdateLeadProcessStep(processStep);
                       if (result > 0)
                       {
                           return ApiResponse<ProcessResponseModel>.SuccessResponse(new ProcessResponseModel
                           {
                               Id = processStep.Id,
                               StepDescription = processStep.StepDescription,
                           }, ApiMessages.Process.ProcessUpdatedSuccessfully, HttpStatusCodes.OK);
                       }
                       else
                       {
                           return ApiResponse<ProcessResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);

                       }
                   }
               }

               catch (Exception ex)
               {
                     return ApiResponse<ProcessResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

               }

           }*/

        public async Task<ApiResponse<LeadProcessResponseModel>> AddLeadProcessStep(LeadProcessRequestModel model)
        {
            try
            {
                var loggedInUser = contextService.UserId();

                if (loggedInUser == Guid.Empty)
                {
                    return ApiResponse<LeadProcessResponseModel>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
                }
                else
                {
                    var leadId = await leadRepository.IsExistsAsync(x => x.Id == model.LeadId);

                    LeadProcessSteps leadSteps = new()
                    {
                        Id = Guid.NewGuid(),
                        StepDescription = model.StepDescription,
                        AdminProcessStepId = model.AdminProcessStepId,
                        LeadId = model.LeadId,
                        CreatedBy = loggedInUser,
                        ModifiedBy = Guid.Empty,
                        ModifiedDate = DateTime.Now,
                        CreatedDate = DateTime.Now,
                        IsActive = true,
                        DeletedBy = Guid.Empty,

                    };
                    var leadProcessAdded = await leadRepository.AddLeadProcessStep(leadSteps);
                    if (leadProcessAdded > 0)
                    {
                        LeadProcessResponseModel leadProcessResponseModel = new()
                        {
                            Id = leadSteps.Id,
                            StepDescription = leadSteps.StepDescription,
                            AdminProcessStepId = leadSteps.AdminProcessStepId,
                            LeadId = leadSteps.LeadId,
                        };
                        return ApiResponse<LeadProcessResponseModel>.SuccessResponse(leadProcessResponseModel, ApiMessages.Process.ProcessAddedSuccessfully, HttpStatusCodes.Created);
                    }
                    else
                    {
                        return ApiResponse<LeadProcessResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                    }
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<LeadProcessResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }
        }

        public async Task<ApiResponse<LeadProcessResponseModel>> UpdateLeadProcessSteps(LeadProcessUpdateModel model)
        {
            try
            {
                var loggedInUser = contextService.UserId();
                if (loggedInUser == Guid.Empty)
                {
                    return ApiResponse<LeadProcessResponseModel>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
                }

                var leadProcessStep = await leadRepository.GetLeadProcessStepById(model.Id);
                if (leadProcessStep is null)
                {
                    return ApiResponse<LeadProcessResponseModel>.ErrorResponse(ApiMessages.Process.ProcessNotFound, HttpStatusCodes.BadRequest);

                }
                else
                {

                    leadProcessStep.StepDescription = model.StepDescription;
                    leadProcessStep.AdminProcessStepId = model.AdminProcessStepId;
                    leadProcessStep.LeadId = model.LeadId;
                    leadProcessStep.ModifiedBy = loggedInUser;
                    leadProcessStep.ModifiedDate = DateTime.Now;


                    var leadProcessResponse = await leadRepository.UpdateLeadProcessStep(leadProcessStep);
                    if (leadProcessResponse > 0)
                    {
                        LeadProcessResponseModel leadProcessResponseModel = new()
                        {
                            Id = leadProcessStep.Id,
                            AdminProcessStepId = leadProcessStep.AdminProcessStepId,
                            LeadId = leadProcessStep.LeadId,
                        };
                        return ApiResponse<LeadProcessResponseModel>.SuccessResponse(leadProcessResponseModel, ApiMessages.Process.ProcessUpdatedSuccessfully, HttpStatusCodes.OK);
                    }
                    else
                    {
                        return ApiResponse<LeadProcessResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);

                    }
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<LeadProcessResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }
        }

        public async Task<ApiResponse<LeadCommentsResponseModel>> AddComment(LeadCommentsRequestModel model)
        {
            try
            {
                var loggedInUser = contextService.UserId();
                if (loggedInUser == Guid.Empty)
                {
                    return ApiResponse<LeadCommentsResponseModel>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
                }
                else
                {
                    LeadComments comments = new()
                    {
                        Id = Guid.NewGuid(),
                        LeadId = model.LeadId,
                        Text = model.Text,
                        CreatedBy = loggedInUser,
                        CreatedDate = DateTime.Now,
                        ModifiedBy = Guid.Empty,
                        ModifiedDate = null,
                        IsActive = true,
                        DeletedBy = Guid.Empty,
                        DeletedDate = null,

                    };
                    var commentAdded = await leadRepository.AddComment(comments);
                    if (commentAdded > 0)
                    {
                        LeadCommentsResponseModel leadCommentsResponseModel = new()
                        {
                            Id = comments.Id,
                            Text = comments.Text,
                            LeadId = comments.LeadId,
                        };
                        return ApiResponse<LeadCommentsResponseModel>.SuccessResponse(leadCommentsResponseModel, "Comment added Successfully", HttpStatusCodes.Created);
                    }
                    else
                    {
                        return ApiResponse<LeadCommentsResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                    }
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<LeadCommentsResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }
        }

        public async Task<ApiResponse<LeadFollowUpdateResponse>> AddLeadFollowUpdate(LeadFollowUpdateRequest model)
        {
            try
            {
                var loggedInUser = contextService.UserId();
                if (loggedInUser.Equals(Guid.Empty))
                {
                    return ApiResponse<LeadFollowUpdateResponse>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
                }
                else
                {
                    FollowUpDate followUpDate = new()
                    {
                        Id = Guid.NewGuid(),
                        Date = model.Date,
                        Time = model.Time,
                        LeadId = model.LeadId,
                        CreatedBy = loggedInUser,
                        CreatedDate = DateTime.Now,
                        DeletedBy = Guid.Empty,
                        DeletedDate = null,
                        ModifiedBy = Guid.Empty,
                        ModifiedDate = null
                    };
                    var followUpdateAdded = await leadRepository.AddfollowUpdate(followUpDate);
                    if (followUpdateAdded > 0)
                    {
                        LeadFollowUpdateResponse response = new()
                        {
                            Id = followUpDate.Id,
                            Date = followUpDate.Date,
                            Time = followUpDate.Time,
                            LeadId = followUpDate.LeadId,
                        };
                        return ApiResponse<LeadFollowUpdateResponse>.SuccessResponse(response, "FollowUpdate added Successfully", HttpStatusCodes.Created);
                    }
                    else
                    {
                        return ApiResponse<LeadFollowUpdateResponse>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                    }

                }
            }
            catch (Exception ex)
            {
                return ApiResponse<LeadFollowUpdateResponse>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }
        }

        public async Task<ApiResponse<IEnumerable<LeadResponseModel>>> GetAllLeadsByCompany()
        {
            var executiveId = contextService.UserId();
            var user = await userRepository.GetUserById(executiveId);
            var leads = await leadRepository.GetAllLeadsByCompanyId(user.CompanyId);
            if (leads == null || !leads.Any())
            {
                return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse($"no Leads Found", HttpStatusCodes.NotFound);
            }

            foreach (var lead in leads)
            {
                var assignUser = await userRepository.GetByIdAsync(lead.AssignToId);
                lead.AssignedTo = assignUser?.Name;
            }
            if (leads is null)
            {
                return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse($"{ApiMessages.TechnicalError}", HttpStatusCodes.InternalServerError);

            }
            else
            {
                return ApiResponse<IEnumerable<LeadResponseModel>>.SuccessResponse(leads, "Leads Fetched by CompanyId", HttpStatusCodes.InternalServerError);


                return default;
            }
        }

        /*   public async Task<ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>> ShowLeadFollowUpHistory(Guid leadId)
           {
               var loggedInUser = contextService.UserId();
               var leadHistory=await leadRepository.ShowLeadHistory(leadId);
               if(leadHistory is null || !leadHistory.Any())
               {
                   return ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>.ErrorResponse("An error occurred while retrieving the lead follow-up history.", HttpStatusCodes.Conflict, ApiMessages.TechnicalError);

               }
               var res= leadHistory.Select(ls => new LeadFollowUpHistoryResponse
               {
                   ClientName = ls.ClientName,
                   LeadComments = ls.LeadComments,
                   LeadProcessStep = ls.LeadProcessStep,
                   Email = ls.Email,
                   FollowUpDate = ls.FollowUpDate,
                   PhoneNumber = ls.PhoneNumber
               });
               else if()
               else
               {
                   var sortedLeadHistory = leadHistory.OrderBy(l => l.FollowUpDate).ToList();

                   return ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>.SuccessResponse(leadHistory, "Leads History Fetched Succesfully", HttpStatusCodes.OK);

               }
           }
       }*/
        /* public async Task<ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>> ShowLeadFollowUpHistory(Guid leadId)
         {
             var loggedInUser = contextService.UserId();
             var leadHistory = await leadRepository.ShowLeadHistory(leadId);

             if (leadHistory is null || !leadHistory.Any())
             {
                 return ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>.ErrorResponse(
                     "An error occurred while retrieving the lead follow-up history.",
                     HttpStatusCodes.Conflict,
                     ApiMessages.TechnicalError
                 );
             }

             var validLeadHistory = leadHistory
                 .Where(ls => ls.FollowUpDate != null && !string.IsNullOrWhiteSpace(ls.LeadProcessStep))
                 .ToList();

             if (!validLeadHistory.Any())
             {
                 return ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>.ErrorResponse(
                     "No valid follow-up history found.",
                     HttpStatusCodes.NotFound,
                     "No history found with valid FollowUpDate or LeadProcessStep."
                 );
             }

             var res = validLeadHistory.Select(ls => new LeadFollowUpHistoryResponse
             {
                 ClientName = ls.ClientName,
                 LeadComments = ls.LeadComments,
                 LeadProcessStep = ls.LeadProcessStep,
                 Email = ls.Email,
                 FollowUpDate = ls.FollowUpDate,
                 PhoneNumber = ls.PhoneNumber
             });

             var sortedLeadHistory = res.OrderBy(l => l.FollowUpDate).ToList();

             return ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>.SuccessResponse(
                 sortedLeadHistory,
                 "Leads history fetched successfully.",
                 HttpStatusCodes.OK
             );
         }
     }*/
        public async Task<ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>> ShowLeadFollowUpHistory(Guid leadId)
        {

            var leadHistory = await leadRepository.ShowLeadHistory(leadId);

            if (leadHistory == null || !leadHistory.Any())
            {
                return ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>.ErrorResponse(
                    "An error occurred while retrieving the lead follow-up history.",
                    HttpStatusCodes.Conflict,
                    ApiMessages.TechnicalError
                );
            }

            // Filter records where FollowUpDate or LeadProcessStep are null
            var validLeadHistory = leadHistory
                .Where(ls => ls.FollowUpDate != null && !string.IsNullOrWhiteSpace(ls.LeadProcessStep))
                .ToList();

            if (!validLeadHistory.Any())
            {
                return ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>.ErrorResponse(
                    "No valid follow-up history found.",
                    HttpStatusCodes.NotFound,
                    "No history found with valid FollowUpDate or LeadProcessStep."
                );
            }

            // Sort valid records by FollowUpDate
            var sortedLeadHistory = validLeadHistory.OrderBy(l => l.FollowUpDate).ToList();

            return ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>.SuccessResponse(
                sortedLeadHistory,
                "Leads history fetched successfully.",
                HttpStatusCodes.OK
            );
        }

        public async Task<ApiResponse<bool>> AddLeadFollowUpHistory(FollowUpReq model)
        {
            var loggedInUser=contextService.UserId();
            var result=await leadRepository.AddProcessStep(model);
            if(result)
            {
                return ApiResponse<bool>.SuccessResponse(true,"Lead Managed Successfully",HttpStatusCodes.OK);
            }
            else
            {
                return ApiResponse<bool>.ErrorResponse(ApiMessages.TechnicalError,HttpStatusCodes.BadRequest);

            }
            /*  var newFollowUp = leadRepository.AddProcessStep(new FollowUpReq()
              {
                  LeadId = 
                  Comment = "Test comment fololow re",
                  Date = new DateTime(),
                  StepProcessId = Guid.Parse("d350dd4f-53d6-45bc-b82c-452a85e94bda"),
                  Time = new TimeSpan()
              });*/
            /*
                        LeadComments leadComment = new()
                        {
                            Text = model.Comment,
                            LeadId=model.Id,
                            CreatedDate=DateTimeOffset.Now,
                            CreatedBy=loggedInUser

                        };
                      var commentAdded= await leadRepository.AddComment(leadComment);
                        if(commentAdded > 0)
                        {
                            LeadProcessSteps leadProcessSteps = new()
                            {
                                Id = Guid.NewGuid(),
                                AdminProcessStepId = model.AdminProcessStepId,
                                LeadId = model.Id,
                                CreatedDate = DateTimeOffset.Now,
                                CreatedBy = loggedInUser,
                            };
                          var addedLeadProcessStep=await  leadRepository.AddLeadProcessStep(leadProcessSteps);
                            if(addedLeadProcessStep > 0)
                            {
                                FollowUpDate leadFollowUpDate = new()
                                {
                                    Id = Guid.NewGuid(),
                                    Date = model.Date,
                                    Time = model.Time,
                                    LeadId = model.Id,
                                    CreatedDate = DateTimeOffset.Now,
                                    CreatedBy = loggedInUser,
                                };
                                var addedFollowUpdate=await leadRepository.AddfollowUpdate(leadFollowUpDate);
                                if(addedFollowUpdate > 0)
                                {
                                    return default;
                                }

                            }
                        }*/


            return new();
        }

        public async Task<ApiResponse<LeadFollowUpHistoryResponse>> TodaysFollowUpDate(TodaysFollowUpdateRequest  model)
        {
           var todaysFollowUpdate=await leadRepository.TodaysFollowUpdate(model);
            if(todaysFollowUpdate is null)
            {
                return  ApiResponse<LeadFollowUpHistoryResponse>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
            }
            else
            {
                return ApiResponse<LeadFollowUpHistoryResponse>.SuccessResponse(todaysFollowUpdate, ApiMessages.Success, HttpStatusCodes.Found);
            }
        }
    }
    }
public class FollowUpReq
{
    public Guid LeadId { get; set; }
    public Guid AdminProcessStepId { get; set; }
    public string? Comment { get; set; }
    public TimeSpan Time { get; set; }
    public DateTime Date { get; set; }
}