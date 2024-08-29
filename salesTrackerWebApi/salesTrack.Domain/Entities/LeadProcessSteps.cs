using salesTrack.Domain.Entities;
using SalesTrack.Domain.Shared;
using System.ComponentModel.DataAnnotations.Schema;

namespace salesTrack.Domain.Entities
{
    public class LeadProcessSteps:BaseModel
    {
        public string? StepDescription { get; set;}
        public Guid ProcessStepId { get; set; }
        [ForeignKey(nameof(ProcessStepId))]
        public AdminProcessStep? ProcessStepAdmin { get; set; }

        public Guid LeadId { get; set; }
        [ForeignKey(nameof(LeadId))]
        public Lead? Lead { get; set; }
    }




}
