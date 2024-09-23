using SalesTrack.Domain.Entities;
using SalesTrack.Domain.Shared;
using System.ComponentModel.DataAnnotations.Schema;

namespace salesTrack.Domain.Entities
{
    public class Company:BaseModel
    {
        public string? CompanyName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }

        #region  navigation  

        [ForeignKey(nameof(Id))]
        public MasterUser? User { get; set; }

        public ICollection<User>? CompanyUser { get; set; }
        public ICollection<Lead>? Lead {  get; set; }

        #endregion
    }
}
