using salesTrack.Domain.Entities;
using SalesTrack.Domain.Shared;
using System.ComponentModel.DataAnnotations.Schema;

namespace salesTrack.Domain.Entities
{
    public class LeadProcessSteps:BaseModel
    {
        public string? StepDescription { get; set;}
        public Guid AdminProcessStepId { get; set; }

        [ForeignKey(nameof(AdminProcessStepId))]
        public AdminProcessStep? ProcessStepAdmin { get; set; }

        public Guid LeadId { get; set; }
        [ForeignKey(nameof(LeadId))]
        public Lead? Lead { get; set; }

        public ICollection<LeadComments>? LeadComment { get; set; }
        public ICollection<FollowUpDate>? LeadFollowUpDate { get; set; }
    }




}
