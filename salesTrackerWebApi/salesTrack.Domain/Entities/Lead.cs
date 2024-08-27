using salesTrack.Domain.Enums;
using SalesTrack.Domain.Entities;
using SalesTrack.Domain.Shared;
using System.ComponentModel.DataAnnotations.Schema;

namespace salesTrack.Domain.Entities
{
    public  class Lead:BaseModel
    {
        [ForeignKey(nameof(Id))]
        public User? User { get; set; }
        public string? Comments { get; set; }
        public Guid AssignTo { get; set; }
        public Guid LeadSourceId { get; set; }
        public FinalStatus FinalStatus { get; set; }


        [ForeignKey(nameof(LeadSourceId))]
        public LeadSource? LeadSource { get; set; }

/*
        [ForeignKey(nameof(AssignTo))]
        public User? AssignedToUser { get; set; }
*/


    }
}
