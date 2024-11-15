using salesTrack.Application.Abstraction.IEmailService;
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
using SalesTrack.Domain.Entities.Models.Request;
using System.ComponentModel.Design;
using System.Data;
using static SalesTrack.Application.Shared.ApiMessages;

namespace salesTrack.Application.Services
{
    public class AdminService : IAdminService
    {
        private readonly IUserRepository userRepository;
        private readonly IAdminRepository adminRepository;
        private readonly IContextService contextService;
        private readonly IEmailHelperService emailHelperService;
        private readonly ICompanyRepository companyRepository;
        private readonly ILeadRepository leadRepository;

        public AdminService(IUserRepository userRepository, IAdminRepository adminRepository, IContextService contextService, IEmailHelperService emailHelperService, ICompanyRepository companyRepository, ILeadRepository leadRepository)
        {
            this.userRepository = userRepository;
            this.adminRepository = adminRepository;
            this.contextService = contextService;
            this.emailHelperService = emailHelperService;
            this.companyRepository = companyRepository;
            this.leadRepository = leadRepository;
        }

        public async Task<ApiResponse<UserResponseModel>> AddUser(UserRequestModel model)
        {


            try
            {

                var companyId = contextService.UserId();
                if (await userRepository.IsExistsAsync(x => x.Email == model.Email))
                {
                    return ApiResponse<UserResponseModel>.ErrorResponse(ApiMessages.AlreadyAvailable, HttpStatusCodes.BadRequest);

                }

                else
                {
                    var newPassword = AppEncryption.GenerateRandomPassword(model.Email!);
                    MasterUser user = new MasterUser()
                    {

                        Name = model.Name,
                        Email = model.Email,
                        PhoneNumber = model.PhoneNumber,
                        CreatedBy = companyId,
                        ModifiedBy = Guid.Empty,
                        CreatedDate = DateTime.Now,
                        DeletedBy = Guid.Empty,
                        IsActive = true,
                        UserRole = model.UserType == UserType.SalesExecutive ? UserRole.SalesExecutive : UserRole.SalesManager,
                    };
                    user.Salt = AppEncryption.GenerateSalt();
                    user.Password = AppEncryption.CreatePassword(newPassword, user.Salt);
                    var dbUser = await userRepository.InsertAsync(user);
                    if (dbUser > 0)
                    {
                        if (model.UserType == UserType.SalesExecutive)
                        {
                            var salesExecutive = new Domain.Entities.User()
                            {
                                Id = user.Id,
                                ReportsTo = model.ReportsTo,
                                CreatedBy = companyId,
                                CreatedDate = DateTime.Now,
                                DeletedBy = Guid.Empty,
                                DeletedDate = DateTime.Now,
                                ModifiedBy = Guid.Empty,
                                ModifiedDate = DateTime.Now,
                                IsActive = true,
                                UserType = UserType.SalesExecutive,
                                CompanyId = companyId,
                            };
                            var salesExecutiveAdded = await userRepository.AddUser(salesExecutive);

                        }
                        else
                        {
                            var salesManager = new Domain.Entities.User()
                            {
                                Id = user.Id,
                                ReportsTo = model.ReportsTo,
                                CreatedBy = companyId,
                                CreatedDate = DateTime.Now,
                                DeletedBy = Guid.Empty,
                                DeletedDate = DateTime.Now,
                                ModifiedBy = Guid.Empty,
                                ModifiedDate = DateTime.Now,
                                IsActive = true,
                                UserType = UserType.SalesManager,
                                CompanyId = companyId,

                            };
                            var salesManagerAdded = await userRepository.AddUser(salesManager);


                        }
                        var isEmailSent = await emailHelperService.AddRegistrationEmail(user.Email!, newPassword, user.Name!);
                        if (isEmailSent)
                        {
                            var reporter = await userRepository.GetByIdAsync(model.ReportsTo);
                            return ApiResponse<UserResponseModel>.SuccessResponse(new UserResponseModel
                            {
                                Id = user.Id,
                                Name = user.Name,
                                Email = user.Email,
                                PhoneNumber = user.PhoneNumber,
                                UserRole = user.UserRole,
                                UserType = model.UserType,
                                ReportsToId = model.ReportsTo,
                                ReportsToName = reporter!.Name!,
                                IsPasswordTemporary = user.IsPasswordTemporary,
                                IsActive = user.IsActive,

                            }, ApiMessages.User.UserAddedSuccessfully, HttpStatusCodes.Created);
                        }
                        else
                        {
                            return ApiResponse<UserResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                        }
                    }
                    else
                    {
                        return ApiResponse<UserResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                    }
                }

            }

            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<ApiResponse<AdminProcessStepResponseModel>> AddAdminProcessStep(AdminProcessStepRequestModel model)
        {
            try
            {
                var loggedInCompany = contextService.UserId();
                
                
                if (await adminRepository.IsExistsAsync(
                    x => x.StepName == model.StepName
                ))
                {
                    return ApiResponse<AdminProcessStepResponseModel>.ErrorResponse(ApiMessages.Process.ProcessStepAlreadyExists, HttpStatusCodes.BadRequest);
                }

                AdminProcessStep adminProcessStep = new()
                {
                    Id = Guid.NewGuid(),
                    StepName = model.StepName,
                    CompanyId = loggedInCompany, 
                    CreatedBy = loggedInCompany,
                    ModifiedBy = Guid.Empty,
                    CreatedDate = DateTime.Now,
                    IsActive = true,
                    ModifiedDate = DateTime.Now,
                    DeletedBy = Guid.Empty,
                    DeletedDate = null,
                };

                var adminProcessStepAdded = await adminRepository.AddAdminProcessStep(adminProcessStep);

                if (adminProcessStepAdded > 0)
                {
                    return ApiResponse<AdminProcessStepResponseModel>.SuccessResponse(new AdminProcessStepResponseModel
                    {
                        Id = adminProcessStep.Id,
                        StepName = adminProcessStep.StepName,
                    }, ApiMessages.Process.ProcessAddedSuccessfully, HttpStatusCodes.OK);
                }
                else
                {
                    return ApiResponse<AdminProcessStepResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<AdminProcessStepResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);
            }
        }




        public async Task<ApiResponse<DeleteAdminProcessStepResponseModel>> DeleteAdminProcessStep(Guid Id)
        {
            try
            {
                var adminId = contextService.UserId();
                var adminProcessStep = await adminRepository.GetByIdAsync(Id);
                if (adminProcessStep is null)
                {
                    return ApiResponse<DeleteAdminProcessStepResponseModel>.ErrorResponse(ApiMessages.ProcessManagement.StepProcessFound, HttpStatusCodes.NotFound);
                }
                else
                {
                    adminProcessStep.IsActive = false;
                    adminProcessStep.DeletedDate = DateTime.UtcNow;
                    adminProcessStep.DeletedBy = adminId;
                    adminProcessStep.ModifiedBy = adminId;
                    adminProcessStep.ModifiedDate = DateTime.UtcNow;
                    var adminProcessStepResponse = await adminRepository.UpdateAsync(adminProcessStep);
                    if (adminProcessStepResponse > 0)
                    {
                        DeleteAdminProcessStepResponseModel model = new()
                        {
                            Id = adminProcessStep.Id,
                            StepName = adminProcessStep.StepName,
                            IsActive = false
                        };
                        return ApiResponse<DeleteAdminProcessStepResponseModel>.SuccessResponse(model, ApiMessages.ProcessManagement.StepProcessDeletedSuccessfully, HttpStatusCodes.OK);
                    }
                    else
                    {
                        return ApiResponse<DeleteAdminProcessStepResponseModel>.ErrorResponse(ApiMessages.ProcessManagement.StepProcessDeletionFailed, HttpStatusCodes.BadRequest);

                    }
                }

            }
            catch (Exception ex)
            {
                return ApiResponse<DeleteAdminProcessStepResponseModel>.ErrorResponse($"{ApiMessages.ProcessManagement.StepProcessDeletionFailed} {ex.Message}", HttpStatusCodes.BadRequest);

            }
        }

        public async Task<ApiResponse<AdminProcessStepResponseModel>> GetAdminProcessStepById(Guid Id)
        {
            var processStep = await adminRepository.GetByIdAsync(Id);
            if (processStep is null)
            {
                return ApiResponse<AdminProcessStepResponseModel>.ErrorResponse(ApiMessages.ProcessManagement.StepProcessNotFound, HttpStatusCodes.BadRequest);
            }
            else
            {
                AdminProcessStepResponseModel adminProcessStepResponseModel = new()
                {
                    Id = processStep.Id,
                    StepName = processStep.StepName,
                };
                return ApiResponse<AdminProcessStepResponseModel>.SuccessResponse(adminProcessStepResponseModel, ApiMessages.ProcessManagement.StepProcessFound, HttpStatusCodes.OK);
            }
        }

        public async Task<ApiResponse<IEnumerable<AdminProcessStepResponseModel>>> GetAllAdminProcessSteps()
        {
            var userId =contextService.UserId();
            var user =await userRepository.GetUserById(userId);
            var adminProcessSteps = await companyRepository.GetAllAdminProcessStepsByCompanyId(user.CompanyId);

            if (adminProcessSteps is null)
            {
                return ApiResponse<IEnumerable<AdminProcessStepResponseModel>>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
            }
            else
            {
                var adminProcessResponse = adminProcessSteps.Select(x => new AdminProcessStepResponseModel
                {
                    Id = x.Id,
                    StepName = x.StepName,
                });
                return ApiResponse<IEnumerable<AdminProcessStepResponseModel>>.SuccessResponse(adminProcessResponse, ApiMessages.ProcessManagement.StepProcessListRetrievedSuccessfully, HttpStatusCodes.OK);
            }
        }

        public async Task<ApiResponse<AdminProcessStepResponseModel>> UpdateAdminProcessStep(UpdateAdminProcessStepModel model)
        {
            try
            {
                var companyAdmin = contextService.UserId();
                var stepProcess = await adminRepository.GetByIdAsync(model.Id);
                if (stepProcess is null)
                {
                    return ApiResponse<AdminProcessStepResponseModel>.ErrorResponse(ApiMessages.ProcessManagement.StepProcessNotFound, HttpStatusCodes.BadRequest);
                }
                else
                {
                    stepProcess.StepName = model.StepName;
                    stepProcess.ModifiedBy = companyAdmin;
                    stepProcess.ModifiedDate = DateTime.Now;
                    var stepProcessupdated = await adminRepository.UpdateAsync(stepProcess);
                    if (stepProcessupdated > 0)
                    {
                        return ApiResponse<AdminProcessStepResponseModel>.SuccessResponse(new AdminProcessStepResponseModel
                        {
                            Id = stepProcess.Id,
                            StepName = stepProcess.StepName,

                        }, ApiMessages.ProcessManagement.StepProcessUpdateSuccess, HttpStatusCodes.OK);
                    }
                    else
                    {
                        return ApiResponse<AdminProcessStepResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                    }
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<AdminProcessStepResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message} ", HttpStatusCodes.BadRequest);
            }
        }
        public async Task<ApiResponse<IEnumerable<UserResponseModel>>> GetAllUsersByCompanyId()
        {
            var dbSet = new List<UserResponseModel>();
            var userId = contextService.UserId();
            var returnedUser = await userRepository.GetCompanyIdByUserId(userId);
            if (returnedUser.UserRole == UserRole.SalesManager || returnedUser.UserRole == UserRole.SalesExecutive)
            {
                var miniUser = await userRepository.GetUserById(returnedUser.Id);
                if (miniUser.UserType == UserType.SalesExecutive || miniUser.UserType == UserType.SalesManager)
                {
                    var dataSet = await userRepository.GetAllUsersByCompanyIdAsync(miniUser.CompanyId);
                    foreach (var user in dataSet)
                    {
                        dbSet.Add(user);
                    }

                }
            }

            else
            {
                var dataSet = await userRepository.GetAllUsersByCompanyIdAsync(returnedUser.Id);
                foreach (var user in dataSet)
                {
                    dbSet.Add(user);
                }
            }

            if (dbSet == null || !dbSet.Any())
            {
                return ApiResponse<IEnumerable<UserResponseModel>>.ErrorResponse(
                    "No Users Found",
                    HttpStatusCodes.BadRequest
                );
            }

            var userListWithReportsTo = new List<UserResponseModel>();

            foreach (var user in dbSet)
            {

                string? reportsToName = null;
                if (user.ReportsToId != null)
                {
                    var reportsTo = await userRepository.GetMasterUserById(user.ReportsToId.Value);
                    reportsToName = reportsTo?.Name ?? string.Empty;
                }


                userListWithReportsTo.Add(new UserResponseModel
                {
                    Id = user.Id,
                    CompanyId = user.CompanyId,
                    ReportsToId = user.ReportsToId,
                    ReportsToName = reportsToName!,
                    Name = user.Name,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    IsActive = user.IsActive,
                    UserRole = user.UserRole,
                    UserType = user.UserType,
                    CompanyName = user.CompanyName,
                    IsPasswordTemporary = user.IsPasswordTemporary,

                });
            }

            return ApiResponse<IEnumerable<UserResponseModel>>.SuccessResponse(
                userListWithReportsTo,
                "Users found successfully",
                HttpStatusCodes.OK
            );
        }


        public async Task<ApiResponse<UserResponseModel>> GetUserById(Guid id)
        {
            var user = await userRepository.GetByIdAsync(id);
            if (user is null)
            {
                return ApiResponse<UserResponseModel>.ErrorResponse(ApiMessages.Auth.UserNotFound, HttpStatusCodes.BadRequest);

            }
            else
            {
                UserResponseModel userResponseModel = new()
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    IsPasswordTemporary = user.IsPasswordTemporary,
                    PhoneNumber = user.PhoneNumber,
                    UserRole = user.UserRole,
                    /*       UserType = user.UserType,
                           ReportsTo = user.ReportsTo,*/

                };
                return ApiResponse<UserResponseModel>.SuccessResponse(userResponseModel, ApiMessages.User.UserFound, HttpStatusCodes.OK);

            }
        }



        public async Task<ApiResponse<IEnumerable<TimeSheetResponseModel>>> GetTimeSheetByUser(DateTimeOffset? startDate, DateTimeOffset? endDate, Guid userId)
        {
            try
            {
                var companyUser = contextService.UserId();

                if (endDate < startDate)
                {
                    return ApiResponse<IEnumerable<TimeSheetResponseModel>>.ErrorResponse("End date cannot be earlier than start date.", HttpStatusCodes.BadRequest);
                }
                

                if (startDate == null || endDate == null)
                {
                    var timeSheetByUser = await leadRepository.GetAllTimeSheetsByUser(userId);
                    if (timeSheetByUser.Any())
                    {
                        return ApiResponse<IEnumerable<TimeSheetResponseModel>>.SuccessResponse(timeSheetByUser, $"{timeSheetByUser.Count()} TimeSheets Found", HttpStatusCodes.OK);

                    }
                    return ApiResponse<IEnumerable<TimeSheetResponseModel>>.ErrorResponse("No TimeSheets Found For the User");
                }
                else
                {
                    var res = await companyRepository.GetTimeSheet(startDate, endDate, userId);
                  
                    return ApiResponse<IEnumerable<TimeSheetResponseModel>>.SuccessResponse(res, $"{res.Count()} TimeSheets Found", HttpStatusCodes.OK);
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TimeSheetResponseModel>>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);
            }
        }

        public async Task<ApiResponse<IEnumerable<AdminProcessStepResponseModel>>> GetAllAdminProcessStepsByCompany()
        {
            try
            {
                var companyId = contextService.UserId();
                               
                var steps = await companyRepository.GetAllAdminProcessStepsByCompanyId(companyId);


                if (steps == null || !steps.Any())
                {
                    return ApiResponse<IEnumerable<AdminProcessStepResponseModel>>.ErrorResponse("No process steps found for this company.",HttpStatusCodes.BadRequest);
                }
                else
                {
                    return ApiResponse<IEnumerable<AdminProcessStepResponseModel>>.SuccessResponse(steps,$"{steps.Count()} found",HttpStatusCodes.OK);

                }
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<AdminProcessStepResponseModel>>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }
        }

        public async Task<ApiResponse<UserResponseModel>> UpdateUser(UserUpdateModel model)
        {
            try
            {
                var loggedInCompany = contextService.UserId();

                var masterUser = await userRepository.GetMasterUserById(model.Id);
                var user = await userRepository.GetUserById(model.Id);

                if (user is null || masterUser is null)
                {
                    return ApiResponse<UserResponseModel>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
                }

                masterUser.Name = model.Name;
                masterUser.Email = model.Email;
                masterUser.PhoneNumber = model.PhoneNumber;
                masterUser.ModifiedBy = loggedInCompany;
                masterUser.ModifiedDate= DateTime.Now;
                var updatedMasterUser = await userRepository.UpdateAsync(masterUser);

                if (updatedMasterUser > 0)
                {
                    UserResponseModel userResponse = new UserResponseModel
                    {
                        Id = masterUser.Id,
                        Name = masterUser.Name,
                        Email = masterUser.Email,
                        PhoneNumber = masterUser.PhoneNumber,
                        IsActive = user.IsActive,
                    };

                    return ApiResponse<UserResponseModel>.SuccessResponse(userResponse, "User updated successfully", HttpStatusCodes.OK);
                }
                else
                {
                    return ApiResponse<UserResponseModel>.ErrorResponse("Update Failed", HttpStatusCodes.BadRequest);
                }
            
            }
            catch (Exception ex)
            {
                return ApiResponse<UserResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }
        }

        public async Task<ApiResponse<UserResponseModel>> DeleteUser(Guid id)
        {
            try
            {
                var loggedInUser = contextService.UserId();
                var masterUser = await userRepository.GetByIdAsync(id);
                var user = await userRepository.GetUserById(id);
                if (masterUser == null || user == null)
                {
                    return ApiResponse<UserResponseModel>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);

                }
                else
                {
                    masterUser.IsActive = false;
                    masterUser.ModifiedBy = loggedInUser;
                    masterUser.ModifiedDate = DateTime.Now;

                    user.IsActive = false;
                    user.ModifiedBy = loggedInUser;
                    user.ModifiedDate = DateTime.Now;

                    var masterUserUpdated = await userRepository.UpdateAsync(masterUser);
                    var userUpdated = await userRepository.UpdateUser(user);
                    if (masterUserUpdated > 0 && userUpdated > 0)
                    {
                        var userDeleted = await userRepository.GetUserById(user.Id);
                        UserResponseModel userResponseModel = new()
                        {
                            Id = userDeleted.Id,
                            Name = userDeleted.MasterUser.Name,
                            Email = userDeleted.MasterUser.Email,
                            PhoneNumber = userDeleted.MasterUser.PhoneNumber,
                            IsActive = userDeleted.IsActive,
                        };
                        return ApiResponse<UserResponseModel>.SuccessResponse(userResponseModel, "User Deleted Successfully", HttpStatusCodes.OK);
                    }
                    return ApiResponse<UserResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);

                }
            }
            catch (Exception ex)
            {
                return ApiResponse<UserResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);


            }
        }
        public async Task<ApiResponse<LeadCategoryResponse>> AddLeadCategory(LeadCategoryRequest model)
        {
            try
            {
                var loggedInUser = contextService.UserId();
                if (model.LeadCategoryName == string.Empty && model.LeadCategoryDescription == string.Empty)
                {
                    return ApiResponse<LeadCategoryResponse>.ErrorResponse("please enter values", HttpStatusCodes.BadRequest);
                }
                var leadCategories = await leadRepository.GetLeadCategories();

                if (leadCategories.Any(x => x.LeadCategoryName == model.LeadCategoryName))
                {
                    return ApiResponse<LeadCategoryResponse>.ErrorResponse("Lead Category Already Exits", HttpStatusCodes.BadRequest);

                }
                var leadCategory = new LeadCategory()
                {
                    Id = Guid.NewGuid(),
                    LeadCategoryName = model.LeadCategoryName,
                    LeadCategoryDescription = model.LeadCategoryDescription,
                    CreatedBy = loggedInUser,
                    CreatedDate = DateTime.Now,
                    IsActive = true,
                };
                var res = await leadRepository.AddLeadCategory(leadCategory);
                if (res > 0)
                {
                    LeadCategoryResponse leadCategoryResponse = new()
                    {
                        Id = leadCategory.Id,
                        LeadCategoryName = leadCategory.LeadCategoryName,
                        LeadCategoryDescription = leadCategory.LeadCategoryDescription,
                        IsActive = leadCategory.IsActive
                    };
                    return ApiResponse<LeadCategoryResponse>.SuccessResponse(leadCategoryResponse, "Lead Category Successfully Added", HttpStatusCodes.OK);
                }
                return ApiResponse<LeadCategoryResponse>.ErrorResponse("something went wrong please try again", HttpStatusCodes.BadRequest);
            }
            catch (Exception ex)
            {
                return ApiResponse<LeadCategoryResponse>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }
        }
        public async Task<ApiResponse<IEnumerable<LeadCategoryResponse>>> GetAllLeadCategories()
        {
            try
            {
                var loggedInUser = contextService.UserId();
                var leadCategories = await leadRepository.GetLeadCategories();
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

        public async Task<ApiResponse<LeadCategoryResponse>> UpdateLeadCategory(UpdateLeadCategory model)
        {
            try
            {
                var loggeInUser = contextService.UserId();
                var leadCategory = await leadRepository.GetLeadCategoryById(model.Id);
                if (leadCategory is null)
                {
                    return ApiResponse<LeadCategoryResponse>.ErrorResponse("No Such Lead Category ", HttpStatusCodes.BadRequest);
                }
                leadCategory.LeadCategoryName = model.LeadCategoryName;
                leadCategory.LeadCategoryDescription = model.LeadCategoryDescription;
                leadCategory.ModifiedBy = loggeInUser;
                leadCategory.ModifiedDate = DateTime.Now;

                var leadCategoryUpdated = await leadRepository.UpdateLeadCategory(leadCategory);
                if (leadCategoryUpdated > 0)
                {
                    LeadCategoryResponse res = new()
                    {
                        Id = leadCategory.Id,
                        LeadCategoryDescription = leadCategory.LeadCategoryDescription,
                        LeadCategoryName = leadCategory.LeadCategoryName,
                        IsActive = leadCategory.IsActive,
                    };
                    return ApiResponse<LeadCategoryResponse>.SuccessResponse(res, "Lead Category Updated Successfully", HttpStatusCodes.BadRequest);

                }
                return ApiResponse<LeadCategoryResponse>.ErrorResponse("Can't Update Please try Again", HttpStatusCodes.BadRequest);
            }
            catch (Exception ex)
            {
                return ApiResponse<LeadCategoryResponse>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }

        }

        public async Task<ApiResponse<LeadCategoryResponse>> DeleteLeadCategory(Guid id)
        {
            try
            {
                var loggedInUser = contextService.UserId();
                var leadCategory = await leadRepository.GetLeadCategoryById(id);
                if (leadRepository is null)
                {
                    return ApiResponse<LeadCategoryResponse>.ErrorResponse("No Such Lead Category ", HttpStatusCodes.BadRequest);

                }
                leadCategory.IsActive = false;
                leadCategory.ModifiedBy = loggedInUser;
                leadCategory.ModifiedDate = DateTime.Now;
                var leadCategoryDeleted = await leadRepository.UpdateLeadCategory(leadCategory);
                if (leadCategoryDeleted > 0)
                {
                    LeadCategoryResponse res = new()
                    {
                        Id = leadCategory.Id,
                        LeadCategoryDescription = leadCategory.LeadCategoryDescription,
                        LeadCategoryName = leadCategory.LeadCategoryName,
                        IsActive = leadCategory.IsActive,
                    };
                    return ApiResponse<LeadCategoryResponse>.SuccessResponse(res, "Lead Deleted Successfully", HttpStatusCodes.BadRequest);

                }
                return ApiResponse<LeadCategoryResponse>.ErrorResponse("Can't Delete Please Try Again ", HttpStatusCodes.BadRequest);

            }
            catch (Exception ex)
            {
                return ApiResponse<LeadCategoryResponse>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.BadRequest);

            }
        }
    }
}
