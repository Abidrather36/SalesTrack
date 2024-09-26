using salesTrack.Domain.Models;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using SalesTrack.Domain.Entities.Models.Request;

namespace salesTrack.Application.Abstraction.IService
{
    public interface IAdminService
    {
        Task<ApiResponse<UserResponseModel>> AddUser(UserRequestModel model);
        Task<ApiResponse<IEnumerable<UserResponseModel>>> GetAllUsersByCompanyId();
        Task<ApiResponse<UserResponseModel>> GetUserById(Guid id);
        Task<ApiResponse<AdminProcessStepResponseModel>> AddAdminProcessStep(AdminProcessStepRequestModel model);
        Task<ApiResponse<AdminProcessStepResponseModel>> UpdateAdminProcessStep(UpdateAdminProcessStepModel model);
        Task<ApiResponse<IEnumerable<AdminProcessStepResponseModel>>> GetAllAdminProcessSteps();
        Task<ApiResponse<AdminProcessStepResponseModel>> GetAdminProcessStepById(Guid Id);
        Task<ApiResponse<DeleteAdminProcessStepResponseModel>> DeleteAdminProcessStep(Guid Id);
   

    }
}
