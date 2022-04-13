namespace API.DTOs
{
    public class AttendanceDto
    {
        public int Id { get; set; }
        public Guid Ref_student { get; set; }
        public DateTime Time_in { get; set; } = DateTime.UtcNow;
        public int StudentId { get; set; }
    }
}
