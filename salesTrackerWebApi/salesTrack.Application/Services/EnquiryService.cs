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

        public EnquiryService(IEnquiryRepository enquiryRepository)
        {
            this.enquiryRepository = enquiryRepository;
        }

        public async Task<ApiResponse<EnquiryResponseModel>> AddEnquiry(EnquiryRequestModel model)
        {
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

            if (await enquiryRepository.IsExistsAsync(x => x.Email == model.Email))
                return ApiResponse<EnquiryResponseModel>.ErrorResponse(ApiMessages.EnquiryManagement.EnquiryEmailExist, HttpStatusCodes.Conflict);

            int returnVal = await enquiryRepository.InsertAsync(enquiry);

            if (returnVal > 0)
                return ApiResponse<EnquiryResponseModel>.SuccessResponse(new EnquiryResponseModel
                {
                    Id = enquiry.Id,
                    Name = model.Name,
                    PhoneNumber = model.PhoneNumber,
                    Email = model.Email,
                    IsActive = true,

                }, ApiMessages.EnquiryManagement.EnquiryAdded, HttpStatusCodes.Accepted);

            return ApiResponse<EnquiryResponseModel>.ErrorResponse(ApiMessages.Error, HttpStatusCodes.BadRequest);
        }

        public async  Task<ApiResponse<EnquiryResponseModel>> DeleteEnquiry(Guid Id)
        {
            var user= await enquiryRepository.GetByIdAsync(Id);
            if (user is null)
                return ApiResponse<EnquiryResponseModel>.ErrorResponse(ApiMessages.EnquiryManagement.EnquiryNotFound, HttpStatusCodes.BadGateway);
            user.IsActive = false;
            var UpdatedUser=await enquiryRepository.UpdateAsync(user);
            if (UpdatedUser > 0)
                return ApiResponse<EnquiryResponseModel>.SuccessResponse(new EnquiryResponseModel {Id=user.Id,Name=user.Name,Email=user.Email,IsActive=false}, ApiMessages.EnquiryManagement.EnquiryDeleted, HttpStatusCodes.Accepted);
            return ApiResponse<EnquiryResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.BadGateway);
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
            },ApiMessages.EnquiryManagement.EnquiryFound, HttpStatusCodes.OK);
        }
    }
    }

