using Microsoft.EntityFrameworkCore;

namespace SalesTrack.Persistence.Data
{
    public class SalesTrackDBContext:DbContext
    {
        public SalesTrackDBContext(DbContextOptions<SalesTrackDBContext> options):base(options)
        {
                
        }
    }
}
