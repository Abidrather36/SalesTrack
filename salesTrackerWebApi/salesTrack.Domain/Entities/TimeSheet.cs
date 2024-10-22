using SalesTrack.Domain.Shared;
using System.ComponentModel.DataAnnotations.Schema;

namespace salesTrack.Domain.Entities
{
    public class TimeSheet:BaseModel
    {
        public DateTime Date { get; set; }
        public Guid? ProcessStep { get; set; }
        public int HoursSpent { get; set; }
        public string? Comment { get; set; }
        public Guid? SalesExecutiveId { get; set; }

        [ForeignKey(nameof(SalesExecutiveId))]
        public User? User { get; set; }
    }
}
