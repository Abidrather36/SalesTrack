using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Application.Abstraction.Iidentity
{
    public interface IContextService
    {
        Guid UserId();
        string GetUserName();
        string GetEmail();
    }
}
