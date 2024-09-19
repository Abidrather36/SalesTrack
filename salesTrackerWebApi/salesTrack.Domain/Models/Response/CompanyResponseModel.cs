using salesTrack.Domain.Models.Request;

namespace salesTrack.Domain.Models.Response
{
    public class CompanyResponseModel : CompanyRequestModel
    {
        public Guid Id { get; set; }
        public bool IsActive { get; set; }
        public Guid? CreatedBy { get; set; }
        public DateTimeOffset? CreatedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public DateTimeOffset? ModifiedDate { get; set; }
        public Guid? DeletedBy { get; set; }
        public DateTimeOffset? DeletedDate { get; set; }
        public string? DeletedByName { get; set; }

    }
}
