using salesTrack.Application.Abstraction.Jwt;
using salesTrack.Domain.Models.JWT;
using SalesTrack.Domain.Entities;

namespace salesTrack.Infrastructure.Jwt
{
    public class JwtProvider : IJwtProvider
    {
        public UserTokens GenerateToken(User user)
        {
            throw new NotImplementedException();
        }
    }
}
