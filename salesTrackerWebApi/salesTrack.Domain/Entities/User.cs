using salesTrack.Domain.Enums;
using SalesTrack.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesTrack.Domain.Entities
{
    public  class User:BaseModel
    {
        public string? Name { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? ContactNo { get; set; }
        public string? Password { get; set; }
        public int Salt { get; set; }
        public UserRole UserRole { get; set; }
        public int ResetCode { get; set; }
        public DateTimeOffset? ResetExpiry { get; set; }
        public bool IsPasswordTemporary { get; set; } = true;
    }
}
