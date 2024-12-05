using salesTrack.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace salesTrack.Domain.Models.Request
{
    public class LeadRequestModel
    {
        [Required(ErrorMessage = "Name is required.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        [RegularExpression("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$", ErrorMessage = "Please enter valid Email")]
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public Guid LeadSourceId { get; set;}
        public Guid CompanyId { get; set; }
        public Guid LeadCategoryId { get; set; }
        public Guid LeadCompanyId {  get; set; }
        public string? Comment { get; set; }

        [Required(ErrorMessage = "AssignTo is required.")]
        public Guid AssignTo { get; set; }

        [Required(ErrorMessage = "Final status is required.")]
        public FinalStatus FinalStatus { get; set; }
        public int LeadRank { get; set; }
    }
}
