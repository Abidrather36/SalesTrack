using salesTrack.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Response
{
    public class AppFileResponse
    {
        public Guid Id { get; set; }
        public string FilePath { get; set; } = string.Empty;
        public Guid EntityId { get; set; }
        public AppModule Module { get; set; }
    }
}
