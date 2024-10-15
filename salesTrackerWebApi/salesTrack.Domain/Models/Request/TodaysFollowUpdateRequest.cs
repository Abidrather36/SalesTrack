using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Request
{
    public  class TodaysFollowUpdateRequest
    {
        public Guid LeadId { get; set; }
        public DateTime Date {  get; set; }
    }
}
