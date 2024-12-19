using SalesTrack.Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
