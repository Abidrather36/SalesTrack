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

        public DbSet<MasterUser> MasterUsers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Company> Companies { get; set; }   
        public DbSet<Enquiry> Enquiries { get; set; }
        public DbSet<LeadProcessSteps> LeadProcessSteps { get; set; }
        public DbSet<Lead> Leads { get; set; }
        public DbSet<LeadComments> LeadComments { get; set; }
        public DbSet<AdminProcessStep> AdminProcessSteps { get; set; }  
        public DbSet<LeadSource> LeadSources { get; set; }
        public DbSet<FollowUpDate> FollowUpDates { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.SeedUsers();
        }
    }
}
