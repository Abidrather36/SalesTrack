using System.ComponentModel.DataAnnotations;

namespace salesTrack.Domain.Models.Request
{
    public class LeadCommentsRequestModel
    {
        [Required]
        public string? Text { get; set; }
        [Required]
        public Guid LeadId { get; set; }
    }
}
