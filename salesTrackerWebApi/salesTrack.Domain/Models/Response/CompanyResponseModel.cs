using salesTrack.Domain.Models.Request;

namespace salesTrack.Domain.Models.Response
{
    public class CompanyResponseModel : CompanyRequestModel
    {
        public Guid Id { get; set; }
    }
}
