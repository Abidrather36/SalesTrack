namespace salesTrack.Domain.Models.Request
{
    public class EnquiryUpdateRequest
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }

        public bool IsActive { get; set; }
    }
}
