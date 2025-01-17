using Microsoft.EntityFrameworkCore;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Enums;
using SalesTrack.Persistence.Data;
using SalesTrack.Persistence.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Persistence.Repository
{
    public class FileRepository:BaseRepository<AppFiles>,IFileRepository
    {
        private readonly SalesTrackDBContext context;

        public FileRepository(SalesTrackDBContext context):base(context)
        {
            this.context = context;
        }

        public async Task<AppFiles?> GetFileByEntityIdAndModuleAsync(Guid entityId, AppModule module)
        {
           return await context.AppFiles.FirstOrDefaultAsync(f => f.EntityId == entityId && (byte)f.Module == (byte)module);
        }
    }
}
