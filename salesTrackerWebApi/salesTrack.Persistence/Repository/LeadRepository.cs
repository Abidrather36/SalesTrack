using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using salesTrack.Application.Abstraction.Iidentity;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using SalesTrack.Domain.Entities;
using SalesTrack.Persistence.Data;
using SalesTrack.Persistence.Repository;

namespace salesTrack.Persistence.Repository
{
    public class LeadRepository : BaseRepository<Lead>, ILeadRepository
    {
        private readonly SalesTrackDBContext context;
        private readonly IContextService contextService;
        private readonly IConfiguration configuration;
        public LeadRepository(SalesTrackDBContext context,IContextService contextService) : base(context)
        {
            this.context = context;
            this.contextService = contextService;
        }

        public async Task<int> AddComment(LeadComments model)
        {
            await context.LeadComments.AddAsync(model);
            return await context.SaveChangesAsync();
        }

        public async Task<int> AddfollowUpdate(FollowUpDate model)
        {
            await context.FollowUpDates.AddAsync(model);
            return await context.SaveChangesAsync();
        }

        public async Task<int> AddLeadProcessStep(LeadProcessSteps model)
        {
            await context.LeadProcessSteps.AddAsync(model);
            return await context.SaveChangesAsync();


        }

        public async Task<bool> AddProcessStep(FollowUpReq model)
        {
           var loggedInUser= contextService.UserId();
            var comment = new LeadComments
            {
                LeadProcessStepId = model.LeadId,
                Id = Guid.NewGuid(),
                Text = model.Comment,
                LeadId = model.LeadId,
                CreatedDate=DateTime.Now,
                CreatedBy=loggedInUser
            };
            var folowUp = new FollowUpDate
            {
                
                LeadProcessStepId = model.LeadId,
                Time = model.Time,
                Date = model.Date,
                LeadId = model.LeadId,
                CreatedDate = DateTime.Now,
                CreatedBy = loggedInUser


            };
            var leadProcessStep = new LeadProcessSteps
            {
                Id = Guid.NewGuid(),
                AdminProcessStepId = model.AdminProcessStepId,
                LeadId = model.LeadId,
                CreatedBy = loggedInUser

            };
            leadProcessStep.LeadComment = new List<LeadComments>();
            leadProcessStep.LeadFollowUpDate = new List<FollowUpDate>();
            leadProcessStep.LeadComment.Add(comment);
            leadProcessStep.LeadFollowUpDate.Add(folowUp);

            context.LeadProcessSteps.Add(leadProcessStep);
            await context.SaveChangesAsync();
            return true;
        }

       

        public async Task<int> AddTimeSheet(TimeSheet model)
        {
            await context.TimeSheets.AddAsync(model);
            return  await context.SaveChangesAsync();
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
                IsActive = lead.IsActive,
                CompanyName = lead.Company!.CompanyName,
                CompanyId = lead.CompanyId
            }).ToListAsync();

            return Leads;
        }

        public async Task<IEnumerable<LeadResponseModel>> GetAllLeadsByCompanyId(Guid id)
        {
            var leads = await context.Leads.Where(lead => lead.CompanyId == id).Select(lead => new LeadResponseModel
            {
                Id = lead.Id,
                Name = lead!.User!.Name,
                Email = lead.User!.Email,
                PhoneNumber = lead.User!.PhoneNumber,
                Comment = lead.Comment,
                FinalStatus = lead.FinalStatus,
                UserRole = lead.User.UserRole,
                LeadSourceId = lead.LeadSourceId,
                IsActive = lead.IsActive,
                CompanyName = lead.Company!.CompanyName,
                AssignToId = lead.AssignTo,
                LeadSourceName = lead.LeadSource!.LeadSourceName,
            }).ToListAsync();
            return leads;
        }

        public async Task<LeadResponseModel> GetLeadById(Guid leadId)
        {

            var detailsModel = await context.Leads.Where(x => x.Id == leadId).Select(x => new LeadResponseModel
            {
                Id = x.Id,
                Name = x.User!.Name,
                Email = x.User.Email,
                PhoneNumber = x.User.PhoneNumber,
                Comment = x.Comment,
                FinalStatus = x.FinalStatus,
                UserRole = x.User.UserRole,
                LeadSourceId = x.LeadSourceId,
                LeadSourceName = x.LeadSource!.LeadSourceName,
                AssignToId = x.AssignTo,
                IsActive = x.User.IsActive,
                CompanyName = x.Company!.CompanyName

            }).FirstOrDefaultAsync();

            return detailsModel!;

        }

        public async Task<LeadProcessSteps?> GetLeadProcessStepById(Guid id)
        {
            var procStep = await context.LeadProcessSteps.FindAsync(id);
            return procStep;
        }

       
        public async Task<IEnumerable<LeadFollowUpHistoryResponse>> ShowLeadHistory(Guid leadId)
        {
            var data = await context.Leads
                .Where(l => l.Id == leadId)
                .Include(u => u.User)
                .Include(l => l.ProcessSteps!)
                    .ThenInclude(lc => lc.LeadFollowUpDate)
                .Include(l => l.ProcessSteps!)
                    .ThenInclude(lc => lc.LeadComment)
                      .Include(l => l.ProcessSteps!) 
            .ThenInclude(lc => lc.ProcessStepAdmin)
                .FirstOrDefaultAsync();

            if (data == null || data.ProcessSteps == null)
            {
                throw new InvalidOperationException("No lead data found or lead has no process steps.");
            }

            var results = data.ProcessSteps.Select(ps => new LeadFollowUpHistoryResponse
            {
                ClientName = ps.Lead?.User?.Name ?? "N/A", 
                LeadComments = ps.LeadComment?.FirstOrDefault()?.Text ?? "No comments", 
                LeadProcessStep = ps.ProcessStepAdmin?.StepName ?? "No step name", 
                FollowUpDate = ps.LeadFollowUpDate?.FirstOrDefault()?.Date ?? DateTime.MinValue, 
                Email = ps.Lead?.User?.Email ?? "No email",
                PhoneNumber = ps.Lead?.User?.PhoneNumber ?? "No phone number"
            });

            return results;
        }

      
        public async Task<IEnumerable<LeadFollowUpHistoryResponse>> TodaysFollowUpdate(TodaysFollowUpdateRequest model)
        {
            var followUpsForToday = await context.Leads
                .Include(u => u.User)
                .Include(l => l.ProcessSteps!)
                    .ThenInclude(ps => ps.LeadFollowUpDate)
                .Include(l => l.ProcessSteps!)
                    .ThenInclude(ps => ps.LeadComment)
                .Include(l => l.ProcessSteps!)
                    .ThenInclude(ps => ps.ProcessStepAdmin)
                .Where(l => l.ProcessSteps != null
                             && l.ProcessSteps.Any(ps => ps.LeadFollowUpDate != null
                                                          && ps.LeadFollowUpDate.Any(fd => fd.Date.Date == model.Date.Date)))
                .SelectMany(l => l.ProcessSteps
                    .Where(ps => ps.LeadFollowUpDate != null
                                 && ps.LeadFollowUpDate.Any(fd => fd.Date.Date == model.Date.Date))
                    .Select(ps => new LeadFollowUpHistoryResponse
                    {
                        ClientName = ps.Lead!.User!.Name ?? "N/A",
                        Email = ps.Lead.User.Email ?? "No Email",
                        PhoneNumber = ps.Lead.User.PhoneNumber ?? "No Phone Number",
                        LeadComments = ps.LeadComment!.FirstOrDefault()!.Text ?? "No Comment Here",
                        LeadProcessStep = ps.ProcessStepAdmin!.StepName ?? "No Step Name",
                        FollowUpDate = ps.LeadFollowUpDate!.FirstOrDefault()!.Date
                    }))
                .ToListAsync(); 

            return followUpsForToday;
        }


        public async Task<int> UpdateLeadProcessStep(LeadProcessSteps model)
        {
            var processResponse = await Task.Run(() => context.LeadProcessSteps.Update(model));
            return await context.SaveChangesAsync();
        }
    }
}
