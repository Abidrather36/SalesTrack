using salesTrack.Domain.Models.Request;

namespace salesTrack.Domain.Models.Response
{
    public class LeadCommentsResponseModel:LeadCommentsRequestModel
    {
        public Guid Id { get; set; }
    }
}
