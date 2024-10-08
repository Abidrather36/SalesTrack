using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Request
{
    public class LeadFollowUpHistoryResponse
    {
        public string? ClientName { get; set; }
        public string? LeadProcessStep { get; set;  }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? LeadComments { get; set; }
        public DateTime? FollowUpDate { get; set; }
    }
}
