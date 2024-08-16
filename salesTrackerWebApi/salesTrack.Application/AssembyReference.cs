using Microsoft.Extensions.DependencyInjection;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Application.Abstraction.IService;
using salesTrack.Application.Services;
using SalesTrack.Application.Abstraction.IService;

namespace salesTrack.Application
{
    public static  class AssembyReference
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services)
        {
            services.AddScoped<IEnquiryService, EnquiryService>();
            services.AddScoped<IUserService, UserService>();
            return services;
        }

    }
}
