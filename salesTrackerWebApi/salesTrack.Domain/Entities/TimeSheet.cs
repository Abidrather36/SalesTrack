using SalesTrack.Domain.Shared;
using System.ComponentModel.DataAnnotations.Schema;

namespace salesTrack.Domain.Entities
{
    public class TimeSheet:BaseModel
    {
        public DateTime Date { get; set; }
        public string? TimeSheetStepName { get; set; }
        public int HoursSpent { get; set; }
        public string? Comment { get; set; }
        public Guid UserId { get; set; }
        public Guid? CompanyId { get; set; }
        public Guid? ProjectId { get; set; }
        public bool IsApproved { get; set; } = false;
        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }
        [ForeignKey(nameof(CompanyId))]
        public Company? Company { get; set; }

        [ForeignKey(nameof(ProjectId))]
        public Project? Projects{get; set; }
    }
}
