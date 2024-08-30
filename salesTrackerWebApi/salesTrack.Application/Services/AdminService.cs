using salesTrack.Application.Abstraction.Iidentity;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Application.Abstraction.IService;
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

namespace salesTrack.Application.Services
{
    public class AdminService : IAdminService
    {
        private readonly IUserRepository userRepository;
        private readonly IAdminRepository adminRepository;
        private readonly IContextService contextService;

        public AdminService(IUserRepository userRepository,IAdminRepository adminRepository,IContextService contextService)
        {
            this.userRepository = userRepository;
            this.adminRepository = adminRepository;
            this.contextService = contextService;
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
                            var adminAdded = await userRepository.InsertAsync(user);
                            if (adminAdded > 0)
                            {
                                return ApiResponse<UserResponseModel>.SuccessResponse(new UserResponseModel
                                {
                                    Id = user.Id,
                                    Name = model.Name,
                                    Email = model.Email,
                                    PhoneNumber = model.PhoneNumber,

                                }, ApiMessages.Admin.AdminAddedSuccessfully, HttpStatusCodes.Created);
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
    }
}
