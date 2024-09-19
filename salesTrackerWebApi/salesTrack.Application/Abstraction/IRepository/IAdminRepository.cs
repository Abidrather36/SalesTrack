﻿using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Abstraction.IRepository;
using SalesTrack.Domain.Entities;
using System.Linq.Expressions;

namespace salesTrack.Application.Abstraction.IRepository
{
    public interface IAdminRepository:IBaseRepository<AdminProcessStep>
    {
        Task<int> AddAdmin(MasterUser model);

    }
}
