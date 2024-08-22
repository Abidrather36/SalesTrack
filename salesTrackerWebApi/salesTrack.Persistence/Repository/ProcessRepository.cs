using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Domain.Entities;
using SalesTrack.Persistence.Data;
using SalesTrack.Persistence.Repository;

namespace salesTrack.Persistence.Repository
{
    public class ProcessRepository:BaseRepository<ProcessSteps>,IProcessRepository
    {
        public ProcessRepository(SalesTrackDBContext context):base(context)
        {
            
        }
    }
}
