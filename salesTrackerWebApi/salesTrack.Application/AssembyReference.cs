using Microsoft.Extensions.DependencyInjection;
using salesTrack.Application.Abstraction.IEmailService;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Application.Services;
using SalesTrack.Application.Abstraction.IService;

namespace salesTrack.Application
{
    public static  class AssembyReference
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services)
        {

            services.AddScoped<IEmailHelperService, EmailHelperService>();
            services.AddScoped<ILeadService, LeadService>();
            services.AddScoped<ILeadSourceService, LeadSourceService>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IEnquiryService, EnquiryService>();
            services.AddScoped<IUserService, UserService>();
            return services;
        }

    }
}
