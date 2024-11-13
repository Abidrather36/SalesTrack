using SalesTrack.Domain.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Entities
{
    public class LeadCategory:BaseModel
    {
        public string? LeadCategoryName { get; set; }
        public string? LeadCategoryDescription { get; set; }

        #region navigation
       public ICollection<Lead>? Leads { get; set; } 
        #endregion
    }
}
