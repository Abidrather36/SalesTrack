using System.ComponentModel.DataAnnotations;

namespace salesTrack.Domain.Models.Request
{
    public class LeadProcessRequestModel
    {
        [Required]
        public Guid LeadId { get; set; }
        [Required]
        public Guid AdminProcessStepId { get; set; } 
        [Required]
        public string? StepDescription { get; set; }
    }
}
