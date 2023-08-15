using Core.Entities.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class TokenService
    {
        private readonly IConfiguration config;
        private SymmetricSecurityKey _key;

        public TokenService(IConfiguration _config)
        {
            config = _config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"]));
        }
        public string CreateToken(AppUser user)
        {
            var cliams = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.GivenName, user.DisplayName)
            };
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject=new ClaimsIdentity(cliams),
                Issuer = config["Token:Issuer"],
                Expires=DateTime.Now.AddDays(7),
                SigningCredentials=creds
            };
            var tokenhandler = new JwtSecurityTokenHandler();
            var token = tokenhandler.CreateToken(tokenDescriptor);
            return tokenhandler.WriteToken(token);
        }
    }
}
