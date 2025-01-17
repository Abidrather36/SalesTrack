using salesTrack.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Request
{
    public class LeadMutipleRequestModel
    {

        [Required(ErrorMessage = "Name is required.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        /*        public Guid LeadSourceId { get; set;}*/
        public string? LeadSourceName { get; set; }
        public Guid CompanyId { get; set; }
        public Guid? LeadCategoryId { get; set; }
        /*    public Guid LeadCompanyId {  get; set; }*/
        public string? LeadCompany { get; set; }
        public string? Comment { get; set; }

        [Required(ErrorMessage = "AssignTo is required.")]
        public Guid AssignTo { get; set; }

        [Required(ErrorMessage = "Final status is required.")]
        public FinalStatus FinalStatus { get; set; }
        public int? LeadRank { get; set; }
        public string? AssignToUser { get; set; }
    }
}
