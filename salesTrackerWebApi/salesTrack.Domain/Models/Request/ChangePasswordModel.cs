using System.ComponentModel.DataAnnotations;

namespace salesTrack.Domain.Models.Request
{
    public class ChangePasswordModel
    {
        [Required(ErrorMessage = "Enter Old Password")]

        public string OldPassowrd { get; set; } = string.Empty;


        [Required(ErrorMessage = "Enter New password")]
        public string NewPassword { get; set; } = string.Empty;


        [Compare(nameof(NewPassword))]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
