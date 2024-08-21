using Microsoft.AspNetCore.Http;
using salesTrack.Application.Abstraction.Iidentity;

namespace salesTrack.Infrastructure.Identity
{
    public class ContextService : IContextService
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public ContextService(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }
        public string GetEmail()
        {
            throw new NotImplementedException();
        }

        public string GetUserName()
        {
            throw new NotImplementedException();
        }

        public Guid UserId()
        {
            var Id= httpContextAccessor.HttpContext!.User.Claims.FirstOrDefault(x=> x.Type ==AppClaims.UserId)?.Value;
            if (Id is null) return Guid.Empty;
            Guid id= Guid.Parse(Id);
            return id;  
        }
    }
}
