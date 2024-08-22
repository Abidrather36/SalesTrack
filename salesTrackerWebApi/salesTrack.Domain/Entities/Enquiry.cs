using SalesTrack.Domain.Shared;

namespace salesTrack.Domain.Entities
{
    public class Enquiry:BaseModel
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
