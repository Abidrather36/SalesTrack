using salesTrack.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace salesTrack.Domain.Models.Request
{
    public class LeadUpdateModel
    {
        public Guid? Id { get; set; }
        public string? LeadName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public Guid LeadSourceId { get; set; }
        public Guid? LeadCategoryId { get; set; }
        public string? Comment { get; set; }

        public Guid? AssignTo { get; set; }

        public FinalStatus? FinalStatus { get; set; }
        public int? LeadRank { get; set; }
        public string? Designation { get; set; }
        public string? Department { get; set; }
    }
}
