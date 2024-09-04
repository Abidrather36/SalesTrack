using salesTrack.Domain.Entities;
using SalesTrack.Application.Abstraction.IRepository;
using SalesTrack.Domain.Entities;

namespace salesTrack.Application.Abstraction.IRepository
{
    public interface IAdminRepository:IBaseRepository<AdminProcessStep>
    {
        Task<int> AddAdmin(User model);
    }
}
