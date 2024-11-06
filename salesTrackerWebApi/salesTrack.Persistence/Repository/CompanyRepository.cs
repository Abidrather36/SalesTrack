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

        public CompanyRepository(SalesTrackDBContext context,ILeadRepository leadRepository) : base(context)
        {
            this.context = context;
            this.leadRepository = leadRepository;
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
                IsActive=company.IsActive

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

        public async Task<IEnumerable<TimeSheetResponseModel>> GetTimeSheet(DateTimeOffset? startDate, DateTimeOffset? endDate, Guid id)
        {
            
          var timeSheets=await leadRepository.GetAllTimeSheetsByUser(id);
            var filteredUserTimeSheets = timeSheets.Where(ts => ts.Date >= startDate && ts.Date <= endDate).
                 Select(ts => new TimeSheetResponseModel
                 {   Id=ts.Id,
                     Date=ts.Date,
                     ProcessStep = ts.ProcessStep,
                     HoursSpent = ts.HoursSpent,
                     Comment = ts.Comment,
                     DateString=ts.Date.ToString("dd/MM/yyyy")
                 });
            return filteredUserTimeSheets;
            
        }
    }
}
