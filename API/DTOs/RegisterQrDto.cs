using System.ComponentModel.DataAnnotations;


namespace API.DTOs
{
    public class RegisterQrDto
    {
        [Required]
        public string QrId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string MiddleName { get; set; }
        [Required]
        public int Grade { get; set; }
        [Required]
        public string Section { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string Lrn { get; set; }


    }
}
