using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IStudentsRepository
    {
        Task<Student> GetStudentByQr(string qrId);
        Task<IEnumerable<StudentDto>> ListStudentAttendance(ListStudentDto listStudentDto);

    }
}
