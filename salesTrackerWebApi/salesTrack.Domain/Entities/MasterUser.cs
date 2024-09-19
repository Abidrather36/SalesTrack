using salesTrack.Domain.Entities;
using salesTrack.Domain.Enums;
using SalesTrack.Domain.Shared;

namespace SalesTrack.Domain.Entities
{
    public  class MasterUser:BaseModel
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
        public string? Salt { get; set; }
        public UserRole UserRole { get; set; }
        public int ResetCode { get; set; }
        public DateTimeOffset? ResetExpiry { get; set; }
        public bool IsPasswordTemporary { get; set; } = true;

        #region navigation
        public Lead? Lead { get; set; }
        public Company? Company { get; set; }
        public User? User { get; set; }

        #endregion
    }
}
