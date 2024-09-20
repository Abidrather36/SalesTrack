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
using static SalesTrack.Application.Shared.ApiMessages;

namespace salesTrack.Application.Services
{
    public class AdminService : IAdminService
    {
        private readonly IUserRepository userRepository;
        private readonly IAdminRepository adminRepository;
        private readonly IContextService contextService;
        private readonly IEmailHelperService emailHelperService;

        public AdminService(IUserRepository userRepository,IAdminRepository adminRepository,IContextService contextService,IEmailHelperService emailHelperService)
        {
            this.userRepository = userRepository;
            this.adminRepository = adminRepository;
            this.contextService = contextService;
            this.emailHelperService = emailHelperService;
        }

        public async Task<ApiResponse<UserResponseModel>> AddUser(UserRequestModel model)
        {
          

            try
            {

                var companyAdmin = contextService.UserId();
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
                        CreatedBy = companyAdmin,
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
                                CreatedBy = companyAdmin,
                                CreatedDate = DateTime.Now,
                                DeletedBy = Guid.Empty,
                                DeletedDate = DateTime.Now,
                                ModifiedBy = Guid.Empty,
                                ModifiedDate = DateTime.Now,
                                IsActive = true,
                                UserType = UserType.SalesExecutive,
                                CompanyId=companyAdmin,
                            };
                            var salesExecutiveAdded = await userRepository.AddUser(salesExecutive);
                            
                        }
                        else
                        {
                            var salesManager = new Domain.Entities.User()
                            {
                                Id = user.Id,
                                ReportsTo = model.ReportsTo,
                                CreatedBy = companyAdmin,
                                CreatedDate = DateTime.Now,
                                DeletedBy = Guid.Empty,
                                DeletedDate = DateTime.Now,
                                ModifiedBy = Guid.Empty,
                                ModifiedDate = DateTime.Now,
                                IsActive = true,
                                UserType = UserType.SalesManager,
                                CompanyId = companyAdmin,

                            };
                            var salesManagerAdded = await userRepository.AddUser(salesManager);
                           

                        }
                        var isEmailSent = await emailHelperService.AddRegistrationEmail(user.Email!, newPassword, user.Name!);
                        if (isEmailSent)
                        {
                            var reporter=await userRepository.GetByIdAsync(model.ReportsTo);
                            return ApiResponse<UserResponseModel>.SuccessResponse(new UserResponseModel
                            {
                                Id = user.Id,
                                Name = user.Name,
                                Email = user.Email,
                                PhoneNumber = user.PhoneNumber,
                                UserRole = user.UserRole,
                                UserType = model.UserType,
                                ReportsToId =model.ReportsTo,
                                ReportsToName=reporter!.Name!,
                                IsPasswordTemporary = user.IsPasswordTemporary,
                                IsActive=user.IsActive, 

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
                var adminId = contextService.UserId();

                if (adminId == Guid.Empty)
                {
                    return ApiResponse<AdminProcessStepResponseModel>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
                }
                var alredyStepExists=await adminRepository.IsExistsAsync(x => x.StepName == model.StepName);
                if (alredyStepExists)
                {
                    return ApiResponse<AdminProcessStepResponseModel>.ErrorResponse(ApiMessages.Process.ProcessStepAlreadyExists, HttpStatusCodes.BadRequest);
                }
                else
                {
                    AdminProcessStep adminProcessStep = new()
                    {
                        Id = Guid.NewGuid(),
                        StepName = model.StepName,
                        CreatedBy = adminId,
                        ModifiedBy = Guid.Empty,
                        CreatedDate = DateTime.Now,
                        IsActive = true,
                        ModifiedDate = DateTime.Now,
                        DeletedBy = Guid.Empty,
                        DeletedDate = null,
                    };
                    var adminProcessStepAdded = await adminRepository.InsertAsync(adminProcessStep);
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
            }
         
            catch(Exception ex)
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
                    adminProcessStep.ModifiedDate= DateTime.UtcNow; 
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
           var processStep=await adminRepository.GetByIdAsync(Id);
            if(processStep is null)
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
           var adminProcessSteps=await adminRepository.GetAllAsync();
            if(adminProcessSteps is null)
            {
                return ApiResponse<IEnumerable<AdminProcessStepResponseModel>>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
            }
            else
            {
                var adminProcessResponse= adminProcessSteps.Select(x => new AdminProcessStepResponseModel
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
                var stepProcess = await adminRepository.GetByIdAsync(model.Id);
                if (stepProcess is null)
                {
                    return ApiResponse<AdminProcessStepResponseModel>.ErrorResponse(ApiMessages.ProcessManagement.StepProcessNotFound, HttpStatusCodes.BadRequest);
                }
                else
                {
                    stepProcess.StepName = model.StepName;
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
        public async Task<ApiResponse<IEnumerable<UserResponseModel>>> GetAllUsersByCompanyId(Guid CompanyId)
        {
          var users=await userRepository.GetAllUsersByCompanyIdAsync(CompanyId);
            if (users is null)
            {
                return ApiResponse<IEnumerable<UserResponseModel>>.ErrorResponse(ApiMessages.Auth.UserNotFound, HttpStatusCodes.BadRequest);

            }
            else
            {
                return ApiResponse<IEnumerable<UserResponseModel>>.SuccessResponse(users,"users found Successfully",HttpStatusCodes.OK);
            }
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

    }
}
