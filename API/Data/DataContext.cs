using API.Entities;
using Microsoft.EntityFrameworkCore;
 
namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
 
        }
 
        public DbSet<Student> Students { get; set; }
        public DbSet<Attendance> Attendance { get; set; }
        public DbSet<AppUser> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<Student>()
                .HasMany(ur => ur.Attendance)
                .WithOne(u => u.Student)
                .HasForeignKey(ur => ur.StudentId)
                .IsRequired();
        }

        }
}
