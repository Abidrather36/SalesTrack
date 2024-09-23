using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;

namespace salesTrack.Application.Abstraction.IService
{
    public  interface IPortalAdminService
    {
        Task<ApiResponse<CompanyResponseModel>> AddCompany(CompanyRequestModel model);
        Task<ApiResponse<IEnumerable<CompanyResponseModel>>> GetAllComapnies();
        Task<ApiResponse<CompanyResponseModel>> GetCompanyById(Guid id);
        Task<ApiResponse<CompanyResponseModel>> DeleteCompany(Guid id);
        Task<ApiResponse<CompanyResponseModel>> UpdateCompany(CompanyRequestUpdateModel model);

    }
}
