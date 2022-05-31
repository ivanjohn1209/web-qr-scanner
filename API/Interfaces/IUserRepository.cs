using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        Task<AppUser> GetUserByIdAsync(int id);
        Task<IEnumerable<AppUser>> GetUsersAsync();


        Task<AppUser> GetMemberAsync(string username);

    }
}
