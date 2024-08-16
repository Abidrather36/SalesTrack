using Microsoft.Extensions.DependencyInjection;
using salesTrack.Application.Abstraction.IEmailService;
using salesTrack.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Application
{
    public static  class AssembyReference
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services)
        {
            services.AddScoped<IEmailHelperService, EmailHelperService>();
            return services;
        }

    }
}
