using salesTrack.Application.Abstraction.Iidentity;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using SalesTrack.Application.Shared;

namespace salesTrack.Application.Services
{
    internal class ProcessService : IProcessService
    {
        private readonly IContextService contextService;

        public ProcessService(IProcessRepository processRepository,IContextService contextService )
        {
            ProcessRepository = processRepository;
            this.contextService = contextService;
        }

        public IProcessRepository ProcessRepository { get; }

        public async  Task<ApiResponse<ProcessResponseModel>> AddProcess(ProcessRequestModel model)
        {
            var adminId= contextService.UserId();
           
            if (adminId == Guid.Empty)
            {
                return ApiResponse<ProcessResponseModel>.ErrorResponse(ApiMessages.NotFound, HttpStatusCodes.BadRequest);
            }
                ProcessSteps processSteps = new()
            {
                Id=Guid.NewGuid(),
                StepName=model.StepName,
                StepDescription=model.StepDescription,
                IsActive=true,
                CreatedBy=adminId,
                CreatedDate=DateTime.Now,
                ModifiedDate=DateTime.Now,
                ModifiedBy=adminId,
                DeletedDate=DateTime.Now,
                DeletedBy=adminId

            };

           var processStepAdded= await ProcessRepository.InsertAsync(processSteps);
           if(processStepAdded > 0)
            {
                ProcessResponseModel processResponseModel = new()
                {
                    Id=processSteps.Id,
                    StepName=processSteps.StepName,
                    StepDescription=processSteps.StepDescription,
                };
                return ApiResponse<ProcessResponseModel>.SuccessResponse(processResponseModel, ApiMessages.ProcessManagement.ProcessAddedSuccessfully, HttpStatusCodes.Created);
            }
            else
            {
                return ApiResponse<ProcessResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadRequest);
            }
            
            
        }
    }
}
