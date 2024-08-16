using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Application.Abstraction.IEmailService
{
    public interface IEmailHelperService
    {
        Task<bool> SendEnquiryEmail(string emailAdrees);
    }
}
