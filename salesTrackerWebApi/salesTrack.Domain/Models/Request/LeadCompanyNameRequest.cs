using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Request
{
    public class LeadCompanyNameRequest
    {
        [Required]
        public string? LeadCompanyName { get; set; }
        public string? Description { get; set; }
    }
}
