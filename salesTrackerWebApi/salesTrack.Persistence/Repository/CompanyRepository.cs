using Microsoft.EntityFrameworkCore;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Response;
using SalesTrack.Persistence.Data;
using SalesTrack.Persistence.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<Project> GetProjectById(Guid Id)
        {
          return  await context.Project.FindAsync(Id);
        }

    

        public async Task<IEnumerable<TimeSheetResponseModel>> GetTimeSheet(DateTimeOffset? startDate, DateTimeOffset? endDate, Guid id)
        {

            var timeSheets = await leadRepository.GetAllTimeSheetsByUser(id);
            var filteredUserTimeSheets = timeSheets.Where(ts => ts.Date >= startDate && ts.Date <= endDate).
                 Select(ts => new TimeSheetResponseModel
                 {
                     Id = ts.Id,
                     Date = ts.Date,
                     TimeSheetStepName = ts.TimeSheetStepName,
                     HoursSpent = ts.HoursSpent,
                     Comment = ts.Comment,
                     DateString = ts.Date.ToString("dd/MM/yyyy")
                 });
            return filteredUserTimeSheets;

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
    }
}
