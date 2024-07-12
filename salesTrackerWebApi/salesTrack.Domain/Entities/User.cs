using SalesTrack.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesTrack.Domain.Entities
{
    public  class User:BaseModel
    {
        public int UserName { get; set; }

        public string Email { get; set; }


        public string ContactNo { get; set; }
    }
}
