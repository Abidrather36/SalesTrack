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

        public CompanyRepository(SalesTrackDBContext context) : base(context)
        {
            this.context = context;
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
    }
}
