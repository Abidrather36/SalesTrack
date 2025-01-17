using salesTrack.Application.Abstraction.Iidentity;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Enums;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Abstraction.IRepository;
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
    public class ProfilePictureService : IProfilePictureService
    {
        private readonly IFileService fileService;
        private readonly IUserRepository userRepository;
        private readonly IStorageService storageService;
        private readonly IContextService contextService;
        private readonly IFileRepository fileRepository;

        public ProfilePictureService(IFileService fileService, IUserRepository userRepository, IStorageService storageService, IContextService contextService, IFileRepository fileRepository)
        {
            this.fileService = fileService;
            this.userRepository = userRepository;
            this.storageService = storageService;
            this.contextService = contextService;
            this.fileRepository = fileRepository;
        }

        public async Task<ApiResponse<AppFileResponse>> GetFilePath()
        {
            try
            {
                var appModule = AppModule.MasterUser;
                var userLoggedId = contextService.UserId();
                var appFile = await fileRepository.GetFileByEntityIdAndModuleAsync(userLoggedId, appModule);
                if (appFile == null)
                {
                    return ApiResponse<AppFileResponse>.ErrorResponse("File not found for the specified user.", HttpStatusCodes.NotFound);
                }

                var response = new AppFileResponse
                {
                    FilePath = appFile.FilePath,
                    EntityId = appFile.EntityId,

                  
                };

                return ApiResponse<AppFileResponse>.SuccessResponse(response, "File path retrieved successfully.", HttpStatusCodes.OK);
            }
            catch (Exception ex)
            {
                return ApiResponse<AppFileResponse>.ErrorResponse(
            ex.Message,
            HttpStatusCodes.InternalServerError
        );
            }
        }

        public async Task<ApiResponse<AppFileResponse>> UploadProfilePicture(UploadProfilePitcureRequest model)
        {
            if (model.File is null)
                return ApiResponse<AppFileResponse>.ErrorResponse("File is null");
            List<string> errorMesseges = new List<string>();
            try
            {
                var userId = contextService.UserId();
                var appMpodule = AppModule.MasterUser;
                var fileResponse = await fileService.UploadFileAsync(appMpodule, userId, model.File);

                if (fileResponse is not null)
                    return ApiResponse<AppFileResponse>.SuccessResponse(fileResponse, "Profile Uploaded Successfully", HttpStatusCodes.OK);
                return ApiResponse<AppFileResponse>.ErrorResponse("Could not update user profile picture. Please try again.", HttpStatusCodes.BadRequest);
            }
            catch (Exception ex)
            {
                return ApiResponse<AppFileResponse>.ErrorResponse(
                    ex.Message
                );
            }
        }
    }
}
