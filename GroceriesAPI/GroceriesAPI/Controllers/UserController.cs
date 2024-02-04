using GroceriesAPI.Data;
using GroceriesAPI.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace GroceriesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _authContext;
       public UserController(DataContext dataContext)
        {
            _authContext = dataContext;

        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] Users userObj)
        {
            if(userObj==null)
            {
               
                return BadRequest();

            }
            var user = await _authContext.users.FirstOrDefaultAsync(x => x.Email == userObj.Email && x.Password==userObj.Password);

            if(user==null)
            {
                return NotFound(new { Message = "User Not Found" });
            }
            user.Token = CreateJwt(user);
            return Ok(new
            {
                Token=user.Token,
                Message = "Login Success"
            });
        }

        [HttpPost("register")]

        public async Task<IActionResult> RegisterUser([FromBody] Users userObj)
        {
            if(userObj==null)
            {
                return BadRequest();

            }
            if(await CheckUserNameExistAsync(userObj.Username))
            {
                return BadRequest(new { Message = "Username already Exists" });
            }
            if(await CheckUserEmailExistAsync(userObj.Email))
            {
                return BadRequest(new { Message = "Email already Exists" });

            }
            if(userObj.Phone.Length !=10)
            {
                return BadRequest(new { Message = "mobile number is unvalid" });
            }
            var pass = CheckPassword(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
                return BadRequest(new { Message = pass.ToString() });

        


            userObj.Role = "User";
            

            await _authContext.users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registered"
            });

        }

        private async Task<bool> CheckUserNameExistAsync(string username)
        => await _authContext.users.AnyAsync(x => x.Username == username);
        private async Task<bool> CheckUserEmailExistAsync(string email)
      => await _authContext.users.AnyAsync(x => x.Email == email);

        private string CheckPassword(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 8)
                sb.Append("Minimum password length is 8" + Environment.NewLine);
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")&& Regex.IsMatch(password, "[0-9]")))
                sb.Append("Password should be alphanumeric" + Environment.NewLine);
            if (!Regex.IsMatch(password, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,//,{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
                sb.Append("Password should be contain atleast one special character" + Environment.NewLine);
            return sb.ToString();

        }
       
        
        private string CreateJwt(Users user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysecret.....");
            var claims = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role,user.Role),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())

            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}
