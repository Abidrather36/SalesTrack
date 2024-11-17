using SalesTrack.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Entities
{
    public class LeadCompany:BaseModel
    {
        public string? LeadCompanyName { get; set; }
        public string? Description { get; set; }

        public ICollection<Lead>? Leads { get; set; }
    }
}
