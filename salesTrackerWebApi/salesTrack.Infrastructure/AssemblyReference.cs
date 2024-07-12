using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Infrastructure
{
    public static class AssemblyReference
    {
        public static IServiceCollection AddInfrastructureService(this IServiceCollection services)
        {
            return services;

        }
    }
}
