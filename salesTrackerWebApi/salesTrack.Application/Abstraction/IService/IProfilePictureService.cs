using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Application.Abstraction.IService
{
    public  interface IProfilePictureService
    {
        Task<ApiResponse<AppFileResponse>> UploadProfilePicture(UploadProfilePitcureRequest model);
        Task<ApiResponse<AppFileResponse>> GetFilePath();
    }
}
