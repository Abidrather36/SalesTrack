using salesTrack.Application.Abstraction.IEmailService;
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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static SalesTrack.Application.Shared.ApiMessages;

namespace salesTrack.Application.Services
{
    public class PortalAdminService : IPortalAdminService
    {
        private readonly IUserRepository userRepository;
        private readonly ICompanyRepository companyRepository;
        private readonly IEmailHelperService emailHelperService;
        private readonly IContextService contextService;

        public PortalAdminService(ICompanyRepository companyRepository, IEmailHelperService emailHelperService, IUserRepository userRepository, IContextService contextService)
        {
            this.companyRepository = companyRepository;
            this.emailHelperService = emailHelperService;
            this.userRepository = userRepository;
            this.contextService = contextService;
        }
        public async Task<ApiResponse<CompanyResponseModel>> AddCompany(CompanyRequestModel model)
        {
            try
            {
                var portalAdmin = contextService.UserId();


                if (await companyRepository.IsExistsAsync(x => x.CompanyName == model.CompanyName))
                {
                    return ApiResponse<CompanyResponseModel>.ErrorResponse("Company Alredy registered", HttpStatusCodes.BadRequest);
                }
                else
                {
                    var newPassword = AppEncryption.GenerateRandomPassword(model.Email!);

                    MasterUser masterUser = new()
                    {
                        Id = Guid.NewGuid(),
                        Name = model.Name,
                        CreatedBy = portalAdmin,
                        CreatedDate = DateTime.Now,
                        PhoneNumber = model.PhoneNumber,
                        IsActive = true,
                        UserRole = UserRole.CompanyAdmin,
                        Email = model.Email,
                        DeletedBy = Guid.Empty,
                        DeletedDate = null,
                        ModifiedBy = Guid.Empty
                    };
                    masterUser.Salt = AppEncryption.GenerateSalt();
                    masterUser.Password = AppEncryption.CreatePassword(newPassword, masterUser.Salt);
                    var masterUserAdded = await userRepository.InsertAsync(masterUser);
                    if (masterUserAdded > 0)
                    {
                        Company company = new()
                        {
                            Id = masterUser.Id,
                            CompanyName = model.CompanyName,
                            CreatedBy = masterUser.CreatedBy,
                            CreatedDate = DateTime.Now,
                            IsActive = true,
                            Email = masterUser.Email,
                            DeletedBy = Guid.Empty,
                            DeletedDate = null,
                            ModifiedBy = Guid.Empty,
                            PhoneNumber = masterUser.PhoneNumber,
                            ModifiedDate = DateTime.Now,
                        };
                        var companyAdded = await companyRepository.InsertAsync(company);
                        var isEmailSent = await emailHelperService.AddRegistrationEmail(company.Email!, newPassword, company.CompanyName!);

                        if (companyAdded > 0)
                        {
                            if (isEmailSent)
                            {
                                CompanyResponseModel companyResponseModel = new()
                                {
                                    Id = company.Id,
                                    AdminName = masterUser.Name,
                                    CompanyName = company.CompanyName,
                                    Email = company.Email,
                                    PhoneNumber = company.PhoneNumber

                                };
                                return ApiResponse<CompanyResponseModel>.SuccessResponse(companyResponseModel, "Company Added Successfully ", HttpStatusCodes.OK);


                            }
                            else
                            {
                                return ApiResponse<CompanyResponseModel>.ErrorResponse("Something wronf went with email ", HttpStatusCodes.OK);

                            }
                        }
                        else
                        {
                            return ApiResponse<CompanyResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                        }

                    }
                    else
                    {
                        return ApiResponse<CompanyResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);

                    }
                }



            }
            catch (Exception ex)
            {
                return ApiResponse<CompanyResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message} ", HttpStatusCodes.BadRequest);

            }

        }

        public async Task<ApiResponse<CompanyResponseModel>> DeleteCompany(Guid id)
        {
            try
            {
                var portalAdmin = contextService.UserId();
                var user = await companyRepository.GetByIdAsync(id);
                var company = await companyRepository.GetByIdAsync(id);
                if (user is null)
                {
                    return ApiResponse<CompanyResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                }
                else if (company is null)
                {
                    return ApiResponse<CompanyResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);

                }
                else
                {
                    user.IsActive = false;
                    user.ModifiedBy = portalAdmin;
                    user.ModifiedDate = DateTime.Now;

                    company.IsActive = false;
                    company.ModifiedBy = portalAdmin;
                    company.ModifiedDate = DateTime.Now;

                    var userUpdated = await companyRepository.UpdateAsync(user);
                    var companyUpdated = await companyRepository.UpdateAsync(company);

                    if (userUpdated > 0 && companyUpdated > 0)
                    {
                        var companyDeleted = await companyRepository.GetCompanyByIdAsync(company.Id);
                        return ApiResponse<CompanyResponseModel>.SuccessResponse(companyDeleted, "Company Deleted Successfully", HttpStatusCodes.OK);
                    }
                    else
                    {
                        return ApiResponse<CompanyResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                    }
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<CompanyResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message} ", HttpStatusCodes.BadRequest);

            }
        }

        public async Task<ApiResponse<IEnumerable<CompanyResponseModel>>> GetAllComapnies()
        {
            try
            {
                var companies = await companyRepository.GetAllCompaniesAsync();
                if (companies.Any())
                {
                    return ApiResponse<IEnumerable<CompanyResponseModel>>.SuccessResponse(companies, $"{companies.Count()} Found", HttpStatusCodes.OK);
                }
                else
                {
                    return ApiResponse<IEnumerable<CompanyResponseModel>>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);

                }
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<CompanyResponseModel>>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message} ", HttpStatusCodes.BadRequest);

            }
        }

        public async Task<ApiResponse<CompanyResponseModel>> GetCompanyById(Guid id)
        {
            try
            {
                var company = await companyRepository.GetCompanyByIdAsync(id);
                if (company is not null)
                {
                    return ApiResponse<CompanyResponseModel>.SuccessResponse(company, "Company Found", HttpStatusCodes.OK);
                }
                else
                {
                    return ApiResponse<CompanyResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);

                }
            }
            catch (Exception ex)
            {
                return ApiResponse<CompanyResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message} ", HttpStatusCodes.BadRequest);

            }
        }

        public async Task<ApiResponse<CompanyResponseModel>> UpdateCompany(CompanyRequestUpdateModel model)
        {
            var portalAdmin = contextService.UserId();

            var masterUser = await userRepository.GetByIdAsync(model.Id);
            var company = await companyRepository.GetByIdAsync(model.Id);

            if(masterUser is null )
            {
                return ApiResponse<CompanyResponseModel>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
            }
            else
            {
                masterUser.Name = model.Name;
                masterUser.Email = model.Email;
                masterUser.PhoneNumber = model.PhoneNumber;


             var updatedmasterUser=  await userRepository.UpdateAsync(masterUser);
                if (company is null)
                {
                    return ApiResponse<CompanyResponseModel>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
                }
                else
                {
                    company.CompanyName = model.CompanyName;
                    company.ModifiedBy = portalAdmin;
                    company.PhoneNumber = model.PhoneNumber;
                    company.Email = model.Email;
                    company.ModifiedDate = DateTime.Now;

                    var companyUpdated = await companyRepository.UpdateAsync(company);
                    if (updatedmasterUser > 0 && companyUpdated >0)
                    {
                        CompanyResponseModel companyResponse = new()
                        {
                            Id = model.Id,
                            AdminName = masterUser.Name,
                            CompanyName = company.CompanyName,
                            PhoneNumber = company.PhoneNumber,
                            Email = masterUser.Email,
                            IsActive = company.IsActive,

                        };

                        return ApiResponse<CompanyResponseModel>.SuccessResponse(companyResponse, "CompanyUpdated Successfully", HttpStatusCodes.OK);
                    }
                    else
                    {
                        return ApiResponse<CompanyResponseModel>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);

                    }

                }
            }
         
        }
    }
}
