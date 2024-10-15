using SalesTrack.Domain.Shared;
using System.ComponentModel.DataAnnotations.Schema;

namespace salesTrack.Domain.Entities
{
    public class LeadComments:BaseModel
    {
        public string? Text { get; set; }
        public Guid LeadId { get; set; }
        public Lead? Lead { get; set; }

        public Guid? LeadProcessStepId { get; set; }
        [ForeignKey(nameof(LeadProcessStepId))]
        public LeadProcessSteps? LeadProcessStep { get; set; }
    }
}
