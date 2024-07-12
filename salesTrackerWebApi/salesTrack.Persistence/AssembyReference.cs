using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Persistence
{
    public static  class AssembyReference
    {
        public static IServiceCollection AddPersistenceService(this IServiceCollection services)
        {
            return services;
        }
    }
}
