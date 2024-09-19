using salesTrack.Domain.Entities;
using salesTrack.Domain.Enums;
using SalesTrack.Domain.Shared;

namespace SalesTrack.Domain.Entities
{
    public  class User:BaseModel
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
        public Guid? ReportsTo { get; set; }
        public UserType UserType { get; set; }

        #region navigation
        public Lead? Lead { get; set; }

        public Company? Company { get; set; }

        #endregion
    }
}
