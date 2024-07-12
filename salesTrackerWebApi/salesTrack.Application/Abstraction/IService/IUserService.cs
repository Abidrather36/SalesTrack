using SalesTrack.Application.Common;
using SalesTrack.Domain.Entities.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesTrack.Application.Abstraction.IService
{
    public interface IUserService
    {
        Task<ApiResponse<UserResponse>> Add(UserRequest model);
    }
}
