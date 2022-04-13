using System.Linq;
using API.DTOs;
using API.Entities;
//using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterQrDto, Student>();
            CreateMap<Attendance, AttendanceDto>();
            CreateMap<Student, StudentDto>()
              .ForMember(dest => 
              dest.Present, opt => opt.MapFrom(src => src.Attendance.Any(x => x.Time_in.Date == DateTime.UtcNow.Date)));
        }
    }
}
