using salesTrack.Domain.Enums;

namespace SalesTrack.Domain.Entities.Models.Request
{
  
    public class UserRequest
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public UserType UserType { get; set; }
        public Guid ReportsTo { get; set; }

    }
}
