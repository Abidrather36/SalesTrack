using SalesTrack.Domain.Shared;
using System.ComponentModel.DataAnnotations.Schema;

namespace salesTrack.Domain.Entities
{
    public class LeadCategory:BaseModel
    {
        public string? LeadCategoryName { get; set; }
        public string? LeadCategoryDescription { get; set; }
        public Guid CompanyId { get; set; }
        #region navigation
        [ForeignKey(nameof(CompanyId))]
        public Company? Company { get; set; }
        public ICollection<Lead>? Leads { get; set; } 

        #endregion
    }
}
