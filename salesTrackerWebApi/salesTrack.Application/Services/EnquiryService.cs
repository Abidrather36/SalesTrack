using salesTrack.Application.Abstraction.IEmailService;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using SalesTrack.Application.Shared;

namespace salesTrack.Application.Services
{
    public class EnquiryService : IEnquiryService
    {
        private readonly IEnquiryRepository enquiryRepository;
        private readonly IEmailHelperService emailHelperService;

        public EnquiryService(IEnquiryRepository enquiryRepository,
                              IEmailHelperService emailHelperService)
        {
            this.enquiryRepository = enquiryRepository;
            this.emailHelperService = emailHelperService;
        }

        public async Task<ApiResponse<EnquiryResponseModel>> AddEnquiry(EnquiryRequestModel model)
        {
            if (await enquiryRepository.IsExistsAsync(x => x.Email == model.Email))
                return ApiResponse<EnquiryResponseModel>.ErrorResponse(ApiMessages.EnquiryManagement.EnquiryEmailExist, HttpStatusCodes.Conflict);

            Enquiry enquiry = new()
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
                PhoneNumber = model.PhoneNumber,
                Email = model.Email,
                IsActive = true,
                CreatedBy = Guid.Empty,
                CreatedDate = DateTimeOffset.Now,
                ModifiedDate = DateTimeOffset.Now,
                ModifiedBy = Guid.Empty,
                DeletedDate = DateTimeOffset.Now,
                DeletedBy = Guid.Empty,
            };

             var returnVal=await enquiryRepository.InsertAsync(enquiry);
            if (returnVal > 0)
            {
                var emailSent=await emailHelperService.SendEnquiryEmail(model.Name!,model.PhoneNumber!,model.Email!);
                if (emailSent)
                {
                    return ApiResponse<EnquiryResponseModel>.SuccessResponse(new EnquiryResponseModel
                    {
                        Id = enquiry.Id,
                        Name = model.Name,
                        PhoneNumber = model.PhoneNumber,
                        Email = model.Email,
                        IsActive = true,

                    }, ApiMessages.EnquiryManagement.EnquiryAdded, HttpStatusCodes.Accepted);
                }
                return ApiResponse<EnquiryResponseModel>.ErrorResponse(ApiMessages.TechnicalError);
            
            }
                
            return ApiResponse<EnquiryResponseModel>.ErrorResponse(ApiMessages.Error, HttpStatusCodes.BadRequest);
        }

        public Task<ApiResponse<EnquiryResponseModel>> DeleteEnquiry(Guid Id)
        {
            throw new NotImplementedException();
        }

        public async Task<ApiResponse<IEnumerable<EnquiryResponseModel>>> GetAllEnquiries()
        {
            var enquiries = await enquiryRepository.GetAllAsync();

            if (enquiries.Any())
            {
                var enquiryResponseModels = enquiries.Select(x => new EnquiryResponseModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Email = x.Email,
                    IsActive = true,
                    PhoneNumber = x.PhoneNumber
                });

                return ApiResponse<IEnumerable<EnquiryResponseModel>>.SuccessResponse(enquiryResponseModels, $"{enquiryResponseModels.Count()}Enquiries Found ",HttpStatusCodes.OK);
            }

            return ApiResponse<IEnumerable<EnquiryResponseModel>>.ErrorResponse("No enquiries found", HttpStatusCodes.NotFound);
        }


        public async Task<ApiResponse<EnquiryResponseModel>> GetEnquiryById(Guid Id)
        {
           var enquiry=await enquiryRepository.GetByIdAsync(Id);

            if (enquiry is null)
                return ApiResponse<EnquiryResponseModel>.ErrorResponse(ApiMessages.EnquiryManagement.EnquiryNotFound, HttpStatusCodes.BadRequest);

            return ApiResponse<EnquiryResponseModel>.SuccessResponse(new EnquiryResponseModel
            {
                Id = enquiry.Id,
                Name = enquiry.Name,
                Email = enquiry.Email,
                IsActive = true,
                PhoneNumber = enquiry.PhoneNumber
            }, ApiMessages.EnquiryManagement.EnquiryNameExist, HttpStatusCodes.OK);
        }
    }
    }

