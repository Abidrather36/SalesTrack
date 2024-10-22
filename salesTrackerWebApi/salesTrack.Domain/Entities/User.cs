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

        public Guid CompanyId { get; set; }
        public TimeSheet? TimeSheet { get; set; }

        [ForeignKey(nameof(Id))]
        public MasterUser? MasterUser { get; set; }

        [ForeignKey(nameof(CompanyId))]
        public Company? Company { get; set; }



    }
}
