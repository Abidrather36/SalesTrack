using salesTrack.Domain.Models.JWT;
using SalesTrack.Domain.Entities;

namespace salesTrack.Application.Abstraction.Jwt
{
    public  interface IJwtProvider
    {
        public UserTokens GenerateToken(User user);
    }
}
