using Microsoft.AspNetCore.Http;
using salesTrack.Application.Abstraction.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Application.Services
{
    public class StorageService : IStorageService
    {
        private readonly string webRootPath;

        public StorageService(string webRootPath)
        {
            this.webRootPath = webRootPath;
        }
        public Task<bool> DeleteFileAsync(string filePath)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteFilesAsync(List<string> filePaths)
        {
            throw new NotImplementedException();
        }

        public async  Task<string> UploadFileAsync(IFormFile? file)
        {
            if (file == null)
            {
                return string.Empty;
            }
            var dirPath = GetPhysicalDirectoryPath();
            ValidateFile(file);
            string newFileName = string.Concat(Guid.NewGuid(), file.FileName);
            string fullPathWithFileName = string.Concat(dirPath, newFileName);
            using FileStream fs = new FileStream(fullPathWithFileName, FileMode.Create);
            await file.CopyToAsync(fs);
            return GetVirtualDirectoryPath() + newFileName;
        }

        public Task<bool> UploadFilesAsync(IFormFileCollection files)
        {
            throw new NotImplementedException();
        }
        private bool ValidateFile(IFormFile? file)
        {
            if (file == null)
            {
                return true;
            }
            if (file == null)
                throw new Exception("File cannot be null.");

            var extension = Path.GetExtension(file.FileName)?.ToLower();
            var size = file.Length;

            long maxSize = 10240;

            if (file.ContentType.Contains("image"))
                maxSize = 102400;
            else if (file.ContentType.Contains("video"))
                maxSize = 240240;
            else if (file.ContentType.Contains("application/pdf"))
                maxSize = 52000;

            if (size > maxSize)
                throw new Exception($"File size exceeded. Maximum allowed size: {maxSize / 1024} KB.");

            var allowedExtensions = new[] { ".png", ".jpeg", ".gif", ".jpg", ".mp4", ".pdf", ".heif" };
            if (!allowedExtensions.Contains(extension))
                throw new Exception("File format not supported.");

            var allowedContentTypes = new[] { "image", "video", "application/pdf" };
            if (!allowedContentTypes.Any(ct => file.ContentType.Contains(ct)))
                throw new Exception("File content type not supported.");

            return true;
        }
        private string GetPhysicalDirectoryPath()
        {
            var dirPath = Path.Combine(webRootPath, "Files");
            if (Directory.Exists(dirPath))
            {
                return dirPath;
            }
            Directory.CreateDirectory(dirPath);
            return dirPath;
        }
        private string GetVirtualDirectoryPath() => "/Files/";
    }
}
