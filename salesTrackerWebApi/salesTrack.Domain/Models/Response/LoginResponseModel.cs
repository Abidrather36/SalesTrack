using salesTrack.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Response
{
    public class LoginResponseModel
    {
            public string? FullName { get; set; }
            public UserRole UserRole { get; set; }
            public Guid? UserId { get; set; }
            public string? Token { get; set; }
           public string? Email { get; set; }
           public string? PhoneNumber { get; set; }
        public bool IsPasswordTemporary { get; set; }
            //public string? FilePath { get; set; }
        }
    }
