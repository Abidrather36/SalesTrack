using System.ComponentModel.DataAnnotations;

namespace salesTrack.Domain.Models.Request
{
    public  class LeadFollowUpdateRequest
    {
        [Required(ErrorMessage = "Date  is required")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Date { get; set; }
        [Required(ErrorMessage = "Time is required")]
        [DataType(DataType.Time)]
        [DisplayFormat(DataFormatString = "{0:HH:mm}", ApplyFormatInEditMode = true)]
        public TimeSpan Time { get; set; }
        public Guid LeadId { get; set; }
    }
}
