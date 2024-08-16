using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Request
{
    public class EnquiryRequestModel
    {
            [Required(ErrorMessage = "Name is required")]
            [StringLength(40, ErrorMessage = "Name must not exceed 50 characters.")]
            public string? Name { get; set; }
            [Required(ErrorMessage = "Email is required")]
            [EmailAddress(ErrorMessage = "Invalid email format.")]
            [RegularExpression("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$", ErrorMessage = "Please enter valid Email")]
            public string? Email { get; set; }
            [Required(ErrorMessage = "Phone number is required.")]
            [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must be 10 digits.")]
            public string? PhoneNumber { get; set; }

        
    }
}
