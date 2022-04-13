using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
 
namespace API.Entities
{
    public class Student
    {
        public int Id { get; set; }
        public Guid Ref_student { get; set; }
        public string QrId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public int Grade { get; set; }
        public string Section { get; set; }
        public string Gender { get; set; }
        public string Lrn { get; set; }
        public ICollection<Attendance> Attendance { get; set; }

    }
}
