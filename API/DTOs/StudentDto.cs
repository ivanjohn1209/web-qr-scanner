namespace API.DTOs
{
    public class StudentDto
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
        public bool Present { get; set; }

    }
}
