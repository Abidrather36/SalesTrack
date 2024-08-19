using salesTrack.Application.Abstraction.IRepository;
using SalesTrack.Domain.Entities;
using SalesTrack.Persistence.Data;
using SalesTrack.Persistence.Repository;

namespace salesTrack.Persistence.Repository
{
    public  class AuthRepository:BaseRepository<User>,IAuthRepository
    {
        public AuthRepository(SalesTrackDBContext context):base(context)
        {
            
        }
    }
}
