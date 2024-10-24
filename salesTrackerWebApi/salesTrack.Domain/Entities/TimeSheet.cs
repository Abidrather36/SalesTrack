using SalesTrack.Domain.Shared;
using System.ComponentModel.DataAnnotations.Schema;

namespace salesTrack.Domain.Entities
{
    public class TimeSheet:BaseModel
    {
        public DateTime Date { get; set; }
        public Guid? ProcessStepName { get; set; }
        public int HoursSpent { get; set; }
        public string? Comment { get; set; }
        public Guid UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }
    }
}
