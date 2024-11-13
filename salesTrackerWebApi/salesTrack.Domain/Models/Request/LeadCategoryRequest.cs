using salesTrack.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace salesTrack.Domain.Models.Request
{
    public class LeadCategoryRequest
    {
        public string? LeadCategoryName { get; set; }
        public string? LeadCategoryDescription { get; set; }


    }
}
