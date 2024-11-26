using salesTrack.Domain.Enums;
using SalesTrack.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Entities
{
    public class AppFiles:BaseModel
    {
        public AppModule Module { get; set; }
        public string FilePath { get; set; } = null!;
        public Guid EntityId { get; set; }
    }
}
