using Microsoft.EntityFrameworkCore;
using salesTrack.Domain.Entities;
using SalesTrack.Domain.Entities;

namespace SalesTrack.Persistence.Data
{
    public class SalesTrackDBContext:DbContext
    {
        public SalesTrackDBContext(DbContextOptions<SalesTrackDBContext> options):base(options)
        {
                
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Enquiry> Enquires { get; set; }

    }
}
