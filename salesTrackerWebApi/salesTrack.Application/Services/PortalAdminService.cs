using salesTrack.Application.Abstraction.Iidentity;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Abstraction.IRepository;
using SalesTrack.Application.Common;
using SalesTrack.Application.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Application.Services
{
    public class PortalAdminService : IPortalAdminService
    {
        private readonly IUserRepository userRepository;
        private readonly ICompanyRepository companyRepository;
        private readonly IContextService contextService;

        public PortalAdminService(ICompanyRepository companyRepository
                                 ,IContextService contextService)
        {
            this.companyRepository = companyRepository;
            this.contextService = contextService;
        }
        public async Task<ApiResponse<CompanyResponseModel>> AddCompany(CompanyRequestModel model)
        {
            try
            {
                var portalAdmin = contextService.UserId();
             
                    var companyExists = await companyRepository.IsExistsAsync(x => x.CompanyName == model.CompanyName);
                    if (companyExists)
                    {
                        return ApiResponse<CompanyResponseModel>.ErrorResponse(ApiMessages.AlreadyAvailable, HttpStatusCodes.BadRequest);
                    }
                    else
                    {
                        Company company = new()
                        {
                            Id = Guid.NewGuid(),
                            Email = model.Email,
                            CompanyName = model.CompanyName,
                            PhoneNumber = model.PhoneNumber,
                            CreatedBy = portalAdmin,
                            ModifiedBy = Guid.Empty,
                            CreatedDate = DateTime.Now,
                            ModifiedDate = null,
                            DeletedBy = Guid.Empty,
                            IsActive = true,
                            DeletedDate = null

                        };
                        var companyAdded = await companyRepository.InsertAsync(company);
                        if (companyAdded > 0)
                        {

                            CompanyResponseModel companyResponseModel = new()
                            {
                                Id = company.Id,
                                CompanyName = company.CompanyName,
                                Email = company.Email,
                                PhoneNumber = company.PhoneNumber,
                            };

                            return ApiResponse<CompanyResponseModel>.SuccessResponse(companyResponseModel, "Company Added Successfully", HttpStatusCodes.OK);
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


        public Task<ApiResponse<CompanyResponseModel>> DeleteCompany(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<IEnumerable<CompanyResponseModel>>> GetAllComapnies()
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<CompanyResponseModel>> GetCompanyById(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
