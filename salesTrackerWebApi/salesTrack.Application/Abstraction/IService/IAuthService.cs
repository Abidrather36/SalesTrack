﻿using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;

using SalesTrack.Application.Common;

namespace salesTrack.Application.Abstraction.IService
{
    public interface IAuthService
    {
        Task<ApiResponse<LoginResponseModel>> Login(LoginRequestModel model);
    }
}