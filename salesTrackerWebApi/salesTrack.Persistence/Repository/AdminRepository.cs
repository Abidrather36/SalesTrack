using Microsoft.EntityFrameworkCore;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Response;
using SalesTrack.Domain.Entities;
using SalesTrack.Persistence.Data;
using SalesTrack.Persistence.Repository;
using System.Linq.Expressions;

namespace salesTrack.Persistence.Repository
{
    public class AdminRepository : BaseRepository<AdminProcessStep>, IAdminRepository
    {
        private readonly SalesTrackDBContext context;

        public AdminRepository(SalesTrackDBContext context):base(context)
        {
            this.context = context;
        }
        public Task<int> AddAdmin(User model)
        {
            throw new NotImplementedException();
        }
        public async Task<bool> IsExistsAsync(Expression<Func<Company, bool>> expression)
        {
            return await context.Companies.AnyAsync(expression);
        }

            public async Task<int> AddCompany(Company model)
        {
           await context.Companies.AddAsync(model);
            return await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<CompanyResponseModel>> GetAllCompanies()
        {
            var companies =context.Companies.Select(x => new CompanyResponseModel
            {
                Id = x.Id,
                CompanyName = x.CompanyName,
                Email = x.Email,
                PhoneNumber = x.PhoneNumber,

            }).ToList();
            return companies;
        }

        public async Task<Company> GetCompanyById(Guid id)
        {
           return await context.Companies.FindAsync(id);
        }

        public async Task<int> UpdateCompany(Company model)
        {
           await Task.Run(()=> context.Companies.Update(model));
            return await context.SaveChangesAsync();
        }

      
    }
}
