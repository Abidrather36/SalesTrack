using SalesTrack.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Entities
{
    public class LeadSource:BaseModel
    {
        public string SourceName { get; set; }
    }
}
