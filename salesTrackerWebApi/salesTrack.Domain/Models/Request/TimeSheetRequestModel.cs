using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Request
{
    public class TimeSheetRequestModel
    {
        [Required]
        public DateTime Date { get; set; }
        [Required]

        public Guid? ProcessStep { get; set; }
        [Required]

        public int HoursSpent { get; set; }
        [Required]

        public string? Comment { get; set; }

    }
}
