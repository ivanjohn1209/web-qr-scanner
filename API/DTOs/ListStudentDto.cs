using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ListStudentDto
    {
        public string Section { get; set; }
        public int Grade { get; set; }
        public DateTime Date { get; set; }
    }
}
