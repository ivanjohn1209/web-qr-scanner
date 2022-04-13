using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class QrDto
    {
        [Required]
        public string QrId { get; set; }
    }
}
