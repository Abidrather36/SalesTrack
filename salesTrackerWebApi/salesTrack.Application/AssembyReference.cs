using Microsoft.Extensions.DependencyInjection;
using salesTrack.Application.Abstraction.IEmailService;
using salesTrack.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Application.Abstraction.IService;
using SalesTrack.Application.Abstraction.IService;

namespace salesTrack.Application
{
    public static  class AssembyReference
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services)
        {

            services.AddScoped<IEmailHelperService, EmailHelperService>();
            services.AddScoped<IAuthService, AuthService>();

            services.AddScoped<IEnquiryService, EnquiryService>();
            services.AddScoped<IUserService, UserService>();
            return services;
        }

    }
}
