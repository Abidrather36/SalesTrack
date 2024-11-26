using Microsoft.AspNetCore.Http;
using salesTrack.Domain.Enums;
using salesTrack.Domain.Models.Response;

namespace salesTrack.Application.Abstraction.IService
{
    public interface IFileService
    {
        Task<AppFileResponse> UploadFileAsync(AppModule appModule,Guid entityId,IFormFile file);

        Task<bool> UploadFilesAsync(AppModule appModule, Guid entityId, IFormFileCollection files);
        Task<bool> DeleteFileAsync(string filePath);
        Task<bool> DeleteFilesAsync(List<string> filePaths);

    }
}
