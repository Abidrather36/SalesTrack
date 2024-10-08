﻿using salesTrack.Domain.Enums;
using SalesTrack.Domain.Entities;
using SalesTrack.Domain.Shared;
using System.ComponentModel.DataAnnotations.Schema;

namespace salesTrack.Domain.Entities
{
    public  class Lead:BaseModel
    {
        public string? Comment { get; set; }
        public Guid AssignTo { get; set; }
        public Guid LeadSourceId { get; set; }
        public FinalStatus FinalStatus { get; set; }

        #region navigation

        [ForeignKey(nameof(LeadSourceId))]
        public LeadSource? LeadSource { get; set; }

        [ForeignKey(nameof(Id))]
        public User? User { get; set; }
        ICollection<LeadProcessSteps>? ProcessSteps { get; set; }
        ICollection<FollowUpDate>? FollowUpDate { get; set; }
        public ICollection<Comments>? Comments { get; set; }
        #endregion
    }
}

