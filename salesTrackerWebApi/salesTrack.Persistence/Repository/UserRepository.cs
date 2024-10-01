using Microsoft.EntityFrameworkCore;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Models;
using SalesTrack.Application.Abstraction.IRepository;
using SalesTrack.Domain.Entities;
using SalesTrack.Persistence.Data;
using SalesTrack.Persistence.Repository;

namespace salesTrack.Persistence.Repository
{
    public class UserRepository:BaseRepository<MasterUser>,IUserRepository
    {
        private readonly SalesTrackDBContext context;

        public UserRepository(SalesTrackDBContext context):base(context)
        {
            this.context = context;
        }

        public async Task<int> AddUser(User user)
        {
           await context.Users.AddAsync(user);
           return await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<UserResponseModel>> GetAllUsersByCompanyIdAsync(Guid companyId)
        {
            var userList = await context.Users.Where(user =>user.CompanyId==companyId).Select(user => new UserResponseModel
            {
                Id = user.Id,
                Name = user.MasterUser!.Name,
                Email = user.MasterUser.Email,
                PhoneNumber = user.MasterUser.PhoneNumber,
                ReportsToId = user.ReportsTo,
                IsActive = user.IsActive,
                UserRole = user.MasterUser.UserRole,
                UserType = user.UserType,
                CompanyId=user.CompanyId,
                CompanyName=user.Company!.CompanyName,
                IsPasswordTemporary = user.MasterUser.IsPasswordTemporary,

            }).ToListAsync();
            return userList;
        }

        public async Task<MasterUser> GetCompanyIdByUserId(Guid userId)
        {
           return await context.MasterUsers.FindAsync(userId);

        }

        public async Task<User> GetUserById(Guid id)
        {
            return await context.Users.FindAsync(id);
        }
    }
}
