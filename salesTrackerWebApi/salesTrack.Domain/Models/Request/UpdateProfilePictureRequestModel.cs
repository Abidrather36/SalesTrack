using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Request
{
    public class UpdateProfilePictureRequestModel
    {
        public Guid UserId { get; set; }
        public IFormFile? FilePicture { get; set; }
    }
}
