using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using salesTrack.Application.Abstraction.IRepository;
using salesTrack.Persistence.Repository;
using SalesTrack.Application.Abstraction.IRepository;
using SalesTrack.Persistence.Data;

namespace salesTrack.Persistence
{
    public static  class AssembyReference
    {
        public static IServiceCollection AddPersistenceService(this IServiceCollection services,IConfiguration configuration)
        {
            services.AddScoped<IEnquiryRepository, EnquiryRepository>();
            services.AddScoped<IProcessRepository, ProcessRepository>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddDbContextPool<SalesTrackDBContext>(options => options.UseSqlServer(configuration.GetConnectionString(nameof(SalesTrackDBContext))));
            return services;
        }
    }
}
