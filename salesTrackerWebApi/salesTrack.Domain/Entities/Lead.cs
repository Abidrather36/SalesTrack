using salesTrack.Domain.Enums;
using SalesTrack.Domain.Shared;

namespace salesTrack.Domain.Entities
{
    public  class Lead:BaseModel
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public Guid LeadSouceId { get; set; }
        public string? Comments { get; set; }
        public string? AssignTo { get; set; }
        public FinalStatus FinalStatus { get; set; }


        public LeadSource? LeadSource { get; set; }

    }
}
