using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models
{
    public  class UserResponseModel
    {
        public Guid  Id { get; set; }

        public string? UserName { get; set; }
    }
}
