using salesTrack.Domain.Entities;
using salesTrack.Domain.Models;
using SalesTrack.Domain.Entities;

namespace SalesTrack.Application.Abstraction.IRepository
{
    public  interface IUserRepository:IBaseRepository<MasterUser>
    {
        Task<int> AddUser(User user);
        Task<IEnumerable<UserResponseModel>> GetAllUsersAsync();

    }
}
