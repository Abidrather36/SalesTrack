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

        public async Task<ApiResponse<ProcessResponseModel>> DeleteProcess(Guid id)
        {
            var user=await ProcessRepository.GetByIdAsync(id);

            if(user is null)
            {
                return ApiResponse<ProcessResponseModel>.ErrorResponse(ApiMessages.ProcessManagement.ProcessNotFound, HttpStatusCodes.NotFound);
            }
            user.IsActive = false;
            user.ModifiedDate = DateTime.Now;
            var deletedUser=await ProcessRepository.UpdateAsync(user);
            if(deletedUser > 0)
            {
                ProcessResponseModel processResponseModel = new()
                {
                    Id = user.Id,
                    StepName = user.StepName,
                    StepDescription = user.StepDescription,
                    IsActive=false,
                };
                return ApiResponse<ProcessResponseModel>.SuccessResponse(processResponseModel, ApiMessages.ProcessManagement.ProcessDeletedSuccessfully, HttpStatusCodes.Accepted);
            }
            else
            {
                return ApiResponse<ProcessResponseModel>.ErrorResponse(ApiMessages.TechnicalError,HttpStatusCodes.BadRequest);
            }
        }

        public async Task<ApiResponse<ProcessResponseModel>> GetProcessById(Guid id)
        {
           var process= await ProcessRepository.GetByIdAsync(id);
            if (process is null)
            {
                return ApiResponse<ProcessResponseModel>.ErrorResponse(ApiMessages.ProcessManagement.ProcessNotFound, HttpStatusCodes.BadRequest);
            }

            else
            {
                ProcessResponseModel processResponseModel = new()
                {
                    Id = process.Id,
                    StepName = process.StepName,
                    StepDescription = process.StepDescription,
                    IsActive=process.IsActive,
                };

                return ApiResponse<ProcessResponseModel>.SuccessResponse(processResponseModel, ApiMessages.ProcessManagement.ProcessFound, HttpStatusCodes.OK);

            }


        }

        public async Task<ApiResponse<IEnumerable<ProcessResponseModel>>> GetProcessList()
        {
           var processes= await ProcessRepository.GetAllAsync();
            if(processes.Any())
            {
               var processList= processes.Select(x => new ProcessResponseModel
                {
                    Id = x.Id,
                    StepName = x.StepName,
                    StepDescription = x.StepDescription,
                });
                return ApiResponse<IEnumerable<ProcessResponseModel>>.SuccessResponse(processList, ApiMessages.ProcessManagement.ProcessListRetrievedSuccessfully, HttpStatusCodes.OK);
            }
            else
            {
                return ApiResponse<IEnumerable<ProcessResponseModel>>.ErrorResponse(ApiMessages.ProcessManagement.ProcessNotFound, HttpStatusCodes.BadRequest);
            }
        }

        public async Task<ApiResponse<ProcessResponseModel>> UpdateProcess(ProcessUpdateModel model)
        {
            var process = await ProcessRepository.FirstOrDefaultAsync(x => x.Id == model.Id);
            if(process is null)
            {
                return ApiResponse<ProcessResponseModel>.ErrorResponse(ApiMessages.ProcessManagement.ProcessNotFound, HttpStatusCodes.BadRequest);
            }
           process.StepName = model.StepName;
           process.StepDescription = model.StepDescription;
           var updatedProcess=await ProcessRepository.UpdateAsync(process);
            
            if(updatedProcess > 0)
            {
                ProcessResponseModel processResponseModel = new()
                {
                    Id = process.Id,
                    StepName = model.StepName,
                    StepDescription = model.StepDescription,
                };
                return ApiResponse<ProcessResponseModel>.SuccessResponse(processResponseModel, ApiMessages.ProcessManagement.ProcessUpdateSuccess, HttpStatusCodes.Accepted);
            }
            else
            {
                return ApiResponse<ProcessResponseModel>.ErrorResponse(ApiMessages.ProcessManagement.ProcessUpdateFailed, HttpStatusCodes.NotAcceptable);
            }
        }
    }
}
