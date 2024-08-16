using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;

namespace salesTrack.Application.Abstraction.IService
{
    public interface IEnquiryService
    {
        Task<ApiResponse<EnquiryResponseModel>> AddEnquiry(EnquiryRequestModel model);

        Task<ApiResponse<IEnumerable<EnquiryResponseModel>>> GetAllEnquiries();

        Task<ApiResponse<EnquiryResponseModel>> GetEnquiryById(Guid Id);

        public Task<ApiResponse<EnquiryResponseModel>> DeleteEnquiry(Guid Id);


     /*   Task<ApiResponse<>> UpdateEnquiry( model);*/
    }
}
