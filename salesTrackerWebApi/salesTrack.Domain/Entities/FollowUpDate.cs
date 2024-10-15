﻿using SalesTrack.Domain.Shared;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace salesTrack.Domain.Entities
{
    public class FollowUpDate:BaseModel
    {
      
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }

        public Guid LeadId { get; set; }

        [ForeignKey(nameof(LeadId))]
        public Lead? Lead { get; set; }

        public Guid? LeadProcessStepId { get; set; }
        [ForeignKey(nameof(LeadProcessStepId))]

        public LeadProcessSteps? LeadProcessStep {  get; set; }

    }
}
