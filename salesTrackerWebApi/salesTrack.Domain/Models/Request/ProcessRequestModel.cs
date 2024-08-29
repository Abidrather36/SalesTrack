using System.ComponentModel.DataAnnotations;

namespace salesTrack.Domain.Models.Request
{
    public class ProcessRequestModel
    {
        [Required]
        public Guid LeadId { get; set; }
        [Required]
        public string? StepName { get; set; }
        [Required]
        public string? StepDescription { get; set; }
    }
}
