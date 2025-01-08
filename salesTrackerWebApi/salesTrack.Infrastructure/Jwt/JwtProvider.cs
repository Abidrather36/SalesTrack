using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using salesTrack.Application.Abstraction.Jwt;
using salesTrack.Domain.Models.JWT;
using salesTrack.Infrastructure.Identity;
using SalesTrack.Domain.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace salesTrack.Infrastructure.Jwt
{
    public class JwtProvider : IJwtProvider
    {
        private readonly IConfiguration configuration;

        public JwtProvider(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public UserTokens GenerateToken(MasterUser user)
        {
            try
            {
                if (user == null) throw new ArgumentException(nameof(user));

                var userToken = new UserTokens();
                var jwtSettings = new JwtSettings
                {
                    IssuerSigningKey = configuration["Jwt:Key"],
                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidAudience = configuration["Jwt:Audience"]
                };

                var key = Encoding.ASCII.GetBytes(jwtSettings.IssuerSigningKey!);
                Guid id = Guid.Empty;
                DateTime expireTime = DateTime.UtcNow.AddHours(1);

                userToken.Validaty = expireTime.TimeOfDay;
                var claims = new List<Claim>
            {
                new Claim(AppClaims.UserId, user.Id.ToString()!),
                new Claim(JwtRegisteredClaimNames.Name, user.Name!),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                new Claim(ClaimTypes.Role, user.UserRole.ToString())
            };

                var jwtToken = new JwtSecurityToken(
                    issuer: jwtSettings.ValidIssuer,
                    audience: jwtSettings.ValidAudience,
                    claims: claims,
                    notBefore: DateTime.UtcNow,
                    expires: expireTime,
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
                );
                userToken.ExpiredTime = expireTime;

                userToken.Token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
                userToken.UserName = user.Name;
                userToken.Id = user.Id;
                userToken.UserRole = user.UserRole;

                return userToken;
            }
            catch (Exception)
            {
                throw;
            }

        }
        public UserTokens GenerateRefreshToken(MasterUser user)
        {
            var jwtSettings = new JwtSettings
            {
                IssuerSigningKey = configuration["Jwt:Key"],
                ValidIssuer = configuration["Jwt:Issuer"],
                ValidAudience = configuration["Jwt:Audience"]
            };

            var key = Encoding.ASCII.GetBytes(jwtSettings.IssuerSigningKey!);
            DateTime expireTime = DateTime.UtcNow.AddDays(7);

            var claims = new List<Claim>
            {
                new Claim(AppClaims.UserId, user.Id.ToString()!),
                new Claim(ClaimTypes.Role, user.UserRole.ToString())
            };

            var jwtToken = new JwtSecurityToken(
                issuer: jwtSettings.ValidIssuer,
                audience: jwtSettings.ValidAudience,
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: expireTime,
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            );
            var userToken = new UserTokens();
            userToken.ExpiredTime = expireTime;
            userToken.RefreshToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            userToken.Id = user.Id;
            userToken.UserRole = user.UserRole;
            return userToken;
        }

    }
}
