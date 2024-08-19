using salesTrack.Application.Abstraction.Jwt;
using SalesTrack.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Infrastructure.Jwt
{
    public class JwtProvider : IJwtProvider
    {
        public string GenrateToken(User user)
        {
            throw new NotImplementedException();
        }
    }
}
