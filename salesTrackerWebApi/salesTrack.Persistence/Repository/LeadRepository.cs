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

        public async Task<int> AddComment(LeadComments model)
        {
            await context.LeadComments.AddAsync(model);
            return await context.SaveChangesAsync();
        }

        public async Task<int> AddfollowUpdate(FollowUpDate model)
        {
          await  context.FollowUpDates.AddAsync(model);
          return  await context.SaveChangesAsync();
        }

        public async Task<int> AddLeadProcessStep(LeadProcessSteps model)
        {
           await context.LeadProcessSteps.AddAsync(model);
           return await context.SaveChangesAsync();
            
           
        }

        public async Task<IEnumerable<LeadResponseModel>> GetAllLeadsAsync()
        {
            var Leads = await context.Leads.Select(lead => new LeadResponseModel
            {
                Id = lead.Id,
                Name = lead.User!.Name,
                Email = lead.User!.Email,
                PhoneNumber = lead.User!.PhoneNumber,
                Comment = lead.Comment,
                FinalStatus = lead.FinalStatus,
                UserRole = lead.User.UserRole,
                LeadSourceId = lead.LeadSourceId,
                LeadSourceName = lead.LeadSource!.LeadSourceName,
                AssignToId = lead.AssignTo
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
                Comment=x.Comment,
                FinalStatus=x.FinalStatus,
                UserRole=x.User.UserRole,
                LeadSourceId=x.LeadSourceId,
                LeadSourceName=x.LeadSource!.LeadSourceName,
                AssignToId=x.AssignTo,
                IsActive=x.User.IsActive,

            }).FirstOrDefaultAsync();

            return detailsModel!;

        }

        public async Task<LeadProcessSteps?> GetLeadProcessStepById(Guid id)
        {
           var procStep= context.LeadProcessSteps.FindAsync(id);
            return await procStep;
        }

        public async Task<int> UpdateLeadProcessStep(LeadProcessSteps model)
        {
            var processResponse=  await Task.Run(()=>  context.LeadProcessSteps.Update(model));
            return await context.SaveChangesAsync();
        }
    }
}
