namespace TaskManagerAPI.Entities;

public class TaskEntity
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public bool IsCompleted { get; set; } = false;
}
