using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IUnitOfWork _unitOfWork;

        public AccountController(DataContext context, ITokenService tokenService, IUnitOfWork unitOfWork)
        {
            _tokenService = tokenService;
            _context = context;
            _unitOfWork = unitOfWork;
        }

        [Authorize]
        [HttpPost("createuser")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            using var hmac = new HMACSHA512();
            var userFind = _context.Users.Where(x => x.UserName == registerDto.Username).FirstOrDefault();
            if (userFind != null)
                return BadRequest("Username is taken");

            var user = new AppUser
            {
                UserName = registerDto.Username,
                Password = registerDto.Password,
                Role=registerDto.Role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Role = user.Role
            };
        }

        [Authorize]
        [HttpPost("list")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetAccountList()
        {
            var userID = User.GetUserId();
            var users = await _unitOfWork.UserRepository.GetUsersAsync();
           var listUsers = users.Where((e) => e.Id != userID);
            return Ok(listUsers);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username);

            if (user == null) return Unauthorized("Invalid username");

            if (loginDto.Password != user.Password) return Unauthorized("Invalid password");

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                Role = user.Role
            };
        }


        [HttpPost("sessioninfo")]
        public async Task<ActionResult<UserDto>> SessionInfo(SessionDto sessionDto)
        {
            var userData = await _context.Users.SingleOrDefaultAsync(x => x.UserName == User.GetUsername());
             if(userData == null) return Unauthorized();
            return new UserDto
            {
                Username = userData.UserName,
                Token = sessionDto.Token,
                Role = userData.Role
            };
        }
    }
}
