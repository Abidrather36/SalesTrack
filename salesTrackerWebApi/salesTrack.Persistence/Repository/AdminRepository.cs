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
        public Task<int> AddAdmin(MasterUser model)
        {
            throw new NotImplementedException();
        }
  
     

      
    }
}
