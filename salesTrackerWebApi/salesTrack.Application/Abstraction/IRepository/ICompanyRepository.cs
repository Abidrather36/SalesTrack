using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Abstraction.IRepository;

namespace salesTrack.Application.Abstraction.IRepository
{
    public interface ICompanyRepository : IBaseRepository<Company>
    {
        Task<IEnumerable<CompanyResponseModel>> GetAllCompaniesAsync();
        Task<CompanyResponseModel> GetCompanyByIdAsync(Guid companyId);
        Task<IEnumerable<TimeSheetResponseModel>> GetTimeSheet(DateTimeOffset? startDate,DateTimeOffset? endDate,Guid? companyId,Guid? userId);
        Task<IEnumerable<AdminProcessStepResponseModel>> GetAllAdminProcessStepsByCompanyId(Guid id);
        Task<int> AddTimeSheet(CompanyTimeSheet model);
        Task<IEnumerable<CompanyTimeSheetResponse>> GetTimeSheetByCompany(Guid id);
        Task<CompanyTimeSheet> GetCompanyTimeSheetByNameAsync(string name,Guid companyId);
        Task<int> UpdateTimeSheetIsApproved(TimeSheet model);
        Task<int> AddProject(Project model);
        Task<Project> GetProjectByNameAsync(string projectName,Guid companyId);
        Task<Project> GetProjectByIdAsync(Guid companyId,Guid id);
        Task<bool> IsProjectNameExists(string projectName, Guid companyId);
        Task<IEnumerable<ProjectResponseModel>> GetProjectsByUser(Guid? companyId);

    }
}
