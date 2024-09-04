using salesTrack.Domain.Enums;
using salesTrack.Domain.Models.Request;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Response
{
    public class LeadResponseModel
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public Guid LeadSourceId { get; set; }
        public string? LeadSourceName { get; set; }
        public string? Comment { get; set; }
        public string? AssignedTo { get; set; }
        public Guid AssignToId { get; set; }
        public UserRole UserRole { get; set; }
        public FinalStatus FinalStatus { get; set; }
        public bool IsActive { get; set; }
    }
}
