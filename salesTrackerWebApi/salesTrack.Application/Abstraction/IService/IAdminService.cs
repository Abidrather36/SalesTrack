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
    }
}
