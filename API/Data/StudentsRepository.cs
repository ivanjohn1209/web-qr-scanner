using API.Interfaces;
using API.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using API.DTOs;
using AutoMapper.QueryableExtensions;

namespace API.Data
{
    public class StudentsRepository : IStudentsRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public StudentsRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Student> GetStudentByQr(string qrId)
        {
            return await _context.Students
                .Include(p => p.Attendance)
                .SingleOrDefaultAsync(x => x.QrId == qrId);
        }


        public async Task<IEnumerable<StudentDto>> ListStudentAttendance(ListStudentDto listStudentDto)
        {
            var StudentOnSection = await _context.Students
                .Include(p => p.Attendance)
                .Where(e => 
                e.Grade == listStudentDto.Grade && 
                e.Section == listStudentDto.Section
                )
                .OrderBy(m => m.LastName)
                .ToListAsync();

            // var attendance = student.Attendance.Where(e => e.Time_in.Date == listStudentDto.Date.Date).FirstOrDefault();
            var studentList = new List<StudentDto>();
          StudentOnSection.ForEach(student => {
              var attendance = student.Attendance.Where(e => e.Time_in.Date == listStudentDto.Date.Date).FirstOrDefault();
              studentList.Add(new StudentDto
              {
                  Id = student.Id,
                  Ref_student = student.Ref_student,
                  QrId = student.QrId,
                  FirstName = student.FirstName,
                  LastName = student.LastName,
                  MiddleName = student.MiddleName,
                  Grade = student.Grade,
                  Section = student.Section,
                  Gender = student.Gender,
                  Lrn = student.Lrn,
                  Present = attendance != null ? true : false,
              }); });
            return studentList;
        }
    }
}
