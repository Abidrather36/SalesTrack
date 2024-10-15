using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using salesTrack.Application.Abstraction.Iidentity;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
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
        private readonly string _connectionString;
        public LeadRepository(SalesTrackDBContext context, IConfiguration configuration,IContextService contextService) : base(context)
        {
            this.context = context;
            this.contextService = contextService;
            _connectionString = configuration.GetConnectionString("SalesTrackDbContext");
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

        /*  public async Task<IEnumerable<LeadFollowUpHistoryResponse>> ShowLeadHistory(Guid leadId)
          {
              var query = await (from ms in context.MasterUsers
                                 join l in context.Leads on ms.Id equals l.Id
                                 join lc in context.LeadComments on l.Id equals lc.LeadId into leadCommentsGroup
                                 from lc in leadCommentsGroup.DefaultIfEmpty()
                                 join lps in context.LeadProcessSteps on l.Id equals lps.LeadId into leadProcessStepsGroup
                                 from lps in leadProcessStepsGroup.DefaultIfEmpty()
                                 join fd in context.FollowUpDates on l.Id equals fd.LeadId into followUpDatesGroup
                                 from fd in followUpDatesGroup.DefaultIfEmpty()
                                 where l.Id == leadId
                                 select new LeadFollowUpHistoryResponse
                                 {
                                     ClientName = ms.Name,
                                     Email = ms.Email,
                                     PhoneNumber = ms.PhoneNumber,
                                     LeadProcessStep = lps.ProcessStepAdmin.StepName,
                                     LeadComments = lc.Text,
                                     FollowUpDate = fd.Date,
                                 }).ToListAsync();

              return query;


          }*/
        /*        public async Task<IEnumerable<LeadFollowUpHistoryResponse>> ShowLeadHistory(Guid leadId)
                {
                    var result = await (from lead in context.Leads
                                        join user in context.MasterUsers on lead.Id equals user.Lead!.Id
                                        join followUp in context.FollowUpDates on lead.Id equals followUp.LeadId
                                        join processStep in context.LeadProcessSteps on followUp.LeadProcessStepId equals processStep.Id into processSteps
                                        from processStep in processSteps.DefaultIfEmpty()
                                        join comment in context.LeadComments on followUp.LeadProcessStepId equals comment.LeadProcessStepId into comments
                                        from comment in comments.DefaultIfEmpty()
                                        where lead.Id == leadId
                                        select new LeadFollowUpHistoryResponse
                                        {
                                            ClientName = user.Name,
                                            LeadProcessStep = processStep.ProcessStepAdmin.StepName,
                                            PhoneNumber = user.PhoneNumber,
                                            Email = user.Email,
                                            LeadComments = comment.Text,
                                            FollowUpDate = followUp.Date
                                        }).ToListAsync();

                    return result;
                }*/

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

        public async Task<LeadFollowUpHistoryResponse> TodaysFollowUpdate(TodaysFollowUpdateRequest model)
        {
            var data =await context.Leads
                .Where(l => l.Id == model.LeadId)
                .Include(u => u.User)
                .Include(l => l.ProcessSteps!)
                    .ThenInclude(ps => ps.LeadFollowUpDate)
                .Include(l => l.ProcessSteps!)
                    .ThenInclude(ps => ps.LeadComment)
                .Include(l => l.ProcessSteps!)
                    .ThenInclude(ps => ps.ProcessStepAdmin)
                    .FirstOrDefaultAsync();
            if(data is null || data.ProcessSteps is null)
            {
                throw new InvalidOperationException("No lead data found or lead has no process steps.");
            }
            else
            {
                var followUpForToday = data.ProcessSteps
                    .Where(ps => ps.LeadFollowUpDate != null && ps.LeadFollowUpDate.Any(fd => fd.Date == model.Date.Date))
                    .Select(ps => new LeadFollowUpHistoryResponse
                    {
                        ClientName = ps.Lead!.User!.Name ?? "N/A",
                        Email = ps.Lead.User.Email ?? "No Email",
                        PhoneNumber = ps.Lead.User.PhoneNumber ?? "No Phone Number",
                        LeadComments = ps.LeadComment!.FirstOrDefault()!.Text ?? "No Commnet Here",
                        LeadProcessStep = ps.ProcessStepAdmin!.StepName ?? "No Step Name",
                        FollowUpDate = ps.LeadFollowUpDate!.FirstOrDefault()!.Date 
                    }).FirstOrDefault();

                if (followUpForToday == null)
                {
                    throw new InvalidOperationException("No follow-up found for the given date.");
                }
                return followUpForToday;

            }
        }

        

        public async Task<int> UpdateLeadProcessStep(LeadProcessSteps model)
        {
            var processResponse = await Task.Run(() => context.LeadProcessSteps.Update(model));
            return await context.SaveChangesAsync();
        }
    }
}
