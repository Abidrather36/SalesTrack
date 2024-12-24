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
        public LeadRepository(SalesTrackDBContext context, IContextService contextService) : base(context)
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
        public async Task<int> AddLeadsAsync(List<Lead> models)
        {
            await context.Leads.AddRangeAsync(models);
            return await context.SaveChangesAsync();
        }

        public async Task<Lead> AddLead(LeadRequestModel model, Guid userId,Guid id)
        {
            try
            {
                var existingLead = await context.Leads
                    .Include(l => l.User)
                    .FirstOrDefaultAsync(l => l.CompanyId == model.CompanyId && l.User.Email == model.Email);

                if (existingLead != null)
                {
                    throw new Exception("A lead with this email already exists for this company.");
                }

                var newLead = new Lead
                {
                    Id = userId,
                    LeadSourceId = model.LeadSourceId != Guid.Empty ? model.LeadSourceId : throw new ArgumentException("lead SouceId is Required"),
                    CompanyId = model.CompanyId,
                    Comment = model.Comment,
                    AssignTo = model.AssignTo,
                    CreatedBy = id,
                    CreatedDate = DateTime.UtcNow,
                    ModifiedDate = DateTime.UtcNow,
                    IsActive = true,
                    LeadRank = model.LeadRank,
                    LeadCategoryId = model.LeadCategoryId,
                    LeadCompanyId = model.LeadCompanyId,
                    UserId=id
                };

                await context.Leads.AddAsync(newLead);
                await context.SaveChangesAsync();
                var lead = await GetByIdAsync(newLead.Id);
                return lead;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error adding lead: {ex.Message}");
            }
        }

        public async Task<int> AddLeadCategory(LeadCategory model)
        {
            await context.LeadCategories.AddAsync(model);
            return await context.SaveChangesAsync();
        }

        public async Task<int> AddLeadCompanyName(LeadCompany model)
        {
            await context.LeadCompanies.AddAsync(model);
            return await context.SaveChangesAsync();
        }

        public async Task<int> AddLeadProcessStep(LeadProcessSteps model)
        {
            await context.LeadProcessSteps.AddAsync(model);
            return await context.SaveChangesAsync();


        }

        public async Task<bool> AddProcessStep(FollowUpReq model)
        {
            var loggedInUser = contextService.UserId();
            var comment = new LeadComments
            {
                LeadProcessStepId = model.LeadId,
                Id = Guid.NewGuid(),
                Text = model.Comment,
                LeadId = model.LeadId,
                CreatedDate = DateTime.Now,
                CreatedBy = loggedInUser
            };
            var folowUp = new FollowUpDate
            {

                LeadProcessStepId = model.LeadId,
                Time = model.Time,
                Date = model.Date,
                LeadId = model.LeadId,
                CreatedDate = DateTime.Now,
                CreatedBy = loggedInUser,
                LeadCompanyId = model.LeadCompanyId

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
            return await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<LeadCompanyNameResponse>> GetAllLeadCompanyNames(Guid companyId)
        {
            var res = await context.LeadCompanies.Where(lc => lc.CompanyId == companyId).Select(x => new LeadCompanyNameResponse
            {
                Id = x.Id,
                LeadCompanyName = x.LeadCompanyName,
                Description = x.Description,
                IsActive = x.IsActive,
            }).ToListAsync();
            return res;
        }

        public async Task<IEnumerable<LeadResponseModel>> GetAllLeadsAsync(Guid companyId)
        {
            var Leads = await context.Leads.Where(l => l.CompanyId == companyId).Select(lead => new LeadResponseModel
            {
                Id = lead.Id,
                LeadName = lead.User!.Name,
                LeadCompanyName = lead.LeadCompany.LeadCompanyName,
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
                CompanyId = lead.CompanyId,
                LeadCategoryName = lead.LeadCategory.LeadCategoryName,
                LeadRank = lead.LeadRank,
                CreatedDate = lead.CreatedDate.HasValue
                ? lead.CreatedDate.Value.ToString("dd-MM-yyyy")
                : null
            }).ToListAsync();

            return Leads;
        }

        public async Task<IEnumerable<LeadResponseModel>> GetAllLeadsByCompanyId(Guid id, Guid assignTo)
        {
            var leads = await context.Leads.Where(lead => lead.CompanyId == id && lead.AssignTo == assignTo).Select(lead => new LeadResponseModel
            {
                Id = lead.Id,
                LeadName = lead!.User!.Name,
                LeadCompanyName = lead.LeadCompany.LeadCompanyName,
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
                LeadRank = lead.LeadRank,
                LeadCategoryName = lead.LeadCategory.LeadCategoryName,
                CreatedDate = lead.CreatedDate.HasValue
                ? lead.CreatedDate.Value.ToString("dd-MM-yyyy")
                : null
            }).ToListAsync();
            return leads;
        }

        public async Task<IEnumerable<TimeSheetResponseModel>> GetAllTimeSheetsByUser(Guid userId)
        {
            var res = await context.TimeSheets.Where(x => x.UserId == userId).Select(x => new TimeSheetResponseModel
            {
                Id = x.Id,
                TimeSheetStepName = x.TimeSheetStepName,
                HoursSpent = x.HoursSpent,
                Comment = x.Comment,
                Date = x.Date,
                DateString = x.Date.ToString("dd/MM/yyyy"),
                IsActive = x.IsActive,
                IsApproved = x.IsApproved

            }).OrderBy(x => x.Date).ToListAsync();
            return res;
        }

        public async Task<LeadResponseModel> GetLeadById(Guid leadId)
        {

            var detailsModel = await context.Leads.Where(x => x.Id == leadId).Select(x => new LeadResponseModel
            {
                Id = x.Id,
                LeadName = x.User!.Name,
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

        public async Task<IEnumerable<LeadCategoryResponse>> GetLeadCategories(Guid companyId)
        {

            var leadCategoryResponses = await context.LeadCategories.Where(l => l.CompanyId == companyId).Select(category => new LeadCategoryResponse
            {
                Id = category.Id,
                LeadCategoryName = category.LeadCategoryName,
                LeadCategoryDescription = category.LeadCategoryDescription,
                IsActive = category.IsActive,

            }).ToListAsync();

            return leadCategoryResponses;
        }

        public async Task<LeadCategory?> GetLeadCategoryById(Guid? id)
        {
            return await context.LeadCategories.FindAsync(id);
        }

        public async Task<LeadCompany?> GetLeadCompanyNameById(Guid? id)
        {
            return await context.LeadCompanies.FindAsync(id);
        }

        public async Task<LeadProcessSteps?> GetLeadProcessStepById(Guid id)
        {
            var procStep = await context.LeadProcessSteps.FindAsync(id);
            return procStep;
        }

        public async Task<TimeSheet?> GetTimeSheetById(Guid id)
        {
            return await context.TimeSheets.FindAsync(id);
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
                       .Include(l => l.LeadCompany)
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
                PhoneNumber = ps.Lead?.User?.PhoneNumber ?? "No phone number",
                LeadCompanyName = ps.Lead?.LeadCompany?.LeadCompanyName ?? "No Company Name"
            });

            return results;
        }


        /*    public async Task<IEnumerable<LeadFollowUpHistoryResponse>> TodaysFollowUpdate(TodaysFollowUpdateRequest model, Guid id,Guid userId)
            {
                var followUpsForToday = await context.Leads.Where(l => l.CompanyId == id && l.User!.Id==userId)
                    .Include(u => u.User)
                    .Include(l => l.ProcessSteps!)
                        .ThenInclude(ps => ps.LeadFollowUpDate)
                    .Include(l => l.ProcessSteps!)
                        .ThenInclude(ps => ps.LeadComment)
                    .Include(l => l.ProcessSteps!)
                        .ThenInclude(ps => ps.ProcessStepAdmin)
                     .Include(l => l.LeadCompany)
                    .Where(l => l.ProcessSteps != null
                                 && l.ProcessSteps.Any(ps => ps.LeadFollowUpDate != null
                                                              && ps.LeadFollowUpDate.Any(fd => fd.Date.Date == model.Date.Date)))
                    .SelectMany(l => l.ProcessSteps
                        .Where(ps => ps.LeadFollowUpDate != null
                                     && ps.LeadFollowUpDate.Any(fd => fd.Date.Date == model.Date.Date))
                        .Select(ps => new LeadFollowUpHistoryResponse
                        {
                            LeadId = ps.LeadId,
                            ClientName = ps.Lead!.User!.Name ?? "N/A",
                            Email = ps.Lead.User.Email ?? "No Email",
                            PhoneNumber = ps.Lead.User.PhoneNumber ?? "No Phone Number",
                            LeadComments = ps.LeadComment!.FirstOrDefault()!.Text ?? "No Comment Here",
                            LeadProcessStep = ps.ProcessStepAdmin!.StepName ?? "No Step Name",
                            FollowUpDate = ps.LeadFollowUpDate!.FirstOrDefault()!.Date,
                            LeadCompanyName = ps.Lead!.LeadCompany!.LeadCompanyName ?? "No Lead Company Name ",

                        }))
                    .ToListAsync();

                return followUpsForToday;
            }*/

        public async Task<IEnumerable<LeadFollowUpHistoryResponse>> TodaysFollowUpdate(TodaysFollowUpdateRequest model, Guid id, Guid userId)
        {
            var followUpsForToday = await context.Leads
            .Where(l => l.CompanyId == id && l.UserId == userId)
                .Include(u => u.User)
                .Include(l => l.ProcessSteps!)
                    .ThenInclude(ps => ps.LeadFollowUpDate)
                .Include(l => l.ProcessSteps!)
                    .ThenInclude(ps => ps.LeadComment)
                .Include(l => l.ProcessSteps!)
                    .ThenInclude(ps => ps.ProcessStepAdmin)
                .Include(l => l.LeadCompany)
                .Where(l => l.ProcessSteps != null
                             && l.ProcessSteps.Any(ps => ps.LeadFollowUpDate != null
                                                          && ps.LeadFollowUpDate.Any(fd => fd.Date.Date == model.Date.Date)))
                .SelectMany(l => l.ProcessSteps
                    .Where(ps => ps.LeadFollowUpDate != null
                                 && ps.LeadFollowUpDate.Any(fd => fd.Date.Date == model.Date.Date))
                    .Select(ps => new LeadFollowUpHistoryResponse
                    {
                        LeadId = ps.LeadId,
                        ClientName = ps.Lead!.User!.Name ?? "N/A",
                        Email = ps.Lead.User.Email ?? "No Email",
                        PhoneNumber = ps.Lead.User.PhoneNumber ?? "No Phone Number",
                        LeadComments = ps.LeadComment!.FirstOrDefault()!.Text ?? "No Comment Here",
                        LeadProcessStep = ps.ProcessStepAdmin!.StepName ?? "No Step Name",
                        FollowUpDate = ps.LeadFollowUpDate!.FirstOrDefault()!.Date,
                        LeadCompanyName = ps.Lead!.LeadCompany!.LeadCompanyName ?? "No Lead Company Name",
                    }))
                .ToListAsync();

            return followUpsForToday;
        }


        public async Task<int> UpdateLeadCompany(LeadCompany model)
        {
            await Task.Run(() => context.LeadCompanies.Update(model));
            return await context.SaveChangesAsync();

        }

        public async Task<int> UpdateLeadCategory(LeadCategory model)
        {
            await Task.Run(() => context.LeadCategories.Update(model));
            return await context.SaveChangesAsync();
        }

        public async Task<int> UpdateLeadProcessStep(LeadProcessSteps model)
        {
            var processResponse = await Task.Run(() => context.LeadProcessSteps.Update(model));
            return await context.SaveChangesAsync();
        }

        public async Task<int> UpdateTimeSheet(TimeSheet model)
        {
            var timeSheetRes = await Task.Run(() => context.TimeSheets.Update(model));
            return await context.SaveChangesAsync();
        }

        public async Task<int> AddLeadCompanyNamesBulk(List<LeadCompany> models)
        {
            await context.LeadCompanies.AddRangeAsync(models);
            return await context.SaveChangesAsync();
        }
        public async Task<IEnumerable<LeadResponseModel>> GetLeadDetailsByIdsAsync(List<Guid> ids)
        {
            if (ids == null || !ids.Any())
                return Enumerable.Empty<LeadResponseModel>();

            return await context.Leads
                .Where(lead => ids.Contains(lead.Id))
                .Select(lead => new LeadResponseModel
                {
                    Id = lead.Id,
                    LeadName = lead.User!.Name,
                    Email = lead.User.Email,
                    PhoneNumber = lead.User.PhoneNumber,
                    Comment = lead.Comment,
                    FinalStatus = lead.FinalStatus,
                    UserRole = lead.User.UserRole,
                    LeadSourceId = lead.LeadSourceId,
                    LeadSourceName = lead.LeadSource!.LeadSourceName,
                    AssignToId = lead.AssignTo,
                    IsActive = lead.User.IsActive,
                    CompanyName = lead.Company!.CompanyName
                })
                .ToListAsync();
        }

    }
}
