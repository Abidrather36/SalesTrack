using SalesTrack.Domain.Shared;

namespace salesTrack.Domain.Entities
{
    public class LeadSource:BaseModel
    {
        public string? LeadSourceName { get; set; }

        public string? Description { get; set; }

        #region navigation 
        public ICollection<Lead> Leads { get; set; }
        #endregion
    }
}
