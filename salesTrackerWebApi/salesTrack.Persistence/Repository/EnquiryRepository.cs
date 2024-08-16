using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Domain.Entities;
using SalesTrack.Persistence.Data;
using SalesTrack.Persistence.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Persistence.Repository
{
    public class EnquiryRepository:BaseRepository<Enquiry>, IEnquiryRepository
    {
        public EnquiryRepository(SalesTrackDBContext context):base(context)
        {
                
        }
    }
}
