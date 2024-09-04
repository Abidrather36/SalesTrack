using salesTrack.Domain.Enums;

namespace salesTrack.Domain.Models.Request
{
    public class LeadUpdateModel:LeadRequestModel
    {
        public Guid Id { get; set; }
     
    }
}
