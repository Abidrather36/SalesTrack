using Microsoft.EntityFrameworkCore;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Domain.Entities;
using SalesTrack.Persistence.Data;
using SalesTrack.Persistence.Repository;

namespace salesTrack.Persistence.Repository
{
    public class LeadSourceRepository:BaseRepository<LeadSource>,ILeadSourceRepository
    {
        private readonly SalesTrackDBContext context;

        public LeadSourceRepository(SalesTrackDBContext context):base(context)
        {
            this.context = context;
        }

        public Task<int> AddLeadSource(LeadSource model)
        {
            return default;
        }
    }
}
