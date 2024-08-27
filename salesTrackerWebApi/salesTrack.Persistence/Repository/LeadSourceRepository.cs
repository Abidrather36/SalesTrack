using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Domain.Entities;
using SalesTrack.Persistence.Data;
using SalesTrack.Persistence.Repository;

namespace salesTrack.Persistence.Repository
{
    public class LeadSourceRepository:BaseRepository<LeadSource>,ILeadSourceRepository
    {
        public LeadSourceRepository(SalesTrackDBContext context):base(context)
        {
                
        }
    }
}
