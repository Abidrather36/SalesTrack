using salesTrack.Domain.Models.Request;

namespace salesTrack.Domain.Models.Response
{
    public class LeadSourceResponseModel:LeadSourceRequestModel
    {
        public Guid Id { get; set; }
    }
}
