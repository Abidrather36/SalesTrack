using salesTrack.Domain.Models;
using SalesTrack.Application.Common;
using SalesTrack.Domain.Entities.Models.Request;

namespace SalesTrack.Application.Abstraction.IService
{
    public interface IUserService
    {
        Task<ApiResponse<UserResponse>> Add(UserRequest model);
    }
}
