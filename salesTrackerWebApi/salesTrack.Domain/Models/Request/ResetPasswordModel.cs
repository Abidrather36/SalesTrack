using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Request
{
    public class ResetPasswordModel
    {
        public int ResetCode { get; set; }
        public string? NewPassword { get; set; }
        
        [Compare(nameof(NewPassword))]
        public string? ConfirmPassword { get; set; }

    }
}
