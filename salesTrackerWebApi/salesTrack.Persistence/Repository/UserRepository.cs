using SalesTrack.Application.Abstraction.IRepository;
using SalesTrack.Domain.Entities;
using SalesTrack.Persistence.Data;
using SalesTrack.Persistence.Repository;

namespace salesTrack.Persistence.Repository
{
    public class UserRepository:BaseRepository<User>,IUserRepository
    {
        public UserRepository(SalesTrackDBContext context):base(context)
        {
                
        }
    }
}
