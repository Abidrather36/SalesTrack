using Org.BouncyCastle.Bcpg;
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
using System.Reflection;

namespace salesTrack.Application.Services
{
    public class LeadService : ILeadService
    {
        private readonly ILeadRepository leadRepository;
        private readonly IContextService contextService;
        private readonly IUserRepository userRepository;
        private readonly ICompanyRepository companyRepository;
        private readonly ILeadSourceRepository leadSourceRepository;
        private readonly IAdminRepository adminRepository;

        public LeadService(ILeadRepository leadRepository,
                          IContextService contextService,
                          IUserRepository userRepository,
                          ICompanyRepository companyRepository,
                          ILeadSourceRepository leadSourceRepository,
                          IAdminRepository adminRepository)
        {
            this.leadRepository = leadRepository;
            this.contextService = contextService;
            this.userRepository = userRepository;
            this.companyRepository = companyRepository;
            this.leadSourceRepository = leadSourceRepository;
            this.adminRepository = adminRepository;
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



                MasterUser user = new()
                {
                    Id = Guid.NewGuid(),
                    Name = model.Name,
                    Email = model.Email,
                    PhoneNumber = string.IsNullOrEmpty(model.PhoneNumber) ? "N/A" : model.PhoneNumber,
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
                model.CompanyId = companyId;

                var leadAdded = await leadRepository.AddLead(model, user.Id, salesExecutiveId);

                if (leadAdded is null)
                {

                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                }
                else
                {
                    var sourceLead = await leadRepository.GetLeadById(leadAdded!.Id);
                    var returnVal = await userRepository.GetByIdAsync(sourceLead.AssignToId);
                    sourceLead.AssignedTo = returnVal!.Name;
                    var returnCompany = await companyRepository.GetByIdAsync(leadAdded.CompanyId);
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
                var user = contextService.UserId();
                var leads = await leadRepository.GetAllLeadsAsync(user);
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
                var leadCompany = await leadRepository.GetLeadCompanyNameById(lead.LeadCompanyId);

                if (user is null)
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.User.UserNotFound, HttpStatusCodes.BadRequest);

                }
                else
                {
                    user.Name = model.LeadName;
                    user.Email = model.Email;
                    user.ModifiedBy = salesExecutiveId;
                    user.ModifiedDate = DateTime.UtcNow;
                    user.PhoneNumber = string.IsNullOrEmpty(model.PhoneNumber) ? "N/A" : model.PhoneNumber;

                    var updatedUser = await userRepository.UpdateAsync(user);


                }
                if (lead is null)
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.LeadManagement.LeadNotFound, HttpStatusCodes.BadRequest);
                }
                if (leadCompany is null)
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse("Invalid  Lead Company", HttpStatusCodes.BadRequest);
                }
                else
                {
                    lead.LeadSourceId = model.LeadSourceId;
                    lead.FinalStatus = model.FinalStatus ?? lead.FinalStatus;
                    lead.ModifiedBy = salesExecutiveId;
                    lead.CreatedBy = salesExecutiveId;
                    lead.ModifiedDate = DateTime.UtcNow;
                    lead.AssignTo = model.AssignTo.HasValue ? model.AssignTo.Value : lead.AssignTo;
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
                                LeadName = user.Name,
                                Email = user.Email,
                                LeadCompanyName = lead.LeadCompany.LeadCompanyName,
                                PhoneNumber = user.PhoneNumber,
                                LeadSourceId = lead.LeadSourceId,
                                LeadSourceName = leadSource.LeadSourceName,
                                AssignToId = lead.AssignTo,
                                AssignedTo = assignUserId != null ? assignUserId.Name : null,
                                Comment = model.Comment,
                                IsActive = true,
                                FinalStatus = model.FinalStatus ?? lead.FinalStatus,
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

        /*  public async Task<ApiResponse<LeadResponseModel>> UpdateLead(LeadUpdateModel model)
          {
              try
              {
                  var salesExecutiveId = contextService.UserId();

                  var user = await userRepository.GetByIdAsync(model.Id);
                  if (user is null)
                      return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.User.UserNotFound, HttpStatusCodes.BadRequest);

                  var lead = await leadRepository.GetByIdAsync(model.Id);
                  if (lead is null)
                      return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.LeadManagement.LeadNotFound, HttpStatusCodes.BadRequest);

                  var leadCompany = await leadRepository.GetLeadCompanyNameById(lead.LeadCompanyId);
                  if (leadCompany is null)
                      return ApiResponse<LeadResponseModel>.ErrorResponse("Invalid Lead Company", HttpStatusCodes.BadRequest);

                  user.Name = model.LeadName;
                  user.Email = model.Email;
                  user.ModifiedBy = salesExecutiveId;
                  user.ModifiedDate = DateTime.UtcNow;
                  user.PhoneNumber = string.IsNullOrEmpty(model.PhoneNumber) ? "N/A" : model.PhoneNumber;

                  var userUpdateResult = await userRepository.UpdateAsync(user);

                  lead.LeadSourceId = model.LeadSourceId;
                  lead.FinalStatus = model.FinalStatus ?? lead.FinalStatus;
                  lead.AssignTo = model.AssignTo ?? lead.AssignTo;
                  lead.ModifiedBy = salesExecutiveId;
                  lead.ModifiedDate = DateTime.UtcNow;
                  lead.Comment = model.Comment;
                  lead.IsActive = true;

                  var leadUpdateResult = await leadRepository.UpdateAsync(lead);
                  if (leadUpdateResult <= 0)
                      return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);

                  var leadSource = await leadSourceRepository.GetByIdAsync(lead.LeadSourceId);
                  if (leadSource is null)
                      return ApiResponse<LeadResponseModel>.ErrorResponse(ApiMessages.LeadSourceManagement.InvalidLeadSourceData, HttpStatusCodes.BadRequest);

                  var assignUser = await userRepository.GetByIdAsync(lead.AssignTo);

                  LeadResponseModel leadResponseModel = new()
                  {
                      Id = lead.Id,
                      LeadName = user.Name,
                      Email = user.Email,
                      LeadCompanyName = leadCompany.LeadCompanyName,
                      PhoneNumber = user.PhoneNumber,
                      LeadSourceId = lead.LeadSourceId,
                      LeadSourceName = leadSource.LeadSourceName,
                      AssignToId = lead.AssignTo,
                      AssignedTo = assignUser?.Name,
                      Comment = model.Comment,
                      IsActive = true,
                      FinalStatus = lead.FinalStatus,
                      UserRole = UserRole.Lead
                  };

                  return ApiResponse<LeadResponseModel>.SuccessResponse(leadResponseModel, ApiMessages.LeadManagement.LeadUpdateSuccess, HttpStatusCodes.OK);
              }
              catch (Exception ex)
              {
                  return ApiResponse<LeadResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);
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
            try
            {
                var executiveId = contextService.UserId();
                var user = await userRepository.GetUserById(executiveId);
                var assignTo = user.Id;
                var leads = await leadRepository.GetAllLeadsByCompanyId(user.CompanyId, assignTo);
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
                    return ApiResponse<IEnumerable<LeadResponseModel>>.SuccessResponse(leads, "Leads Fetched by CompanyId", HttpStatusCodes.OK);
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }
        }


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
            var loggedInUser = contextService.UserId();
            var lead = await leadRepository.GetByIdAsync(model.LeadId);
            model.LeadCompanyId = lead.LeadCompanyId;
            var result = await leadRepository.AddProcessStep(model);
            if (result)
            {
                return ApiResponse<bool>.SuccessResponse(true, "Lead Managed Successfully", HttpStatusCodes.OK);
            }
            else
            {
                return ApiResponse<bool>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);

            }


        }

        public async Task<ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>> TodaysFollowUpDate(TodaysFollowUpdateRequest model)
        {
            var loggedInUser = contextService.UserId();
            var user = await userRepository.GetUserById(loggedInUser);

            var todaysFollowUpdate = await leadRepository.TodaysFollowUpdate(model, user.CompanyId, loggedInUser);

            if (todaysFollowUpdate is null || !todaysFollowUpdate.Any())
            {
                return ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>.ErrorResponse("There is No Follow Up For Such Date", HttpStatusCodes.BadRequest);
            }
            else
            {
                return ApiResponse<IEnumerable<LeadFollowUpHistoryResponse>>.SuccessResponse(todaysFollowUpdate, $"{todaysFollowUpdate.Count()} Follow Up Found", HttpStatusCodes.Found);
            }
        }

        public async Task<ApiResponse<TimeSheetResponseModel>> AddTimeSheet(TimeSheetRequestModel model)
        {
            var loggedInUser = contextService.UserId();
            var errorMessage = "";
            int timeSheetAdded;

            try
            {
                TimeSheet timeSheet = new()
                {
                    Date = model.Date,
                    TimeSheetStepName = model.TimeSheetStepName,
                    Comment = model.Comment,
                    HoursSpent = model.HoursSpent,
                    UserId = loggedInUser,
                    CreatedBy = loggedInUser,
                    CreatedDate = DateTimeOffset.Now,
                    ModifiedBy = Guid.Empty,
                    IsActive = true

                };

                int res = await leadRepository.AddTimeSheet(timeSheet);
                if (res > 0)
                {
                    TimeSheetResponseModel response = new()
                    {
                        Comment = timeSheet.Comment,
                        TimeSheetStepName = timeSheet.TimeSheetStepName,
                        HoursSpent = timeSheet.HoursSpent,
                        IsActive = timeSheet.IsActive,
                        Date = timeSheet.Date
                    };
                    return ApiResponse<TimeSheetResponseModel>.SuccessResponse(response, "Time Sheet Created Successfully ", HttpStatusCodes.OK);
                }
                return ApiResponse<TimeSheetResponseModel>.ErrorResponse("Time sheet not added", HttpStatusCodes.BadRequest);

            }
            catch (Exception ex)
            {
                errorMessage = "something went wrong while adding" + ex.Message;
                return ApiResponse<TimeSheetResponseModel>.ErrorResponse(errorMessage, HttpStatusCodes.InternalServerError);
            }
        }

        public async Task<ApiResponse<IEnumerable<TimeSheetResponseModel>>> GetAllTimeSheets()
        {
            var user = contextService.UserId();
            if (user == Guid.Empty)
            {
                return ApiResponse<IEnumerable<TimeSheetResponseModel>>.ErrorResponse("UnIdentitifed User ", HttpStatusCodes.BadRequest);
            }
            var timeSheets = await leadRepository.GetAllTimeSheetsByUser(user);
            return ApiResponse<IEnumerable<TimeSheetResponseModel>>.SuccessResponse(timeSheets, $"{timeSheets.Count()} TimeSheets Found", HttpStatusCodes.OK);
        }

        public async Task<ApiResponse<TimeSheetResponseModel>> UpdateTimeSheet(UpdateTimeSheetModel model)
        {
            try
            {
                var loggedInUser = contextService.UserId();
                if (loggedInUser == Guid.Empty)
                {
                    return ApiResponse<TimeSheetResponseModel>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
                }

                var timeSheet = await leadRepository.GetTimeSheetById(model.Id);
                if (timeSheet is null)
                {
                    return ApiResponse<TimeSheetResponseModel>.ErrorResponse("TimeSheetNotFound", HttpStatusCodes.BadRequest);
                }

                timeSheet.Date = model.Date;
                timeSheet.HoursSpent = model.HoursSpent;
                timeSheet.Comment = model.Comment;
                timeSheet.ModifiedBy = loggedInUser;
                timeSheet.ModifiedDate = DateTime.Now;

                var updateResult = await leadRepository.UpdateTimeSheet(timeSheet);
                if (updateResult > 0)
                {
                    var timeSheetResponse = new TimeSheetResponseModel
                    {
                        Id = timeSheet.Id,
                        Date = timeSheet.Date,
                        DateString = timeSheet.Date.ToString(),
                        HoursSpent = timeSheet.HoursSpent,
                        Comment = timeSheet.Comment
                    };
                    return ApiResponse<TimeSheetResponseModel>.SuccessResponse(timeSheetResponse, "TimeSheetUpdatedSuccessfully", HttpStatusCodes.OK);
                }
                else
                {
                    return ApiResponse<TimeSheetResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<TimeSheetResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);
            }
        }

        public async Task<ApiResponse<LeadCompanyNameResponse>> AddLeadCompanyName(LeadCompanyNameRequest model)
        {
            try
            {
                var salesExecutiveId = contextService.UserId();
                var salesEx = await userRepository.GetUserById(salesExecutiveId);
                var companyId = salesEx!.CompanyId;

                if (model.LeadCompanyName == string.Empty && model.Description == string.Empty)
                {
                    return ApiResponse<LeadCompanyNameResponse>.ErrorResponse("please enter values", HttpStatusCodes.BadRequest);
                }
                var leadCompanyNames = await leadRepository.GetAllLeadCompanyNames(companyId);
                if (leadCompanyNames.Any(x => x.LeadCompanyName == model.LeadCompanyName))
                {
                    return ApiResponse<LeadCompanyNameResponse>.ErrorResponse("Lead CompanyName Already Exits", HttpStatusCodes.BadRequest);
                }
                LeadCompany leadCompanyName = new()
                {
                    Id = Guid.NewGuid(),
                    LeadCompanyName = model.LeadCompanyName,
                    Description = !string.IsNullOrEmpty(model.Description) ? model.Description : "N/A",
                    IsActive = true,
                    CreatedBy = salesExecutiveId,
                    CreatedDate = DateTime.Now,
                    CompanyId = companyId
                };
                var res = await leadRepository.AddLeadCompanyName(leadCompanyName);
                if (res > 0)
                {
                    LeadCompanyNameResponse leadCompanyNameResponse = new()
                    {
                        Id = leadCompanyName.Id,
                        LeadCompanyName = leadCompanyName.LeadCompanyName,
                        Description = leadCompanyName.Description,
                        IsActive = true,
                        CompanyId = leadCompanyName.CompanyId,
                    };
                    return ApiResponse<LeadCompanyNameResponse>.SuccessResponse(leadCompanyNameResponse, "LeadCompany Added Successfully", HttpStatusCodes.OK);
                }
                return ApiResponse<LeadCompanyNameResponse>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);

            }
            catch (Exception ex)
            {
                return ApiResponse<LeadCompanyNameResponse>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }
        }

        public async Task<ApiResponse<IEnumerable<LeadCompanyNameResponse>>> GetAllCompaniesLeads()
        {
            var salesExeutiveId = contextService.UserId();
            var user = await userRepository.GetUserById(salesExeutiveId);
            var companyId = user.CompanyId;

            var leadCompanies = await leadRepository.GetAllLeadCompanyNames(companyId);
            if (leadCompanies.Any())
            {
                return ApiResponse<IEnumerable<LeadCompanyNameResponse>>.SuccessResponse(leadCompanies, $"{leadCompanies.Count()} Found", HttpStatusCodes.OK);
            }
            return ApiResponse<IEnumerable<LeadCompanyNameResponse>>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
        }

        public async Task<ApiResponse<LeadCompanyNameResponse>> DeleteLeadCompany(Guid id)
        {
            var salesExectiveId = contextService.UserId();
            var companyName = await leadRepository.GetLeadCompanyNameById(id);
            if (companyName is null)
            {
                return ApiResponse<LeadCompanyNameResponse>.ErrorResponse("company Name not Found", HttpStatusCodes.BadRequest);
            }
            companyName.IsActive = false;
            companyName.ModifiedBy = salesExectiveId;
            companyName.DeletedDate = DateTime.UtcNow;

            var res = await leadRepository.UpdateLeadCompany(companyName);
            if (res > 0)
            {
                return ApiResponse<LeadCompanyNameResponse>.SuccessResponse(new LeadCompanyNameResponse
                {
                    Id = companyName.Id,
                    LeadCompanyName = companyName.LeadCompanyName,
                    Description = companyName.Description,
                    IsActive = companyName.IsActive,
                }, "Company Deleted Successfully", HttpStatusCodes.BadRequest);

            }

            return ApiResponse<LeadCompanyNameResponse>.ErrorResponse("Can't Delete Company,please try again", HttpStatusCodes.BadRequest);
        }

        public async Task<ApiResponse<UpdateLeadCompany>> UpdateLeadCompany(UpdateLeadCompany model)
        {
            try
            {
                var salesExecutiveId = contextService.UserId();
                var companyName = await leadRepository.GetLeadCompanyNameById(model.Id);
                if (companyName is null)
                {
                    return ApiResponse<UpdateLeadCompany>.ErrorResponse("company Name not Found", HttpStatusCodes.BadRequest);

                }
                if (model.LeadCompanyName == string.Empty || model.Description == string.Empty)
                {
                    return ApiResponse<UpdateLeadCompany>.ErrorResponse("textbox can't be empty", HttpStatusCodes.BadRequest);
                }
                companyName.LeadCompanyName = model.LeadCompanyName;
                companyName.Description = model.Description;
                companyName.ModifiedBy = salesExecutiveId;
                companyName.ModifiedDate = DateTime.Now.Date;

                var companyNameUpdated = await leadRepository.UpdateLeadCompany(companyName);
                if (companyNameUpdated > 0)
                {
                    UpdateLeadCompany updateLeadCompany = new()
                    {
                        Id = companyName.Id,
                        LeadCompanyName = companyName.LeadCompanyName,
                        Description = companyName.Description,

                    };
                    return ApiResponse<UpdateLeadCompany>.SuccessResponse(updateLeadCompany, "Lead Company updated Successfully", HttpStatusCodes.OK);

                }
                return ApiResponse<UpdateLeadCompany>.ErrorResponse("Can't Update Please try again", HttpStatusCodes.BadRequest);
            }
            catch (Exception ex)
            {
                return ApiResponse<UpdateLeadCompany>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }

        }

        public async Task<ApiResponse<IEnumerable<LeadCategoryResponse>>> GetAllLeadCategoriesByCompany()
        {
            try
            {
                var loggedInUser = contextService.UserId();
                var user = await userRepository.GetUserById(loggedInUser);

                var leadCategories = await leadRepository.GetLeadCategories(user.CompanyId);
                if (!leadCategories.Any())
                {
                    return ApiResponse<IEnumerable<LeadCategoryResponse>>.ErrorResponse("No Lead Category Found", HttpStatusCodes.BadRequest);
                }
                return ApiResponse<IEnumerable<LeadCategoryResponse>>.SuccessResponse(leadCategories, $"{leadCategories.Count()} Lead Categories Found", HttpStatusCodes.OK);

            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<LeadCategoryResponse>>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }
        }

        public async Task<ApiResponse<TimeSheetResponseModel>> DeleteTimeSheetById(Guid id)
        {
            try
            {
                var loggedInUser = contextService.UserId();
                var timeSheet = await leadRepository.GetTimeSheetById(id);
                if (timeSheet is null)
                {
                    return ApiResponse<TimeSheetResponseModel>.ErrorResponse("No Such Time Sheet ", HttpStatusCodes.BadRequest);

                }
                timeSheet.IsActive = false;
                timeSheet.ModifiedBy = loggedInUser;
                timeSheet.ModifiedDate = DateTime.Now;
                var timeSheetDeleted = await leadRepository.UpdateTimeSheet(timeSheet);
                if (timeSheetDeleted > 0)
                {
                    TimeSheetResponseModel res = new()
                    {
                        Id = timeSheet.Id,
                        TimeSheetStepName = timeSheet.TimeSheetStepName,
                        Comment = timeSheet.Comment,
                        IsActive = timeSheet.IsActive,
                        Date = timeSheet.Date
                    };
                    return ApiResponse<TimeSheetResponseModel>.SuccessResponse(res, "TimeSheet Deleted Successfully", HttpStatusCodes.BadRequest);

                }
                return ApiResponse<TimeSheetResponseModel>.ErrorResponse("Can't Delete Please Try Again ", HttpStatusCodes.BadRequest);

            }
            catch (Exception ex)
            {
                return ApiResponse<TimeSheetResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }
        }

        public async Task<ApiResponse<TimeSheetResponseModel>> GetTimeSHeetById(Guid id)
        {
            var loggedInUser = contextService.UserId();
            var timesheet = await leadRepository.GetTimeSheetById(id);
            if (timesheet is null)
            {
                return ApiResponse<TimeSheetResponseModel>.ErrorResponse("no such Time Sheet ", HttpStatusCodes.BadRequest);
            }
            TimeSheetResponseModel timeSheetRes = new()
            {
                Id = timesheet.Id,
                TimeSheetStepName = timesheet.TimeSheetStepName,
                Comment = timesheet.Comment,
                IsActive = timesheet.IsActive,
                Date = timesheet.Date
            };
            return ApiResponse<TimeSheetResponseModel>.SuccessResponse(timeSheetRes, "time sheet Found Successfully", HttpStatusCodes.BadRequest);

        }



        /*   public async Task<ApiResponse<IEnumerable<LeadResponseModel>>> AddMultipleLeads(List<LeadMutipleRequestModel> leadModels)
           {
               try
               {
                   var salesExecutiveId = contextService.UserId();
                   var salesEx = await userRepository.GetUserById(salesExecutiveId);
                   var companyId = salesEx!.CompanyId;
                   var leadSourceId = new Guid("575AE6EA-AFA6-49FD-B541-FFCB4FC70571");
                   var leadCompanyId = Guid.Empty;

                   if (salesExecutiveId == Guid.Empty)
                   {
                       return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
                   }

                   var leadEntities = new List<Lead>();
                   var masterUsers = new List<MasterUser>();
                   var leadResponseModels = new List<LeadResponseModel>();
                   var emails = leadModels.Select(m => m.Email).ToList();

                   var existingEmails = await userRepository.GetEmailsAsync(emails);
                   var duplicateEmails = emails.Intersect(existingEmails).ToList();

                   if (duplicateEmails.Any())
                   {
                       return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                           $"Users with the following emails already exist: {string.Join(", ", duplicateEmails)}",
                           HttpStatusCodes.Conflict
                       );
                   }

                   foreach (var leadModel in leadModels)
                   {
                       if (!string.IsNullOrEmpty(leadModel.LeadSourceName) &&
                          await leadSourceRepository.IsExistsAsync(x => x.LeadSourceName == leadModel.LeadSourceName))
                       {
                           var lsName = await leadRepository.GetLeadSoureByName(leadModel.LeadSourceName);
                           leadSourceId = lsName.Id;
                       }

                       else
                       {
                           var leadSource = new LeadSource()
                           {
                               Id = Guid.NewGuid(),
                               LeadSourceName = leadModel.LeadSourceName,
                               CreatedDate = DateTimeOffset.Now,
                               CreatedBy = salesExecutiveId,
                               Description = "N/A"
                           };

                           await leadSourceRepository.InsertAsync(leadSource);
                           leadSourceId = leadSource.Id; 
                       }

                       if (!string.IsNullOrEmpty(leadModel.LeadCompany) &&
                           await leadRepository.IsLeadCompanyExists(leadModel.LeadCompany))
                       {

                           var lcName = await leadRepository.GetLeadCompanyByName(leadModel.LeadCompany);
                           leadCompanyId = lcName.Id;  
                       }
                       else
                       {
                           var leadCompany = new LeadCompany()
                           {
                               Id = Guid.NewGuid(),
                               LeadCompanyName = leadModel.LeadCompany,
                               CreatedBy = salesExecutiveId,
                               CreatedDate = DateTime.Now,
                               Description = "N/A",
                               CompanyId = companyId
                           };
                           await leadRepository.AddLeadCompanyName(leadCompany);
                           leadCompanyId = leadCompany.Id;
                       }

                       var userId = Guid.NewGuid();
                       var user = new MasterUser
                       {
                           Id = userId,
                           Name = leadModel.Name,
                           Email = leadModel.Email,
                           PhoneNumber = string.IsNullOrEmpty(leadModel.PhoneNumber) ? "N/A" : leadModel.PhoneNumber,
                           Password = AppEncryption.GenerateRandomPassword(leadModel.Email!),
                           Salt = AppEncryption.GenerateSalt(),
                           UserRole = UserRole.Lead,
                           CreatedDate = DateTime.UtcNow,
                           DeletedDate = DateTime.UtcNow,
                           IsActive = true,
                           ModifiedDate = DateTime.UtcNow,
                       };

                       masterUsers.Add(user);
                       leadModel.CompanyId = companyId;

                       var lead = new Lead
                       {
                           Id = userId,
                           LeadSourceId = leadSourceId != Guid.Empty ? leadSourceId : new Guid("575ae6ea-afa6-49fd-b541-ffcb4fc70571"),
                           CompanyId = companyId,
                           Comment = leadModel.Comment,
                           AssignTo = salesExecutiveId,
                           CreatedBy = leadModel.AssignTo,
                           CreatedDate = DateTime.UtcNow,
                           ModifiedDate = DateTime.UtcNow,
                           IsActive = true,
                           LeadRank = leadModel.LeadRank ?? 5,
                           LeadCategoryId = new Guid("6C92D610-4837-425C-98EF-57831C36EF71"),
                           LeadCompanyId = leadCompanyId,
                           FinalStatus = FinalStatus.Open,
                           UserId = salesExecutiveId,

                       };

                       leadEntities.Add(lead);
                   }

                   var userAddedCount = await adminRepository.AddMasterUsers(masterUsers);
                   if (userAddedCount <= 0)
                   {
                       return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                   }

                   var leadAddedCount = await leadRepository.AddLeadsAsync(leadEntities);
                   if (leadAddedCount <= 0)
                   {
                       return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                   }

                   foreach (var lead1 in leadEntities)
                   {
                       var sourceLead = await leadRepository.GetLeadById(lead1.Id);
                       if (sourceLead != null)
                       {
                           var returnVal = await userRepository.GetByIdAsync(sourceLead.AssignToId);
                           if (returnVal != null)
                               sourceLead.AssignedTo = returnVal.Name;

                           var returnCompany = await companyRepository.GetByIdAsync(lead1.CompanyId);
                           if (returnCompany != null)
                               sourceLead.CompanyName = returnCompany.CompanyName;

                           leadResponseModels.Add(sourceLead);
                       }
                   }

                   return ApiResponse<IEnumerable<LeadResponseModel>>.SuccessResponse(leadResponseModels, ApiMessages.LeadManagement.LeadAddedSuccessfully, HttpStatusCodes.Created);
               }
               catch (Exception ex)
               {
                   return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.InternalServerError);
               }

           }*/

        /*        public async Task<ApiResponse<IEnumerable<LeadResponseModel>>> AddMultipleLeads(List<LeadMutipleRequestModel> leadModels)
                {
                    try
                    {
                        var salesExecutiveId = contextService.UserId();
                        var salesEx = await userRepository.GetUserById(salesExecutiveId);
                        var companyId = salesEx!.CompanyId;

                        if (salesExecutiveId == Guid.Empty)
                        {
                            return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
                        }

                        var leadEntities = new List<Lead>();
                        var masterUsers = new List<MasterUser>();
                        var leadResponseModels = new List<LeadResponseModel>();
                        var emails = leadModels.Select(m => m.Email).ToList();

                        var existingEmails = await userRepository.GetEmailsAsync(emails);
                        var duplicateEmails = emails.Intersect(existingEmails).ToList();

                        // Filter out leads with duplicate emails
                        var validLeadModels = leadModels.Where(l => !duplicateEmails.Contains(l.Email)).ToList();

                        foreach (var leadModel in validLeadModels)
                        {
                            // Process Lead Source
                            Guid leadSourceId;
                            if (!string.IsNullOrEmpty(leadModel.LeadSourceName) &&
                                await leadSourceRepository.IsExistsAsync(x => x.LeadSourceName == leadModel.LeadSourceName))
                            {
                                var lsName = await leadRepository.GetLeadSoureByName(leadModel.LeadSourceName);
                                leadSourceId = lsName.Id;
                            }
                            else
                            {
                                var leadSource = new LeadSource()
                                {
                                    Id = Guid.NewGuid(),
                                    LeadSourceName = leadModel.LeadSourceName,
                                    CreatedDate = DateTimeOffset.Now,
                                    CreatedBy = salesExecutiveId,
                                    Description = "N/A",
                                    IsActive = true
                                };

                                await leadSourceRepository.InsertAsync(leadSource);
                                leadSourceId = leadSource.Id;
                            }

                            // Process Lead Company
                            Guid leadCompanyId;
                            if (!string.IsNullOrEmpty(leadModel.LeadCompany) &&
                                await leadRepository.IsLeadCompanyExists(leadModel.LeadCompany))
                            {
                                var lcName = await leadRepository.GetLeadCompanyByName(leadModel.LeadCompany);
                                leadCompanyId = lcName.Id;
                            }
                            else
                            {
                                var leadCompany = new LeadCompany()
                                {
                                    Id = Guid.NewGuid(),
                                    LeadCompanyName = leadModel.LeadCompany,
                                    CreatedBy = salesExecutiveId,
                                    CreatedDate = DateTime.Now,
                                    Description = "N/A",
                                    CompanyId = companyId,
                                    IsActive = true
                                };
                                await leadRepository.AddLeadCompanyName(leadCompany);
                                leadCompanyId = leadCompany.Id;
                            }

                            // Add Master User
                            var userId = Guid.NewGuid();
                            var user = new MasterUser
                            {
                                Id = userId,
                                Name = leadModel.Name,
                                Email = leadModel.Email,
                                PhoneNumber = string.IsNullOrEmpty(leadModel.PhoneNumber) ? "N/A" : leadModel.PhoneNumber,
                                Password = AppEncryption.GenerateRandomPassword(leadModel.Email!),
                                Salt = AppEncryption.GenerateSalt(),
                                UserRole = UserRole.Lead,
                                CreatedDate = DateTime.UtcNow,
                                DeletedDate = DateTime.UtcNow,
                                IsActive = true,
                                ModifiedDate = DateTime.UtcNow,
                            };

                            masterUsers.Add(user);

                            // Add Lead
                            var lead = new Lead
                            {
                                Id = userId,
                                LeadSourceId = leadSourceId,
                                CompanyId = companyId,
                                Comment = leadModel.Comment,
                                AssignTo = salesExecutiveId,
                                CreatedBy = leadModel.AssignTo,
                                CreatedDate = DateTime.UtcNow,
                                ModifiedDate = DateTime.UtcNow,
                                IsActive = true,
                                LeadRank = leadModel.LeadRank ?? 5,
                                LeadCategoryId = new Guid("6C92D610-4837-425C-98EF-57831C36EF71"),
                                LeadCompanyId = leadCompanyId,
                                FinalStatus = FinalStatus.Open,
                                UserId = salesExecutiveId,
                            };

                            leadEntities.Add(lead);
                        }

                        var userAddedCount = await adminRepository.AddMasterUsers(masterUsers);
                        var leadAddedCount = await leadRepository.AddLeadsAsync(leadEntities);

                        foreach (var lead in leadEntities)
                        {
                            var sourceLead = await leadRepository.GetLeadById(lead.Id);
                            if (sourceLead != null)
                            {
                                var returnVal = await userRepository.GetByIdAsync(sourceLead.AssignToId);
                                if (returnVal != null)
                                    sourceLead.AssignedTo = returnVal.Name;

                                var returnCompany = await companyRepository.GetByIdAsync(lead.CompanyId);
                                if (returnCompany != null)
                                    sourceLead.CompanyName = returnCompany.CompanyName;

                                leadResponseModels.Add(sourceLead);
                            }
                        }

                        if (!leadResponseModels.Any())
                        {
                            return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse("No leads were added.", HttpStatusCodes.BadRequest);
                        }

                        return ApiResponse<IEnumerable<LeadResponseModel>>.SuccessResponse(
                            leadResponseModels,
                            $"Added {leadResponseModels.Count} leads. Skipped {duplicateEmails.Count} due to duplicate emails: {string.Join(", ", duplicateEmails)}",
                            HttpStatusCodes.Created
                        );
                    }
                    catch (Exception ex)
                    {
                        return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.InternalServerError);
                    }
                }*/

        public async Task<ApiResponse<IEnumerable<LeadResponseModel>>> AddMultipleLeads(List<LeadMutipleRequestModel> leadModels)
        {
            try
            {
                var salesExecutiveId = contextService.UserId();
                if (salesExecutiveId == Guid.Empty)
                {
                    return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
                }

                var salesEx = await userRepository.GetUserById(salesExecutiveId);
                var companyId = salesEx!.CompanyId;

                // Get existing emails to check for duplicates
                var emails = leadModels.Select(m => m.Email).ToList();
                var existingEmails = await userRepository.GetEmailsAsync(emails);
                var duplicateEmails = emails.Intersect(existingEmails).ToList();

                // Filter out valid leads (non-duplicate)
                var validLeadModels = leadModels.Where(l => !duplicateEmails.Contains(l.Email)).ToList();

                if (!validLeadModels.Any())
                {
                    return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                        $"No leads were added. The following emails are duplicates: {string.Join(", ", duplicateEmails)}",
                        HttpStatusCodes.BadRequest
                    );
                }

                var leadEntities = new List<Lead>();
                var masterUsers = new List<MasterUser>();
                var leadResponseModels = new List<LeadResponseModel>();

                foreach (var leadModel in validLeadModels)
                {
                    // Process Lead Source
                    Guid leadSourceId;
                    if (!string.IsNullOrEmpty(leadModel.LeadSourceName) &&
                        await leadSourceRepository.IsExistsAsync(x => x.LeadSourceName == leadModel.LeadSourceName))
                    {
                        var lsName = await leadRepository.GetLeadSoureByName(leadModel.LeadSourceName);
                        leadSourceId = lsName.Id;
                    }
                    else
                    {
                        var leadSource = new LeadSource
                        {
                            Id = Guid.NewGuid(),
                            LeadSourceName = leadModel.LeadSourceName,
                            CreatedDate = DateTimeOffset.Now,
                            CreatedBy = salesExecutiveId,
                            Description = "N/A",
                            IsActive = true
                        };

                        await leadSourceRepository.InsertAsync(leadSource);
                        leadSourceId = leadSource.Id;
                    }

                    // Process Lead Company
                    Guid leadCompanyId;
                    if (!string.IsNullOrEmpty(leadModel.LeadCompany) &&
                        await leadRepository.IsLeadCompanyExists(leadModel.LeadCompany))
                    {
                        var lcName = await leadRepository.GetLeadCompanyByName(leadModel.LeadCompany);
                        leadCompanyId = lcName.Id;
                    }
                    else
                    {
                        var leadCompany = new LeadCompany
                        {
                            Id = Guid.NewGuid(),
                            LeadCompanyName = leadModel.LeadCompany,
                            CreatedBy = salesExecutiveId,
                            CreatedDate = DateTime.Now,
                            Description = "N/A",
                            CompanyId = companyId,
                            IsActive = true
                        };
                        await leadRepository.AddLeadCompanyName(leadCompany);
                        leadCompanyId = leadCompany.Id;
                    }

                    // Add Master User
                    var userId = Guid.NewGuid();
                    var user = new MasterUser
                    {
                        Id = userId,
                        Name = leadModel.Name,
                        Email = leadModel.Email,
                        PhoneNumber = string.IsNullOrEmpty(leadModel.PhoneNumber) ? "N/A" : leadModel.PhoneNumber,
                        Password = AppEncryption.GenerateRandomPassword(leadModel.Email!),
                        Salt = AppEncryption.GenerateSalt(),
                        UserRole = UserRole.Lead,
                        CreatedDate = DateTime.UtcNow,
                        DeletedDate = DateTime.UtcNow,
                        IsActive = true,
                        ModifiedDate = DateTime.UtcNow,
                    };

                    masterUsers.Add(user);

                    // Add Lead
                    var lead = new Lead
                    {
                        Id = userId,
                        LeadSourceId = leadSourceId,
                        CompanyId = companyId,
                        Comment = leadModel.Comment,
                        AssignTo = salesExecutiveId,
                        CreatedBy = salesExecutiveId,
                        CreatedDate = DateTime.UtcNow,
                        ModifiedDate = DateTime.UtcNow,
                        IsActive = true,
                        LeadRank = leadModel.LeadRank.HasValue && leadModel.LeadRank.Value > 0
           ? leadModel.LeadRank.Value
           : 5,

                        LeadCategoryId = new Guid("6C92D610-4837-425C-98EF-57831C36EF71"),
                        LeadCompanyId = leadCompanyId,
                        FinalStatus = FinalStatus.Open,
                        UserId = salesExecutiveId,
                    };

                    leadEntities.Add(lead);
                }

                // Save to database
                var userAddedCount = await adminRepository.AddMasterUsers(masterUsers);
                var leadAddedCount = await leadRepository.AddLeadsAsync(leadEntities);

                // Populate the response model
                foreach (var lead in leadEntities)
                {
                    var sourceLead = await leadRepository.GetLeadById(lead.Id);
                    if (sourceLead != null)
                    {
                        var assignToUser = await userRepository.GetByIdAsync(sourceLead.AssignToId);
                        if (assignToUser != null)
                            sourceLead.AssignedTo = assignToUser.Name;

                        var company = await companyRepository.GetByIdAsync(lead.CompanyId);
                        if (company != null)
                            sourceLead.CompanyName = company.CompanyName;

                        leadResponseModels.Add(sourceLead);
                    }
                }

                // Add duplicate leads to the response
                foreach (var duplicateEmail in duplicateEmails)
                {
                    leadResponseModels.Add(new LeadResponseModel
                    {
                        Email = duplicateEmail,
                        StatusMessage = "Duplicate email. Already exists."
                    });
                }

                return ApiResponse<IEnumerable<LeadResponseModel>>.SuccessResponse(
                    leadResponseModels,
                    $"Added {validLeadModels.Count} leads. Skipped {duplicateEmails.Count} duplicates.",
                    HttpStatusCodes.Created
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                    $"{ApiMessages.TechnicalError} {ex.Message}",
                    HttpStatusCodes.InternalServerError
                );
            }
        }


        public Task<ApiResponse<IEnumerable<LeadCompanyNameResponse>>> AddLeadCompanyNameBulkInsert(List<LeadCompanyNameRequest> models)
        {
            throw new NotImplementedException();
        }

        public async Task<ApiResponse<IEnumerable<CompanyTimeSheetResponse>>> GetAllTimeSheetStepsByCompany()
        {
            try
            {
                var salesUser = contextService.UserId();
                var user = await userRepository.GetUserById(salesUser);
                var companyId = user.CompanyId;
                var timeSheets = await companyRepository.GetTimeSheetByCompany(companyId);
                if (timeSheets.Any())
                {
                    return ApiResponse<IEnumerable<CompanyTimeSheetResponse>>.SuccessResponse(timeSheets, $"{timeSheets.Count()} timeSheetSteps found", HttpStatusCodes.OK);
                }
                return ApiResponse<IEnumerable<CompanyTimeSheetResponse>>.ErrorResponse("No TimeSheetSteps Found ", HttpStatusCodes.BadRequest);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<CompanyTimeSheetResponse>>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.InternalServerError);
            }
        }

    }
}
public class FollowUpReq
{
    public Guid LeadId { get; set; }
    public Guid LeadCompanyId { get; set; }
    public Guid AdminProcessStepId { get; set; }
    public string? Comment { get; set; }
    public TimeSpan Time { get; set; }
    public DateTime Date { get; set; }
}