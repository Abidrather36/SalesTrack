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

                var isEmailExist=  await userRepository.IsExistsAsync(x => x.Email == model.Email);
                if (isEmailExist)
                {
                    return ApiResponse<LeadResponseModel>.ErrorResponse( "A lead with Such Email Already Exists ", HttpStatusCodes.BadRequest);
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
                    lead.Designation = model.Designation;
                    lead.Department = model.Department;
                    lead.LeadRank = model.LeadRank ?? lead.LeadRank;


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
                $"{sortedLeadHistory.Count() } Follow Ups found.",
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
           var user=await userRepository.GetUserById(loggedInUser);
           var companyId= user.CompanyId;
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
                    IsActive = true,
                    ProjectId=model.ProjectId,
                    CompanyId=companyId,

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
                        Date = timeSheet.Date,
                        ProjectId=timeSheet.ProjectId,
                    };
                    return ApiResponse<TimeSheetResponseModel>.SuccessResponse(response, "Task Added Successfully ", HttpStatusCodes.OK);
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
                    return ApiResponse<TimeSheetResponseModel>.SuccessResponse(timeSheetResponse, "TimeSheet-Updated-Successfully", HttpStatusCodes.OK);
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

                if (model.LeadCompanyName.ToLower() == string.Empty && model.Description == string.Empty)
                {
                    return ApiResponse<LeadCompanyNameResponse>.ErrorResponse("please enter values", HttpStatusCodes.BadRequest);
                }
                var leadCompanyNames = await leadRepository.GetAllLeadCompanyNames(companyId);
                if (leadCompanyNames.Any(x => x.LeadCompanyName == model.LeadCompanyName.ToLower()))
                {
                    return ApiResponse<LeadCompanyNameResponse>.ErrorResponse("Lead CompanyName Already Exits", HttpStatusCodes.BadRequest);
                }
                LeadCompany leadCompanyName = new()
                {
                    Id = Guid.NewGuid(),
                    LeadCompanyName = model.LeadCompanyName.ToLower(),
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
                   if (salesExecutiveId == Guid.Empty)
                   {
                       return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                           "Sales Executive ID not found.",
                           HttpStatusCodes.BadRequest
                       );
                   }

                   var salesEx = await userRepository.GetUserById(salesExecutiveId);
                   var companyId = salesEx!.CompanyId;

                   var emails = leadModels.Select(m => m.Email).ToList();
                   var existingEmails = await userRepository.GetEmailsAsync(emails);
                   var duplicateEmails = emails.Intersect(existingEmails).ToList();

                   var validLeadModels = leadModels.Where(l => !duplicateEmails.Contains(l.Email)).ToList();

                   if (!validLeadModels.Any())
                   {
                       return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                           $"Provided emails are already associated with existing leads: {string.Join(", ", duplicateEmails)}",
                           HttpStatusCodes.BadRequest
                       );
                   }

                   var leadEntities = new List<Lead>();
                   var masterUsers = new List<MasterUser>();
                   var leadResponseModels = new List<LeadResponseModel>();

                   foreach (var leadModel in validLeadModels)
                   {
                       Guid leadCompanyId;
                       var companyExists = await leadRepository.IsLeadCompanyExists(leadModel.LeadCompany!);
                       if(!string.IsNullOrEmpty( leadModel.AssignToUser))
                       {
                          var userAssign= leadModel.AssignToUser.ToLower();
                           if(userAssign == "abhishek")
                           {
                               leadModel.AssignTo = Guid.Parse("7A08B5E6-2B08-45EF-A6D4-08DD0EA87C69");
                           }
                           else if(userAssign == "megha")
                           {
                               leadModel.AssignTo = Guid.Parse("F3D56DC2-5D5C-4E68-A6D3-08DD0EA87C69");
                           }

                           else
                           {
                               return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse($"Invalid Assign To User {leadModel.AssignToUser}");
                           }
                       }
                       else
                       {
                           return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse("please enter assign To User",HttpStatusCodes.BadRequest);
                       }
                       if (!companyExists)
                       {
                           var leadCompany = new LeadCompany
                           {
                               Id = Guid.NewGuid(),
                               LeadCompanyName = leadModel.LeadCompany,
                               CreatedBy = salesExecutiveId,
                               CreatedDate = DateTime.UtcNow,
                               Description = "IT company",
                               CompanyId = companyId,
                               IsActive = true
                           };

                           var result = await leadRepository.AddLeadCompanyName(leadCompany);
                           if (result > 0)
                           {
                               var res = await leadRepository.GetLeadCompanyNameById(leadCompany.Id);
                               leadCompanyId = res.Id;
                           }
                           else
                           {
                               return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                                   $"Failed to add lead company {leadModel.LeadCompany}. Please try again.",
                                   HttpStatusCodes.InternalServerError
                               );
                           }
                       }
                       else
                       {
                           var res = await leadRepository.GetLeadCompanyByName(leadModel.LeadCompany!);
                           leadCompanyId = res!.Id;
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

                       var lead = new Lead
                       {
                           Id = userId,
                           LeadSourceId = Guid.Parse("575AE6EA-AFA6-49FD-B541-FFCB4FC70571"),
                           CompanyId = companyId,
                           AssignTo = leadModel.AssignTo,
                           CreatedBy = salesExecutiveId,
                           CreatedDate = DateTime.UtcNow,
                           ModifiedDate = DateTime.UtcNow,
                           IsActive = true,
                           LeadRank = leadModel.LeadRank.HasValue && leadModel.LeadRank.Value > 0
      ? leadModel.LeadRank.Value
      : 1,
                           LeadCategoryId = Guid.Parse("6C92D610-4837-425C-98EF-57831C36EF71"),
                           LeadCompanyId = leadCompanyId,
                           FinalStatus = FinalStatus.Open,
                           UserId = salesExecutiveId,
                           Designation=leadModel.Designation,
                           Department=leadModel.Department,
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
                           var assignToUser = await userRepository.GetByIdAsync(sourceLead.AssignToId);
                           sourceLead.AssignedTo = assignToUser?.Name ?? "N/A";

                           var company = await companyRepository.GetByIdAsync(lead.CompanyId);
                           sourceLead.CompanyName = company?.CompanyName ?? "N/A";

                           leadResponseModels.Add(sourceLead);
                       }
                   }

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
                       $"Successfully added {validLeadModels.Count} new leads. {duplicateEmails.Count} emails were skipped as they already exist.",
                       HttpStatusCodes.Created
                   );
               }
               catch (Exception ex)
               {
                   // Log the exception here
                   return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                       $"{ApiMessages.TechnicalError}",
                       HttpStatusCodes.InternalServerError
                   );
               }
           }*/



        /*   public async Task<ApiResponse<IEnumerable<LeadResponseModel>>> AddMultipleLeads(List<LeadMutipleRequestModel> leadModels)
           {
               try
               {
                   var salesExecutiveId = contextService.UserId();
                   var salesEx = await userRepository.GetUserById(salesExecutiveId);
                   var companyId = salesEx!.CompanyId;

                   var emails = leadModels.Select(m => m.Email).ToList();
                   var existingEmails = await userRepository.GetEmailsAsync(emails);
                   var duplicateEmails = emails.Intersect(existingEmails).ToList();

                   var validLeadModels = leadModels.Where(l => !duplicateEmails.Contains(l.Email)).ToList();

                   if (!validLeadModels.Any())
                   {
                       return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                           $"Provided emails are already associated with existing leads: {string.Join(", ", duplicateEmails)}",
                           HttpStatusCodes.BadRequest
                       );
                   }

                   var leadEntities = new List<Lead>();
                   var masterUsers = new List<MasterUser>();
                   var leadResponseModels = new List<LeadResponseModel>();

                   foreach (var leadModel in validLeadModels)
                   {
                       Guid leadCompanyId;

                       var companyExists = await leadRepository.IsLeadCompanyExists(leadModel.LeadCompany!);
                       if (!string.IsNullOrEmpty(leadModel.AssignToUser))
                       {
                           var userAssign = leadModel.AssignToUser.ToLower();
                           if (userAssign == "abhishek")
                           {
                               leadModel.AssignTo = Guid.Parse("7A08B5E6-2B08-45EF-A6D4-08DD0EA87C69");
                           }
                           else if (userAssign == "megha")
                           {
                               leadModel.AssignTo = Guid.Parse("F3D56DC2-5D5C-4E68-A6D3-08DD0EA87C69");
                           }
                           else if (userAssign=="aabid")
                           {
                               leadModel.AssignTo = Guid.Parse("12d66be1-edf5-473c-ded7-08dd31323009");

                           }
                           else
                           {
                               return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse($"Invalid Assign To User {leadModel.AssignToUser}");
                           }
                       }
                       else
                       {
                           return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse("Please enter Assign To User", HttpStatusCodes.BadRequest);
                       }

                       if (!companyExists)
                       {
                           var leadCompany = new LeadCompany
                           {
                               Id = Guid.NewGuid(),
                               LeadCompanyName = leadModel.LeadCompany,
                               CreatedBy = salesExecutiveId,
                               CreatedDate = DateTime.UtcNow,
                               Description = "IT company",
                               CompanyId = companyId,
                               IsActive = true
                           };

                           var result = await leadRepository.AddLeadCompanyName(leadCompany);
                           if (result > 0)
                           {
                               var res = await leadRepository.GetLeadCompanyNameById(leadCompany.Id);
                               leadCompanyId = res.Id;
                           }
                           else
                           {
                               return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                                   $"Failed to add lead company {leadModel.LeadCompany}. Please try again.",
                                   HttpStatusCodes.InternalServerError
                               );
                           }
                       }
                       else
                       {
                           var res = await leadRepository.GetLeadCompanyByName(leadModel.LeadCompany!);
                           leadCompanyId = res!.Id;
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

                       var lead = new Lead
                       {
                           Id = userId,
                           LeadSourceId = Guid.Parse("575AE6EA-AFA6-49FD-B541-FFCB4FC70571"),
                           CompanyId = companyId,
                           AssignTo = leadModel.AssignTo,
                           CreatedBy = salesExecutiveId,
                           CreatedDate = DateTime.UtcNow,
                           ModifiedDate = DateTime.UtcNow,
                           IsActive = true,
                           LeadRank = leadModel.LeadRank.HasValue && leadModel.LeadRank.Value > 0 ? leadModel.LeadRank.Value : 1,
                           LeadCategoryId = Guid.Parse("6C92D610-4837-425C-98EF-57831C36EF71"),
                           LeadCompanyId = leadCompanyId,
                           FinalStatus = FinalStatus.Open,
                           UserId = salesExecutiveId,
                           Designation = leadModel.Designation,
                           Department = leadModel.Department,
                       };

                       leadEntities.Add(lead);
                   }

                   // Add valid users and leads
                   var userAddedCount = await adminRepository.AddMasterUsers(masterUsers);
                   var leadAddedCount = await leadRepository.AddLeadsAsync(leadEntities);

                   // Prepare response models for leads
                   foreach (var lead in leadEntities)
                   {
                       var sourceLead = await leadRepository.GetLeadById(lead.Id);
                       if (sourceLead != null)
                       {
                           var assignToUser = await userRepository.GetByIdAsync(sourceLead.AssignToId);
                           sourceLead.AssignedTo = assignToUser?.Name ?? "N/A";

                           var company = await companyRepository.GetByIdAsync(lead.CompanyId);
                           sourceLead.CompanyName = company?.CompanyName ?? "N/A";

                           leadResponseModels.Add(sourceLead);
                       }
                   }

                   // Add duplicates to response as well
                   foreach (var duplicateEmail in duplicateEmails)
                   {
                       leadResponseModels.Add(new LeadResponseModel
                       {
                           Email = duplicateEmail,
                           StatusMessage = "Duplicate email. Already exists."
                       });
                   }

                   var addedCount = leadEntities.Count;
                   var skippedCount = duplicateEmails.Count;

                   return ApiResponse<IEnumerable<LeadResponseModel>>.SuccessResponse(
                       leadResponseModels,
                       $"Successfully added {addedCount} new leads. {skippedCount} emails were skipped as they already exist.",
                       HttpStatusCodes.Created
                   );

               }
               catch (Exception ex)
               {
                   // Log the exception here
                   return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                       $"{ApiMessages.TechnicalError}",
                       HttpStatusCodes.InternalServerError
                   );
               }


           }*/
    /*    public async Task<ApiResponse<IEnumerable<LeadResponseModel>>> AddMultipleLeads(List<LeadMutipleRequestModel> leadModels)
        {
            try
            {
                var salesExecutiveId = contextService.UserId();
                if (salesExecutiveId == Guid.Empty)
                {
                    return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                        "Sales Executive ID not found.",
                        HttpStatusCodes.BadRequest
                    );
                }

                var salesEx = await userRepository.GetUserById(salesExecutiveId);
                var companyId = salesEx!.CompanyId;

                // Collect all provided emails
                var emails = leadModels.Select(m => m.Email).ToList();

                // Fetch existing emails from database
                var existingEmails = await userRepository.GetEmailsAsync(emails);

                // Identify duplicates and separate valid lead models
                var duplicateEmails = emails.Intersect(existingEmails).ToList();
                var validLeadModels = leadModels.Where(l => !duplicateEmails.Contains(l.Email)).ToList();

                // If no valid leads to add
                if (!validLeadModels.Any())
                {
                    return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                        $"Provided emails are already associated with existing leads: {string.Join(", ", duplicateEmails)}",
                        HttpStatusCodes.BadRequest
                    );
                }

                var leadEntities = new List<Lead>();
                var masterUsers = new List<MasterUser>();
                var leadResponseModels = new List<LeadResponseModel>();

                foreach (var leadModel in validLeadModels)
                {
                    Guid leadCompanyId;

                    // Check and process lead company
                    var companyExists = await leadRepository.IsLeadCompanyExists(leadModel.LeadCompany!);
                    if (!string.IsNullOrEmpty(leadModel.AssignToUser))
                    {
                        var userAssign = leadModel.AssignToUser.ToLower();
                        if (userAssign == "abhishek")
                        {
                            leadModel.AssignTo = Guid.Parse("7A08B5E6-2B08-45EF-A6D4-08DD0EA87C69");
                        }
                        else if (userAssign == "megha")
                        {
                            leadModel.AssignTo = Guid.Parse("F3D56DC2-5D5C-4E68-A6D3-08DD0EA87C69");
                        }
                        else if (userAssign == "aabid")
                        {
                            leadModel.AssignTo = Guid.Parse("12d66be1-edf5-473c-ded7-08dd31323009");

                        }
                        else
                        {
                            return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse($"Invalid Assign To User {leadModel.AssignToUser}");
                        }

                    }
                    else
                    {
                        return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse("Please enter Assign To User", HttpStatusCodes.BadRequest);
                    }

                    if (!companyExists)
                    {
                        var leadCompany = new LeadCompany
                        {
                            Id = Guid.NewGuid(),
                            LeadCompanyName = leadModel.LeadCompany,
                            CreatedBy = salesExecutiveId,
                            CreatedDate = DateTime.UtcNow,
                            Description = "IT company",
                            CompanyId = companyId,
                            IsActive = true
                        };

                        var result = await leadRepository.AddLeadCompanyName(leadCompany);
                        if (result > 0)
                        {
                            var res = await leadRepository.GetLeadCompanyNameById(leadCompany.Id);
                            leadCompanyId = res.Id;
                        }
                        else
                        {
                            return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                                $"Failed to add lead company {leadModel.LeadCompany}. Please try again.",
                                HttpStatusCodes.InternalServerError
                            );
                        }
                    }
                    else
                    {
                        var res = await leadRepository.GetLeadCompanyByName(leadModel.LeadCompany!);
                        leadCompanyId = res!.Id;
                    }

                    // Add user and lead entities
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

                    var lead = new Lead
                    {
                        Id = userId,
                        LeadSourceId = Guid.Parse("575AE6EA-AFA6-49FD-B541-FFCB4FC70571"),
                        CompanyId = companyId,
                        AssignTo = leadModel.AssignTo,
                        CreatedBy = salesExecutiveId,
                        CreatedDate = DateTime.UtcNow,
                        ModifiedDate = DateTime.UtcNow,
                        IsActive = true,
                        LeadRank = leadModel.LeadRank.HasValue && leadModel.LeadRank.Value > 0 ? leadModel.LeadRank.Value : 1,
                        LeadCategoryId = Guid.Parse("6C92D610-4837-425C-98EF-57831C36EF71"),
                        LeadCompanyId = leadCompanyId,
                        FinalStatus = FinalStatus.Open,
                        UserId = salesExecutiveId,
                        Designation = leadModel.Designation,
                        Department = leadModel.Department,
                    };

                    leadEntities.Add(lead);
                }

                // Add valid users and leads
                await adminRepository.AddMasterUsers(masterUsers);
                await leadRepository.AddLeadsAsync(leadEntities);

                // Prepare response models for leads
                foreach (var lead in leadEntities)
                {
                    var sourceLead = await leadRepository.GetLeadById(lead.Id);
                    if (sourceLead != null)
                    {
                        var assignToUser = await userRepository.GetByIdAsync(sourceLead.AssignToId);
                        sourceLead.AssignedTo = assignToUser?.Name ?? "N/A";

                        var company = await companyRepository.GetByIdAsync(lead.CompanyId);
                        sourceLead.CompanyName = company?.CompanyName ?? "N/A";

                        leadResponseModels.Add(sourceLead);
                    }
                }

                // Add duplicates to response models
                foreach (var duplicateEmail in duplicateEmails)
                {
                    leadResponseModels.Add(new LeadResponseModel
                    {
                        Email = duplicateEmail,
                        StatusMessage = "Duplicate email. Already exists."
                    });
                }

                // Success response with counts
                var addedCount = validLeadModels.Count;
                var skippedCount = duplicateEmails.Count;

                return ApiResponse<IEnumerable<LeadResponseModel>>.SuccessResponse(
                    leadResponseModels,
                    $"Successfully added {addedCount} new lead(s). {skippedCount} email(s) were skipped as they already exist.",
                    HttpStatusCodes.Created
                );
            }
            catch (Exception ex)
            {
                // Log the exception here
                return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                    $"{ApiMessages.TechnicalError}",
                    HttpStatusCodes.InternalServerError
                );
            }
        }*/


        //Deepseek//
        public async Task<ApiResponse<IEnumerable<LeadResponseModel>>> AddMultipleLeads(List<LeadMutipleRequestModel> leadModels)
        {
            try
            {
                var salesExecutiveId = contextService.UserId();
               

                var salesEx = await userRepository.GetUserById(salesExecutiveId);
                var companyId = salesEx!.CompanyId;

                // Collect all provided emails
                var emails = leadModels.Select(m => m.Email).ToList();
                if (emails == null || emails.Count == 0 || emails.Any(email => string.IsNullOrEmpty(email)))
                {
                    return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse("Emails are required. Please fill email", HttpStatusCodes.BadRequest);
                }

                // Fetch existing emails from database
                var existingEmails = await userRepository.GetEmailsAsync(emails);

                // Identify duplicates and separate valid lead models
                var duplicateEmails = emails.Intersect(existingEmails).ToList();
                var validLeadModels = leadModels.Where(l => !duplicateEmails.Contains(l.Email)).ToList();

                // If no valid leads to add
                if (!validLeadModels.Any())
                {
                    return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                        $"Provided emails are already associated with existing leads: {string.Join(", ", duplicateEmails)}",
                        HttpStatusCodes.BadRequest
                    );
                }

                var leadEntities = new List<Lead>();
                var masterUsers = new List<MasterUser>();
                var leadResponseModels = new List<LeadResponseModel>();

                foreach (var leadModel in validLeadModels)
                {
                    Guid leadCompanyId;

                    // Check and process lead company
                    var companyExists = await leadRepository.IsLeadCompanyExists(leadModel.LeadCompany!);
                    if (!string.IsNullOrEmpty(leadModel.AssignToUser))
                    {
                        var userAssign = leadModel.AssignToUser.ToLower();
                        if (userAssign == "abhishek")
                        {
                            leadModel.AssignTo = Guid.Parse("7A08B5E6-2B08-45EF-A6D4-08DD0EA87C69");
                        }
                        else if (userAssign == "megha")
                        {
                            leadModel.AssignTo = Guid.Parse("F3D56DC2-5D5C-4E68-A6D3-08DD0EA87C69");
                        }
                        else if (userAssign == "aabid")
                        {
                            leadModel.AssignTo = Guid.Parse("12d66be1-edf5-473c-ded7-08dd31323009");
                        }
                        else
                        {
                            return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse($"Invalid Assign To User {leadModel.AssignToUser}");
                        }
                    }
                    else
                    {
                        return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse("Please enter Assign To User", HttpStatusCodes.BadRequest);
                    }

                    if (!companyExists)
                    {
                        var leadCompany = new LeadCompany
                        {
                            Id = Guid.NewGuid(),
                            LeadCompanyName = leadModel.LeadCompany,
                            CreatedBy = salesExecutiveId,
                            CreatedDate = DateTime.UtcNow,
                            Description = "IT company",
                            CompanyId = companyId,
                            IsActive = true
                        };

                        var result = await leadRepository.AddLeadCompanyName(leadCompany);
                        if (result > 0)
                        {
                            var res = await leadRepository.GetLeadCompanyNameById(leadCompany.Id);
                            leadCompanyId = res.Id;
                        }
                        else
                        {
                            return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                                $"Failed to add lead company {leadModel.LeadCompany}. Please try again.",
                                HttpStatusCodes.InternalServerError
                            );
                        }
                    }
                    else
                    {
                        var res = await leadRepository.GetLeadCompanyByName(leadModel.LeadCompany!);
                        leadCompanyId = res!.Id;
                    }

                    // Add user and lead entities
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

                    var lead = new Lead
                    {
                        Id = userId,
                        LeadSourceId = Guid.Parse("575AE6EA-AFA6-49FD-B541-FFCB4FC70571"),
                        CompanyId = companyId,
                        AssignTo = leadModel.AssignTo,
                        CreatedBy = salesExecutiveId,
                        CreatedDate = DateTime.UtcNow,
                        ModifiedDate = DateTime.UtcNow,
                        IsActive = true,
                        LeadRank = leadModel.LeadRank.HasValue && leadModel.LeadRank.Value > 0 ? leadModel.LeadRank.Value : 1,
                        LeadCategoryId = Guid.Parse("6C92D610-4837-425C-98EF-57831C36EF71"),
                        LeadCompanyId = leadCompanyId,
                        FinalStatus = FinalStatus.Open,
                        UserId = salesExecutiveId,
                        Designation = leadModel.Designation,
                        Department = leadModel.Department,
                    };

                    leadEntities.Add(lead);
                }

                // Add valid users and leads
                await adminRepository.AddMasterUsers(masterUsers);
                await leadRepository.AddLeadsAsync(leadEntities);

                // Prepare response models for leads
                foreach (var lead in leadEntities)
                {
                    var sourceLead = await leadRepository.GetLeadById(lead.Id);
                    if (sourceLead != null)
                    {
                        var assignToUser = await userRepository.GetByIdAsync(sourceLead.AssignToId);
                        sourceLead.AssignedTo = assignToUser?.Name ?? "N/A";

                        var company = await companyRepository.GetByIdAsync(lead.CompanyId);
                        sourceLead.CompanyName = company?.CompanyName ?? "N/A";

                        leadResponseModels.Add(sourceLead);
                    }
                }

                // Add duplicates to response models
                foreach (var duplicateEmail in duplicateEmails)
                {
                    leadResponseModels.Add(new LeadResponseModel
                    {
                        Email = duplicateEmail,
                        StatusMessage = "Duplicate email. Already exists."
                    });
                }

                // Success response with counts
                var addedCount = validLeadModels.Count;
                var skippedCount = duplicateEmails.Count;

                return ApiResponse<IEnumerable<LeadResponseModel>>.SuccessResponse(
                    leadResponseModels,
                    $"Successfully added {addedCount} new lead(s). {skippedCount} email(s) were skipped as they already exist.",
                    HttpStatusCodes.Created
                );
            }
            catch (Exception ex)
            {
                // Log the exception here
                return ApiResponse<IEnumerable<LeadResponseModel>>.ErrorResponse(
                    $"{ApiMessages.TechnicalError}",
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

        public async Task<ApiResponse<IEnumerable<ProjectResponseModel>>> GetAllProjectsByUser()
        {

            try
            {

                var userLoggedIn = contextService.UserId();
                var companyUser=await userRepository.GetUserById(userLoggedIn);
                var companyId=companyUser.CompanyId;


                var projects = await companyRepository.GetProjectsByUser(companyId);

                if (!projects.Any())
                {
                    return ApiResponse<IEnumerable<ProjectResponseModel>>.ErrorResponse("No projects found for the specified user.", HttpStatusCodes.NotFound);
                }

                return ApiResponse<IEnumerable<ProjectResponseModel>>.SuccessResponse(projects, $"{projects.Count()} Projects retrieved successfully.", HttpStatusCodes.OK);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<ProjectResponseModel>>.ErrorResponse($"An error occurred: {ex.Message}", HttpStatusCodes.InternalServerError);
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