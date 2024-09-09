using System.ComponentModel.DataAnnotations;

namespace salesTrack.Domain.Models.Request
{
    public class LeadSourceRequestModel
    {
        [Required]
        public string? LeadSourceName { get; set; }
        [Required]
        public string? Description { get; set; }

    }
}
