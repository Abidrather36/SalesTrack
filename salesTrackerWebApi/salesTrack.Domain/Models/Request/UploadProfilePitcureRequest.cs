using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Request
{
    public class UploadProfilePitcureRequest
    {
        public IFormFile? File { get; set; }
    }
}
