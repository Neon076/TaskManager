using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Entities;

namespace TaskManagerAPI.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public required DbSet<TaskEntity> Tasks { get; set; }
}
