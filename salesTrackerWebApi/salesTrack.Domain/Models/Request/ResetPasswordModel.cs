using System.ComponentModel.DataAnnotations;

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
