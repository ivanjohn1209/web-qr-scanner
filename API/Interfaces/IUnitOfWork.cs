namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IAttendanceRepository AttendanceRepository { get; }
        IStudentsRepository StudentsRepository { get; }
        IUserRepository UserRepository { get; }

        Task<bool> Complete();
        bool HasChanges();
    }
}
