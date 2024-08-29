using salesTrack.Domain.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Response
{
    public class AdminProcessStepResponseModel:AdminProcessStepRequestModel
    {
        public Guid Id { get; set; }
    }
}
