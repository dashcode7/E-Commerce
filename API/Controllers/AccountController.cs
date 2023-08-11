using API.ErrorResponse;
using Core.Entities.Identity;
using Core.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.ErrorResponse;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController:ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;

        public AccountController(UserManager<AppUser> userManager,SignInManager<AppUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<UserModel>> login(LoginModel loginmodel)
        {
            var user =await userManager.FindByEmailAsync(loginmodel.Email);
            if (user == null) return StatusCode(401, "UnAuthorized");
            var result = signInManager.CheckPasswordSignInAsync(user, loginmodel.Password, false);
            if(!result.IsCompletedSuccessfully) return StatusCode(401, "UnAuthorized");
            return new UserModel
            {
                Email = user.Email,
                Token = "This can be used as a token",
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
            if (!result.IsCompletedSuccessfully) return BadRequest("You have made a bad request!");
            return new UserModel
            {
                DisplayName = registermodel.DisplayName,
                Email = registermodel.Email,
                Token = "This can be user as a token"
            };


        }
    }
}
