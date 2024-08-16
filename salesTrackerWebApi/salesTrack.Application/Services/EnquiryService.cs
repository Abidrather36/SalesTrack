using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Domain.Entities;
using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using SalesTrack.Application.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
                return ApiResponse<EnquiryResponseModel>.ErrorResponse(ApiMessages.EnquiryManagement.EnquiryEmailExist,HttpStatusCodes.Conflict);

              int returnVal=await enquiryRepository.InsertAsync(enquiry);

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
    }
}
