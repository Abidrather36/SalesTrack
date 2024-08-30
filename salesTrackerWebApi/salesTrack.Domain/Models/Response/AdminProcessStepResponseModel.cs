using salesTrack.Domain.Models.Request;

namespace salesTrack.Domain.Models.Response
{
    public class AdminProcessStepResponseModel:AdminProcessStepRequestModel
    {
        public Guid Id { get; set; }
    }
}
