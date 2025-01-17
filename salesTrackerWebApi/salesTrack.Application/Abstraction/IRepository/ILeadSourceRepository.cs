using salesTrack.Domain.Entities;
using SalesTrack.Application.Abstraction.IRepository;

namespace salesTrack.Application.Abstraction.IRepository
{
    public interface ILeadSourceRepository:IBaseRepository<LeadSource>
    {
        Task<int> AddLeadSource(LeadSource model);
    }
}
