using salesTrack.Domain.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Response
{
    public class TimeSheetResponseModel:TimeSheetRequestModel
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? DateString { get; set; }
        public bool? IsActive { get; set; }
        public bool IsApproved { get; set; }
        public string? ProjectName { get; set; }

    }
}
