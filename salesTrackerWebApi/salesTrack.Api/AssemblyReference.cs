
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using salesTrack.Application.Services;
using SalesTrack.Application.Abstraction.IService;
using System.Text;
namespace salesTrack.Api
{
    public static class AssemblyReference
    {
        public static IServiceCollection AddApiService(this IServiceCollection services,IConfiguration configuration)
        {
            return services;

        }
    }
}
