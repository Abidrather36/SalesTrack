﻿using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Abstraction.IRepository;

namespace salesTrack.Application.Abstraction.IRepository
{
    public interface ILeadRepository:IBaseRepository<Lead>
    {
        Task<LeadResponseModel> GetLeadById(Guid leadId);
        Task<IEnumerable<LeadResponseModel>> GetAllLeadsAsync();

    }
}
