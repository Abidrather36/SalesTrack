using salesTrack.Domain.Models.Request;

namespace salesTrack.Domain.Models.Response
{
    public class ProcessResponseModel:LeadProcessRequestModel
    {
        public Guid Id { get; set; }
        public bool IsActive { get; set; }
    }
}
