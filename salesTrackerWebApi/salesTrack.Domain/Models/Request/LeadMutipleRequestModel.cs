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
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        /*        public Guid LeadSourceId { get; set;}*/
        public string? LeadSourceName { get; set; }
        public Guid CompanyId { get; set; }
        public Guid? LeadCategoryId { get; set; }
        /*    public Guid LeadCompanyId {  get; set; }*/
        public string? LeadCompany { get; set; }

        [Required(ErrorMessage = "AssignTo is required.")]
        public Guid AssignTo { get; set; }
        public FinalStatus FinalStatus { get; set; }
        public int? LeadRank { get; set; }
        public string? AssignToUser { get; set; }
        public string? Designation { get; set; }
        public string? Department { get; set; }
    }
}
