using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using salesTrack.Application.Abstraction.Iidentity;
using salesTrack.Application.Abstraction.Jwt;
using salesTrack.Infrastructure.Identity;
using salesTrack.Infrastructure.Jwt;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Infrastructure
{
    public static class AssemblyReference
    {
        public static IServiceCollection AddInfrastructureService(this IServiceCollection services,IConfiguration configuration)
        {
            services.AddSingleton<IJwtProvider,JwtProvider>();
            services.AddSingleton<IContextService, ContextService>();

            return services;

        }
    }
}
