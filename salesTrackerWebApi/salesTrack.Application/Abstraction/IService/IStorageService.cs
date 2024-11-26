using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Application.Abstraction.IService
{
    public interface IStorageService
    {
        Task<string> UploadFileAsync(IFormFile file);
        Task<bool> UploadFilesAsync(IFormFileCollection files);
        Task<bool> DeleteFileAsync(string filePath);
        Task<bool> DeleteFilesAsync(List<string> filePaths);
    }
}
