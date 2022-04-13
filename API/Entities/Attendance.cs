using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Attendance")]
    public class Attendance
    {
        public int Id { get; set; }
        public Guid Ref_student { get; set; }
        public DateTime Time_in { get; set; } = DateTime.UtcNow;
        public Student Student { get; set; }
        public int StudentId { get; set; }
    }
}
