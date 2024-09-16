using salesTrack.Application.Abstraction.Iidentity;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using SalesTrack.Application.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Application.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository companyRepository;
        private readonly IContextService contextService;

        public CompanyService(ICompanyRepository companyRepository,IContextService contextService)
        {
            this.companyRepository = companyRepository;
            this.contextService = contextService;
        }
        public async  Task<ApiResponse<CompanyResponseModel>> AddCompany(CompanyRequestModel model)
        {
            try
            {
                var adminId = contextService.UserId();
                if (adminId == Guid.Empty)
                {
                    return ApiResponse<CompanyResponseModel>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
                }
                if (await companyRepository.IsExistsAsync(x => x.CompanyName == model.CompanyName))
                {
                    return ApiResponse<CompanyResponseModel>.ErrorResponse("Company ALready Exists", HttpStatusCodes.BadRequest);
                }

                else
                {
                    Company company = new()
                    {
                        Id = Guid.NewGuid(),
                        CompanyName = model.CompanyName,
                        CreatedBy = adminId,
                        CreatedDate = DateTime.Now,
                        ModifiedBy = Guid.Empty,
                        ModifiedDate = DateTime.Now,
                        IsActive = true,
                        DeletedBy = Guid.Empty,
                    };
                    var companyAdded = await companyRepository.InsertAsync(company);
                    if (companyAdded > 0)
                    {
                        CompanyResponseModel companyResponseModel = new()
                        {
                            Id = company.Id,
                            CompanyName = company.CompanyName,
                        };

                        return ApiResponse<CompanyResponseModel>.SuccessResponse(companyResponseModel, "Company Added Successfully", HttpStatusCodes.BadRequest);
                    }
                    else
                    {
                        return ApiResponse<CompanyResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
                    }
                }

            }


            catch (Exception ex)
            {
                return ApiResponse<CompanyResponseModel>.ErrorResponse($"{ApiMessages.TechnicalError} {ex.Message}", HttpStatusCodes.InternalServerError);

            }
        }
    }
}
