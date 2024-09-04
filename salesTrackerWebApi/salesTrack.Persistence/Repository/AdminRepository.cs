using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Domain.Entities;
using SalesTrack.Domain.Entities;
using SalesTrack.Persistence.Data;
using SalesTrack.Persistence.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Persistence.Repository
{
    public class AdminRepository : BaseRepository<AdminProcessStep>, IAdminRepository
    {
        public AdminRepository(SalesTrackDBContext context):base(context)
        {
            
        }
        public Task<int> AddAdmin(User model)
        {
            throw new NotImplementedException();
        }
    }
}
