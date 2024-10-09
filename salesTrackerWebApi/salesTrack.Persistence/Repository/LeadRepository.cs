using Microsoft.EntityFrameworkCore;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Request;
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
                AssignToId = lead.AssignTo,
                IsActive=lead.IsActive,
                CompanyName=lead.Company!.CompanyName,
                CompanyId=lead.CompanyId
            }).ToListAsync();

            return Leads;
        }

        public async Task<IEnumerable<LeadResponseModel>> GetAllLeadsByCompanyId(Guid id)
        {
           var leads=await context.Leads.Where(lead => lead.CompanyId == id).Select(lead => new LeadResponseModel
            {
                Id = lead.Id,
                Name=lead!.User!.Name,
                Email = lead.User!.Email,
                PhoneNumber = lead.User!.PhoneNumber,
                Comment = lead.Comment,
                FinalStatus = lead.FinalStatus,
                UserRole = lead.User.UserRole,
                LeadSourceId = lead.LeadSourceId,
                IsActive = lead.IsActive,
                CompanyName=lead.Company!.CompanyName,
                AssignToId=lead.AssignTo,
                LeadSourceName=lead.LeadSource!.LeadSourceName,
            }).ToListAsync();
            return leads;
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
                CompanyName=x.Company!.CompanyName

            }).FirstOrDefaultAsync();

            return detailsModel!;

        }

        public async Task<LeadProcessSteps?> GetLeadProcessStepById(Guid id)
        {
           var procStep= await context.LeadProcessSteps.FindAsync(id);
            return procStep;
        }

        public async Task<IEnumerable<LeadFollowUpHistoryResponse>> ShowLeadHistory(Guid leadId)
        {
            var query = await (from ms in context.MasterUsers
                               join l in context.Leads on ms.Id equals l.Id
                               join lc in context.LeadComments on l.Id equals lc.LeadId into leadCommentsGroup
                               from lc in leadCommentsGroup.DefaultIfEmpty()
                               join lps in context.LeadProcessSteps on l.Id equals lps.LeadId into leadProcessStepsGroup
                               from lps in leadProcessStepsGroup.DefaultIfEmpty()
                               join fd in context.FollowUpDates on l.Id equals fd.LeadId into followUpDatesGroup
                               from fd in followUpDatesGroup.DefaultIfEmpty()
                               where (ms.Id == leadId)
                               select new LeadFollowUpHistoryResponse
                               {
                                   ClientName = ms.Name,
                                   Email = ms.Email,
                                   PhoneNumber = ms.PhoneNumber,
                                   LeadProcessStep = lps.StepDescription,
                                   LeadComments = lc.Text,
                                   FollowUpDate = fd.Date,

                               }).ToListAsync();

            return query;
        }


        public async Task<int> UpdateLeadProcessStep(LeadProcessSteps model)
        {
            var processResponse=  await Task.Run(()=>  context.LeadProcessSteps.Update(model));
            return await context.SaveChangesAsync();
        }
    }
}
