using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApp.Domain;

namespace WebAppAPI.Services
{
    public class TokenService
    {
        public string CreateToken(AppUser user, IConfiguration config)
        {
            var claim = new List<Claim>
            {
                new Claim(ClaimTypes.Name,user.DisplayName),
                new Claim(ClaimTypes.NameIdentifier,user.Id),
                new Claim(ClaimTypes.Email,user.Email),
            }
            ;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var TokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claim),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = cred
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(TokenDescription);

            return tokenHandler.WriteToken(token);


        }
    }
}
