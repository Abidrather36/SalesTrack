using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Abstraction.IRepository;

namespace salesTrack.Application.Abstraction.IRepository
{
    public interface ILeadRepository:IBaseRepository<Lead>
    {
        Task<LeadResponseModel> GetLeadById(Guid leadId);
        Task<IEnumerable<LeadResponseModel>> GetAllLeadsAsync();
        Task<int> AddProcess(LeadProcessSteps model);
        Task<int> UpdateProcess(LeadProcessSteps model);
        Task<LeadProcessSteps> GetProcessStepById(Guid id);

    }
}
