using salesTrack.Domain.Models.Request;

namespace salesTrack.Domain.Models.Response
{
    public class CompanyResponseModel 
    {
        public Guid Id { get; set; }
        public string? AdminName { get; set; }
        public string? CompanyName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }

    }
}
