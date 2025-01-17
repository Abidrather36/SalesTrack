using salesTrack.Domain.Entities;
using salesTrack.Domain.Enums;
using SalesTrack.Application.Abstraction.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Application.Abstraction.IRepository
{
    public interface IFileRepository:IBaseRepository<AppFiles>
    {
        Task<AppFiles?> GetFileByEntityIdAndModuleAsync(Guid entityId, AppModule module);
    }
}
