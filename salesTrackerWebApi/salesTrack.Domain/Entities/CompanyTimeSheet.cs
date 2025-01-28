using System.ComponentModel.DataAnnotations.Schema;

namespace salesTrack.Domain.Entities
{
    public class CompanyTimeSheet
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public Guid CompanyId { get; set; }

        [ForeignKey(nameof(CompanyId))]
        public Company? Company { get; set; }
    }
}
