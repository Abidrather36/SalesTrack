using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Response
{
    public class UploadProfilePictureResponse
    {
        public Guid UserId { get; set; }
        public string? FilePath { get; set; }
    }
}
