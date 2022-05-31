using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
 using API.Data;
using API.DTOs;
using API.Entities;
// using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {  
        
        private readonly DataContext _context;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public StudentsController(DataContext context, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _context = context;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpPost("register-qr")]
        public async Task<ActionResult<Student>> RegisterQR(RegisterQrDto registerQrDto)
        {
            if (await QrExists(registerQrDto.QrId)) return BadRequest("Qr is already exist");

            var user = _mapper.Map<Student>(registerQrDto);
            user.Ref_student = Guid.NewGuid();
            await _context.Students.AddAsync(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost("list")]
        public async Task<ActionResult<IEnumerable<StudentDto>>> ListStudentAttendance(ListStudentDto listStudentDto)
        {
            var students = await _unitOfWork.StudentsRepository.ListStudentAttendance(listStudentDto);

            return Ok(students);
        }

        private async Task<bool> QrExists(string QrId)
        {
            return await _context.Students.AnyAsync(x => x.QrId == QrId);
        }
    }
}