using salesTrack.Domain.Models.Request;
using salesTrack.Domain.Models.Response;
using SalesTrack.Application.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Application.Abstraction.IService
{
    public interface ICompanyService
    {
        Task<ApiResponse<CompanyResponseModel>> AddCompany(CompanyRequestModel model);
    }
}
