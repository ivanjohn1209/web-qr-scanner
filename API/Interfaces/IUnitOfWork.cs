namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IAttendanceRepository AttendanceRepository { get; }
        IStudentsRepository StudentsRepository { get; }

        Task<bool> Complete();
        bool HasChanges();
    }
}
