using salesTrack.Domain.Models;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using SalesTrack.Domain.Entities.Models.Request;

namespace salesTrack.Application.Abstraction.IService
{
    public interface IAdminService
    {
        Task<ApiResponse<UserResponseModel>> AddAdmin(UserRequestModel model);
        Task<ApiResponse<AdminProcessStepResponseModel>> AddAdminProcessStep(AdminProcessStepRequestModel model);
        Task<ApiResponse<AdminProcessStepResponseModel>> UpdateAdminProcessStep(UpdateAdminProcessStepModel model);
        Task<ApiResponse<IEnumerable<AdminProcessStepResponseModel>>> GetAllAdminProcessSteps();
        Task<ApiResponse<AdminProcessStepResponseModel>> GetAdminProcessStepById(Guid Id);
        Task<ApiResponse<DeleteAdminProcessStepResponseModel>> DeleteAdminProcessStep(Guid Id);
        Task<ApiResponse<CompanyResponseModel>> AddCompany(CompanyRequestModel model);
        Task<ApiResponse<IEnumerable<CompanyResponseModel>>> GetAllComapnies();
        Task<ApiResponse<CompanyResponseModel>> GetCompanyById(Guid id);
        Task<ApiResponse<CompanyResponseModel>> DeleteCompany(Guid id);

    }
}
