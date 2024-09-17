using SalesTrack.Domain.Shared;

namespace salesTrack.Domain.Entities
{
    public class LeadComments:BaseModel
    {
        public string? Text { get; set; }
        public Guid LeadId { get; set; }
        public Lead? Lead { get; set; }

    }
}
