using salesTrack.Domain.Enums;
using SalesTrack.Domain.Entities;
using SalesTrack.Domain.Shared;
using System.ComponentModel.DataAnnotations.Schema;

namespace salesTrack.Domain.Entities
{
    public class User:BaseModel
    {
        public UserType UserType { get; set; }
        public Guid? ReportsTo { get; set; }
        public string? FilePath { get; set; }
        public Guid CompanyId { get; set; }

        [ForeignKey(nameof(Id))]
        public MasterUser? MasterUser { get; set; }

        [ForeignKey(nameof(CompanyId))]
        public Company? Company { get; set; }

        public ICollection<TimeSheet>? TimeSheeet { get; set; }
        public ICollection<Lead>? Leads { get; set; }

    }
}
