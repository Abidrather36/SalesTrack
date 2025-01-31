using Microsoft.EntityFrameworkCore;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Response;
using SalesTrack.Persistence.Data;
using SalesTrack.Persistence.Repository;

namespace salesTrack.Persistence.Repository
{
    public class CompanyRepository : BaseRepository<Company>, ICompanyRepository
    {
        private readonly SalesTrackDBContext context;
        private readonly ILeadRepository leadRepository;

        public CompanyRepository(SalesTrackDBContext context, ILeadRepository leadRepository) : base(context)
        {
            this.context = context;
            this.leadRepository = leadRepository;
        }

        public async Task<int> AddTimeSheet(CompanyTimeSheet model)
        {
            await context.CompanyTimeSheetStep.AddAsync(model);
            return await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<AdminProcessStepResponseModel>> GetAllAdminProcessStepsByCompanyId(Guid id)
        {
            var res = await context.AdminProcessSteps.Where(x => x.CompanyId == id).Select(x => new AdminProcessStepResponseModel
            {
                Id = x.Id,
                StepName = x.StepName,

            }).ToListAsync();
            return res;
        }

        public async Task<IEnumerable<CompanyResponseModel>> GetAllCompaniesAsync()
        {
            var companies = context.Companies.Select(company => new CompanyResponseModel
            {
                Id = company.Id,
                CompanyName = company.CompanyName,
                AdminName = company.User!.Name,
                PhoneNumber = company.PhoneNumber,
                Email = company.Email,
                IsActive = company.IsActive

            }).ToListAsync();
            return await companies;
        }

        public async Task<CompanyResponseModel> GetCompanyByIdAsync(Guid companyId)
        {
            var compactCompany = await context.Companies.Where(company => company.Id == companyId).Select(company => new CompanyResponseModel
            {
                Id = company.Id,
                CompanyName = company.CompanyName,
                AdminName = company.User!.Name,
                PhoneNumber = company.PhoneNumber,
                Email = company.Email,
                IsActive = company.IsActive,
            }).FirstOrDefaultAsync();
            return compactCompany!;


        }
        public async Task<CompanyTimeSheet> GetCompanyTimeSheetByNameAsync(string name, Guid companyId)
        {
            return await context.CompanyTimeSheetStep.Where(x => x.CompanyId == companyId).FirstOrDefaultAsync(ts => ts.Name == name);
        }

      



        /*  public async Task<IEnumerable<TimeSheetResponseModel>> GetTimeSheet(DateTimeOffset? startDate, DateTimeOffset? endDate, Guid? companyId)
          {
              var filteredUserTimeSheets = await context.TimeSheets
                  .Where(ts =>
                      ( ts.CompanyId == companyId) &&
                      (ts.Date >= startDate) &&
                      (ts.Date <= endDate))
                  .Select(ts => new TimeSheetResponseModel
                  {
                      Id = ts.Id,
                      Date = ts.Date,
                      TimeSheetStepName = ts.TimeSheetStepName,
                      HoursSpent = ts.HoursSpent,
                      Comment = ts.Comment,
                      DateString = ts.Date.ToString("dd/MM/yyyy"),
                      Name = ts.User != null ? ts.User.MasterUser.Name : "Unknown User"
                  })
                  .ToListAsync(); 

              return filteredUserTimeSheets;
          }
  */
        public async Task<IEnumerable<TimeSheetResponseModel>> GetTimeSheet(DateTimeOffset? startDate, DateTimeOffset? endDate, Guid? companyId, Guid? userId = null)
        {
            var res = await context.TimeSheets.Where(x => x.CompanyId == companyId &&  x.Date >=startDate  && x.Date <=endDate).OrderByDescending(x => x.CreatedDate).Select(x => new TimeSheetResponseModel
            {
                Id = x.Id,
                Name = x.User != null ? x.User.MasterUser.Name : "Unknow User",
                TimeSheetStepName = x.TimeSheetStepName,
                HoursSpent = x.HoursSpent,
                Comment = x.Comment,
                Date = x.Date,
                DateString = x.Date.ToString("dd/MM/yyyy"),
                IsActive = x.IsActive,
                IsApproved = x.IsApproved,
                ProjectId = x.ProjectId,
                ProjectName = x.Projects != null ? x.Projects.ProjectName : "No Project Found"
            }).ToListAsync();
            return res;
        }


        public async Task<IEnumerable<CompanyTimeSheetResponse>> GetTimeSheetByCompany(Guid id)
        {
            var res = await context.CompanyTimeSheetStep.Where(x => x.CompanyId == id).Select(x => new CompanyTimeSheetResponse
            {
                Id = x.Id,
                Name = x.Name,
                CompanyId = x.CompanyId,
            }).ToListAsync();
            return res;
        }
      

        public async Task<int> UpdateTimeSheetIsApproved(TimeSheet model)
        {
            await Task.Run(() => context.TimeSheets.Update(model));
            return await context.SaveChangesAsync();
        }
        public async Task<int> AddProject(Project model)
        {
            await context.Project.AddAsync(model);
            return await context.SaveChangesAsync();
        }
        public async Task<Project?> GetProjectById(Guid Id)
        {
            return await context.Project.FindAsync(Id);
        }
        public async Task<bool> IsProjectNameExists(string projectName, Guid companyId)
        {
            return await context.Project
                .AnyAsync(p => p.ProjectName == projectName && p.CompanyId == companyId);
        }

        public async Task<IEnumerable<ProjectResponseModel>> GetProjectsByUser(Guid? companyId)
        {
            var res = await context.Project.Where(x => x.CompanyId == companyId).OrderByDescending(x => x.CreatedDate).Select(x => new ProjectResponseModel
            {
                Id = x.Id,
                ProjectName = x.ProjectName,
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                IsActive = x.IsActive,
                CompanyId = x.CompanyId
            }).ToListAsync();
            return res;
        }

        public async Task<Project> GetProjectByIdAsync(Guid companyId,Guid id)
        {
            return await context.Project.Where(x=>x.CompanyId==companyId && x.Id==id).FirstOrDefaultAsync();
        }

        public async Task<Project> GetProjectByNameAsync(string projectName,Guid companyId)
        {
            return await context.Project.Where(x => x.CompanyId == companyId && x.ProjectName == projectName).FirstOrDefaultAsync();
        }
    }
}
