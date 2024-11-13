using System.ComponentModel.DataAnnotations;

namespace salesTrack.Domain.Models.Request
{
    public class LeadSourceRequestModel
    {
        public string? LeadSourceName { get; set; }
        public string? Description { get; set; }

    }
}
