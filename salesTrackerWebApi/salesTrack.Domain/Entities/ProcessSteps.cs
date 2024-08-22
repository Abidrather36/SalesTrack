using SalesTrack.Domain.Shared;

namespace salesTrack.Domain.Entities
{
    public class ProcessSteps:BaseModel
    {
        public string? StepName { get; set; }
        public string? StepDescription { get; set;}
    }
}
