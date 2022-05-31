using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Entities;
using API.DTOs;
using API.Data;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QrScannerController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public QrScannerController(DataContext context, IUnitOfWork unitOfWork, IMapper mapper )
        {
            _context = context;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [HttpPost("check-qr")]
        public async Task<ActionResult<Student>> CheckQr(QrDto qrDto)
        {
            var student = await _unitOfWork.StudentsRepository.GetStudentByQr(qrDto.QrId);
            if (student == null) return BadRequest("Qr Not Register or valid");
            var attendance = await _unitOfWork.AttendanceRepository.StudentAttendanceToday(student.Ref_student);

            if (attendance != null) return BadRequest("Student Already Present today");

            var newAttendance = new Attendance
            {
                Ref_student = student.Ref_student,
                Time_in = DateTime.UtcNow
            };
            student.Attendance.Add(newAttendance);
            //_unitOfWork.AttendanceRepository.AddAttendance(newAttendance);
            if (!await _unitOfWork.Complete()) return BadRequest("Error");

            return CreatedAtRoute("GetStudentbyQr", new { QrId = student.QrId }, _mapper.Map<AttendanceDto>(newAttendance));
            /* var user = new AppUser;*/
        }

        [HttpGet("studentbyqr/{qrid}", Name = "GetStudentbyQr")]
        public async Task<ActionResult<Student>> GetStudentByQr(string qrid)
        {
            var student = await _unitOfWork.StudentsRepository.GetStudentByQr(qrid);
            return Ok(student);
        }
    }
}
