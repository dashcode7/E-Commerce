using API.ErrorResponse;
using Core.Entities.Identity;
using Core.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.ErrorResponse;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController:ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly TokenService token;

        public AccountController(UserManager<AppUser> userManager,SignInManager<AppUser> signInManager,TokenService token)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.token = token;
        }
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<UserModel>> getCurrentUser()
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user =await userManager.FindByEmailAsync(email);
            return new UserModel
            {
                Email = user.Email,
                Token = token.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }
        [HttpGet("checkIfEmailExists")]
        public async Task<ActionResult<bool>> checkIfEmailExists(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            return user != null;
        }
        [Authorize]
        [HttpGet("Address")]
        public async Task<ActionResult<UserAddress>> getCutomerAddress()
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await userManager.Users.Include(x => x.Address).FirstOrDefaultAsync(y => y.Email == email);

            return new UserAddress
            {
                FirstName = user.Address.FirstName,
                City = user.Address.City,
                LastName = user.Address.LastName,
                Street = user.Address.Street,
                PinCode = user.Address.PinCode,
            };

        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<UserModel>> login(LoginModel loginmodel)
        {
            var user =await userManager.FindByEmailAsync(loginmodel.Email);
            if (user == null) return StatusCode(401, "UnAuthorized");
            var result = signInManager.CheckPasswordSignInAsync(user, loginmodel.Password, false);
            if(!result.Result.Succeeded) return StatusCode(401, "UnAuthorized");
            return new UserModel
            {
                Email = user.Email,
                Token =token.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }
        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<UserModel>> Register(RegisterModel registermodel)
        {
            var user = await userManager.FindByEmailAsync(registermodel.Email);
            if (user != null) return Ok(new ErrorMessage(500, "User Exists"));
            var appUser = new AppUser
            {
                Email = registermodel.Email,
                DisplayName = registermodel.DisplayName,
                UserName = registermodel.UserName
            };
            var result = userManager.CreateAsync(appUser, registermodel.Passsword);
            if (!result.Result.Succeeded) return BadRequest("You have made a bad request!");
            return new UserModel
            {
                DisplayName = registermodel.DisplayName,
                Email = registermodel.Email,
                Token = token.CreateToken(appUser)
            };


        }
    }
}
