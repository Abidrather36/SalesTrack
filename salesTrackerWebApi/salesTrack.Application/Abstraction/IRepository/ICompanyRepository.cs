using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Abstraction.IRepository;

namespace salesTrack.Application.Abstraction.IRepository
{
    public interface ICompanyRepository : IBaseRepository<Company>
    {
        Task<IEnumerable<CompanyResponseModel>> GetAllCompaniesAsync();
    }
}
