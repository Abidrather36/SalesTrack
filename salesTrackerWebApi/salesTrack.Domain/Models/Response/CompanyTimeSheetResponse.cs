using salesTrack.Domain.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Response
{
    public class CompanyTimeSheetResponse:CompanyTimeSheetRequest
    {
        public Guid? Id { get; set; }
        public Guid? CompanyId { get; set; }
        public bool IsActive { get; set; }
        public bool IsApproved { get; set; }
    }
}
