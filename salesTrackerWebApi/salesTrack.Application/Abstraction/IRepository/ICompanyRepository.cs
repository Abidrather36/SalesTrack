using salesTrack.Domain.Entities;
using SalesTrack.Application.Abstraction.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Application.Abstraction.IRepository
{
    public interface ICompanyRepository:IBaseRepository<Company>
    {
    }
}
