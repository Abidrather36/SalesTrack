using System.ComponentModel.DataAnnotations;

namespace salesTrack.Domain.Models.Request
{
    public class AdminProcessStepRequestModel
    {
        [Required]
        public string? StepName { get; set; }
        
    }
}
