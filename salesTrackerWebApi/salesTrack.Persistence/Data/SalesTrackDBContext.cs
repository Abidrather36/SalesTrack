using Microsoft.EntityFrameworkCore;
using salesTrack.Domain.Entities;
using salesTrack.Persistence.Data;
using SalesTrack.Domain.Entities;

namespace SalesTrack.Persistence.Data
{
    public class SalesTrackDBContext:DbContext
    {
        public SalesTrackDBContext(DbContextOptions<SalesTrackDBContext> options):base(options)
        {
                
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Enquiry> Enquiries { get; set; }
        public DbSet<ProcessSteps> ProcessSteps { get; set; }
        public DbSet<Lead> Leads { get; set; }
        public DbSet<LeadSource> LeadSources { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.SeedUsers();
        }
    }
}
