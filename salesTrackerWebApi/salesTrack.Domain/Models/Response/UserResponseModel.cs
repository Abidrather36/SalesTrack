using salesTrack.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models
{
   public class UserResponseModel
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public bool IsPasswordTemporary { get; set; } = true;
        public Guid? ReportsTo { get; set; }
        public UserType UserType { get; set; }
        public UserRole UserRole { get; set; }
        public bool IsActive { get; set; }


    }
}
