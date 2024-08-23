using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Domain.Entities;
using SalesTrack.Persistence.Data;
using SalesTrack.Persistence.Repository;

namespace salesTrack.Persistence.Repository
{
    public class LeadRepository:BaseRepository<Lead>,ILeadRepository
    {
        public LeadRepository(SalesTrackDBContext context) : base(context)
        {
                
        }
    }
}
