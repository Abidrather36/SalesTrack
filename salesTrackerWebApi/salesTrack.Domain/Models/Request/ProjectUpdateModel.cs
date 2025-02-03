using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Request
{
    public class ProjectUpdateModel : ProjectRequestModel
    {
        public Guid Id { get; set; }

    }
}
