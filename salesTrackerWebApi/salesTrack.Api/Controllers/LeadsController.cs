﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Enums;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using System.Net;

namespace salesTrack.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles =nameof(UserRole.SalesExecutive))]
    public class LeadsController : ControllerBase
    {
        private readonly ILeadService leadService;

        public LeadsController(ILeadService leadService)
        {
            this.leadService = leadService;
        }

        [HttpPost("register")]

        public async Task<ApiResponse<LeadResponseModel>> AddLead(LeadRequestModel model)
        {
            try
            {
                return await leadService.AddLead(model);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("GetLeadById/{id:guid}")]

        public async Task<ApiResponse<LeadResponseModel>> GetLeadById(Guid id)
        {
            try
            {
                return await leadService.GetLeadById(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("Get-All-Leads")]

        public async Task<ApiResponse<IEnumerable<LeadResponseModel>>> GetAllLeads()
        {
            try
            {
                return await leadService.GetAllLeadsAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("Delete-Lead/{id:guid}")]
        public async Task<ApiResponse<LeadResponseModel>> DeleteLead(Guid id)
        {
            try
            {
                return await leadService.DeleteLead(id);
            }
            catch(Exception ex)
            {
                throw;
            }
        }
        [HttpPut("Update-Lead")]
        public async Task<ApiResponse<LeadResponseModel>> UpdateLead(LeadUpdateModel model)
        {
            try 
            {
                return await leadService.UpdateLead(model);
            }
            catch( Exception ex)
            {
                throw;
            }

        }
        
        
        [HttpPut("updateLeadProcessStep")]
        public async Task<ApiResponse<LeadProcessResponseModel>> UpdateLeadProcessStep(LeadProcessUpdateModel model)
        {
            try
            {
                return await leadService.UpdateLeadProcessSteps(model);
            }

            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPost("addLeadProcessStep")]
        public async Task<ApiResponse<LeadProcessResponseModel>> AddLeadProcessStep(LeadProcessRequestModel model)
        {
            try
            {
                return await leadService.AddLeadProcessStep(model);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        [HttpPost("addLeadComment")]
        public async Task<ApiResponse<LeadCommentsResponseModel>> AddLeadComment(LeadCommentsRequestModel model)
        {
            try
            {
                return await leadService.AddComment(model);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPost("addLeadFollowUpdate")]
        public async Task<ApiResponse<LeadFollowUpdateResponse>> AddLeadFollowUdpate( LeadFollowUpdateRequest model)
        {
            try
            {
                return await leadService.AddLeadFollowUpdate(model);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        
    }
}
