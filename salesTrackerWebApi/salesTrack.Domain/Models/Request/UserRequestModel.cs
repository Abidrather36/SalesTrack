using salesTrack.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace SalesTrack.Domain.Entities.Models.Request
{
  
    public class UserRequestModel
    {
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }
        [Required]
        public UserType UserType { get; set; }
        [Required]
        public Guid ReportsTo { get; set; }


    }
}
