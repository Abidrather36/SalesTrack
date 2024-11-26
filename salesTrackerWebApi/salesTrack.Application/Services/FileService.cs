using Microsoft.AspNetCore.Http;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Enums;
using salesTrack.Domain.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Application.Services
{
    public class FileService : IFileService
    {
        private readonly IStorageService storageService;
        private readonly IFileRepository fileRepository;

        public FileService(IStorageService storageService,IFileRepository fileRepository)
        {
            this.storageService = storageService;
            this.fileRepository = fileRepository;
        }
        public Task<bool> DeleteFileAsync(string filePath)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteFilesAsync(List<string> filePaths)
        {
            throw new NotImplementedException();
        }

        public async Task<AppFileResponse> UploadFileAsync(AppModule appModule, Guid entityId, IFormFile file)
        {
          string filePath= await storageService.UploadFileAsync(file);
            AppFiles appFiles = new()
            {
                Module = appModule,
                EntityId = entityId,
                FilePath = filePath,
                IsActive=true,

            };
           var fileUploaded=await fileRepository.InsertAsync(appFiles);
            if(fileUploaded > 0)
            {
                AppFileResponse appFileResponse = new()
                {
                    Id = appFiles.Id,
                    EntityId = appFiles.EntityId,
                    Module = appFiles.Module,
                    FilePath=appFiles.FilePath
                   
                };

                return appFileResponse;
            }
            return default;

        }

        public Task<bool> UploadFilesAsync(AppModule appModule, Guid entityId, IFormFileCollection files)
        {
            throw new NotImplementedException();
        }
    }
}
