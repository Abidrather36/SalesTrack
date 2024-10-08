﻿using salesTrack.Application.Abstraction.IEmailService;
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
            try
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

                var returnVal = await enquiryRepository.InsertAsync(enquiry);
                if (returnVal > 0)
                {
                    var emailSent = await emailHelperService.SendEnquiryEmail(model.Name!, model.PhoneNumber!, model.Email!);
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
            catch (Exception ex)
            {
                
                return ApiResponse<EnquiryResponseModel>.ErrorResponse(ex.Message, HttpStatusCodes.InternalServerError);
            }
        }

    
        public async Task<ApiResponse<EnquiryResponseModel>> DeleteEnquiry(Guid Id)
        {
            var enquiry = await enquiryRepository.GetByIdAsync(Id);
            if (enquiry == null)
                return ApiResponse<EnquiryResponseModel>.ErrorResponse(ApiMessages.EnquiryManagement.EnquiryNotFound, HttpStatusCodes.NotFound);

            enquiry.IsActive = false;
            var updateResult = await enquiryRepository.UpdateAsync(enquiry);
            if (updateResult > 0)
                return ApiResponse<EnquiryResponseModel>.SuccessResponse(
                    new EnquiryResponseModel
                    {
                        Id = enquiry.Id,
                        Name = enquiry.Name,
                        Email = enquiry.Email,
                        IsActive = false
                    },
                    ApiMessages.EnquiryManagement.EnquiryDeleted,
                    HttpStatusCodes.Accepted
                );

            return ApiResponse<EnquiryResponseModel>.ErrorResponse(ApiMessages.TechnicalError, HttpStatusCodes.InternalServerError);
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

        public async Task<ApiResponse<EnquiryUpdateResponse>> UpdateEnquiry(EnquiryUpdateRequest model)
        {
          var enquiry= await enquiryRepository.FirstOrDefaultAsync(x => x.Id == model.Id);

            if(enquiry is null)
            {
                ApiResponse<EnquiryUpdateResponse>.ErrorResponse(ApiMessages.EnquiryManagement.EnquiryNotFound, HttpStatusCodes.BadRequest);
            }
            
                enquiry!.Name = model.Name;
                enquiry.Email = model.Email;
                enquiry.PhoneNumber = model.PhoneNumber;
                enquiry.IsActive=model.IsActive;
                var updatedEnquiry=await enquiryRepository.UpdateAsync(enquiry);

            if(updatedEnquiry > 0)
            {
                EnquiryUpdateResponse enquiryUpdate = new()
                {
                    Id = enquiry.Id,
                    Name = enquiry.Name,
                    Email = enquiry.Email,
                    PhoneNumber = enquiry.PhoneNumber,
                    IsActive=enquiry.IsActive
                };
                return ApiResponse<EnquiryUpdateResponse>.SuccessResponse(enquiryUpdate, ApiMessages.EnquiryManagement.EnquiryUpdated, HttpStatusCodes.Accepted);
            }
            else
            {
                return ApiResponse<EnquiryUpdateResponse>.ErrorResponse(ApiMessages.EnquiryManagement.InvalidCredential, HttpStatusCodes.BadRequest);
            }
            

        }
    }
    }

