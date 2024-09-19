using salesTrack.Domain.Entities;
using SalesTrack.Application.Abstraction.IRepository;
using SalesTrack.Domain.Entities;
using SalesTrack.Persistence.Data;
using SalesTrack.Persistence.Repository;

namespace salesTrack.Persistence.Repository
{
    public class UserRepository:BaseRepository<MasterUser>,IUserRepository
    {
        private readonly SalesTrackDBContext context;

        public UserRepository(SalesTrackDBContext context):base(context)
        {
            this.context = context;
        }

        public async Task<int> AddUser(User user)
        {
           await context.Users.AddAsync(user);
           return await context.SaveChangesAsync();
        }
    }
}
