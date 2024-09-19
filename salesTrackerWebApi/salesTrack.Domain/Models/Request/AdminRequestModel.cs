using salesTrack.Domain.Enums;

namespace salesTrack.Domain.Models.Request
{
    public  class AdminRequestModel
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public UserRole UserRole { get; set; }
        public Guid ReportsTo { get; set; } 
    }
}
