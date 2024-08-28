using Microsoft.EntityFrameworkCore;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Response;
using SalesTrack.Domain.Entities;
using SalesTrack.Persistence.Data;
using SalesTrack.Persistence.Repository;

namespace salesTrack.Persistence.Repository
{
    public class LeadRepository:BaseRepository<Lead>,ILeadRepository
    {
        private readonly SalesTrackDBContext context;

        public LeadRepository(SalesTrackDBContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<LeadResponseModel>> GetAllLeadsAsync()
        {
            var Leads = await context.Leads.Select(x => new LeadResponseModel
            {
                Id = x.Id,
                Name = x.User!.Name,
                Email = x.User!.Email,
                PhoneNumber = x.User!.PhoneNumber,
                Comments = x.Comments,
                FinalStatus = x.FinalStatus,
                UserRole = x.User.UserRole,
                LeadSourceId = x.LeadSourceId,
                LeadSourceName = x.LeadSource!.LeadSourceName,
                AssignToId = x.AssignTo
            }).ToListAsync();

            return Leads;
        }
       

        public async  Task<LeadResponseModel> GetLeadById(Guid leadId)
        {
           var detailsModel =await context.Leads.Where(x => x.Id == leadId).Select(x => new LeadResponseModel
            {
                Id = x.Id,
                Name=x.User!.Name,
                Email=x.User.Email,
                PhoneNumber=x.User.PhoneNumber,
                Comments=x.Comments,
                FinalStatus=x.FinalStatus,
                UserRole=x.User.UserRole,
                LeadSourceId=x.LeadSourceId,
                LeadSourceName=x.LeadSource!.LeadSourceName,
                AssignToId=x.AssignTo,
                IsActive=x.User.IsActive,
              
                
                
                
                

            }).FirstOrDefaultAsync();

            return detailsModel!;

        }
    }
}
