using SalesTrack.Domain.Shared;
using System.ComponentModel.DataAnnotations.Schema;

namespace salesTrack.Domain.Entities
{
    public class AdminProcessStep:BaseModel
    {
        public string? StepName { get; set; }

        [ForeignKey(nameof(CompanyId))]
        public Company? Company { get; set; }
        public Guid CompanyId { get; set; }


    }
}
