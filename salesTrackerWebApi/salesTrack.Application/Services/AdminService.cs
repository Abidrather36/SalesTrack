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
using System.Reflection;

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

        public async Task<ApiResponse<UserResponseModel>> AddAdmin(UserRequestModel model)
        {
            try
            {
                var adminId = contextService.UserId();
                if (adminId == Guid.Empty)
                {
                    return ApiResponse<UserResponseModel>.ErrorResponse(ApiMessages.Admin.AdminNotFound, HttpStatusCodes.BadRequest);

                }
                else
                {
                    var adminExists = await userRepository.IsExistsAsync(x => x.Email == model.Email);
                    if (adminExists)
                    {
                        return ApiResponse<UserResponseModel>.ErrorResponse(ApiMessages.Admin.AdminAlreadyExists, HttpStatusCodes.BadRequest);
                    }
                   

                        else
                        {
                        var adminPassword = AppEncryption.GenerateRandomPassword(model.Email!);
                        User user = new()
                        {
                            Id = Guid.NewGuid(),
                            Name = model.Name,
                            Email = model.Email,
                            PhoneNumber = model.PhoneNumber,
                            CreatedBy = adminId,
                            CreatedDate = DateTime.Now,
                            ModifiedBy = Guid.Empty,
                            DeletedDate = null,
                            ReportsTo = Guid.Empty,
                            IsActive = true,
                            IsPasswordTemporary = true,
                            UserRole = UserRole.Admin,
                         

                        };
                            user.Salt = AppEncryption.GenerateSalt();
                            user.Password = AppEncryption.CreatePassword(adminPassword, user.Salt);
                            var adminAdded = await userRepository.InsertAsync(user);
                            if (adminAdded > 0)
                            {
                               var isEmailExist=await emailHelperService.AddRegistrationEmail(user.Email!,adminPassword,user.Name!);
                            if(isEmailExist)
                            {
                                return ApiResponse<UserResponseModel>.SuccessResponse(new UserResponseModel
                                {
                                    Id = user.Id,
                                    Name = model.Name,
                                    Email = model.Email,
                                    PhoneNumber = model.PhoneNumber,
                                    UserRole=UserRole.Admin,
                                    ReportsTo=Guid.Empty

                                }, ApiMessages.Admin.AdminAddedSuccessfully, HttpStatusCodes.Created);
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

                
            }
          
          catch (Exception ex)
            {
                return ApiResponse<UserResponseModel>.ErrorResponse();
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
    }
}
