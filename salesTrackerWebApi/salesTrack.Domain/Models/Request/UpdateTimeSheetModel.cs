using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Domain.Models.Request
{
    public class UpdateTimeSheetModel
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }

        public string? TimeSheetStepName { get; set; }

        public int HoursSpent { get; set; }

        public string? Comment { get; set; }
    }
}
