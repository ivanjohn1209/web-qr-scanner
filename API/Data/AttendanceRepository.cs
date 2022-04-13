using API.Interfaces;
using API.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using API.DTOs;

namespace API.Data
{
    public class AttendanceRepository : IAttendanceRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AttendanceRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        /* public async Task<Attendance> AttendanceStudent(Guid ref_student)
         {
             var attendance = new Attendance
             {
                 Ref_student = ref_student,
             };
             await _context.

         Attendances.AddAsync(attendance);
             return attendance;
             //return await _context.Likes.FindAsync(sourceUserId, likedUserId);
         }*/
        public async Task<AttendanceDto> StudentAttendanceToday(Guid ref_student)
        {
            var attendance = await _context.Attendance.FirstOrDefaultAsync(e => e.Ref_student == ref_student && e.Time_in.Date == DateTime.UtcNow.Date);
            return _mapper.Map<AttendanceDto>(attendance);
        }
        public void AddAttendance(Attendance attendance)
        {
            _context.Attendance.Add(attendance);
        }
    }
}
