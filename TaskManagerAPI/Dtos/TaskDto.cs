using System;

namespace TaskManagerAPI.Dtos;

public class TaskDto
{
    public required string Title { get; set; }
    public required string Description { get; set; }
    public bool IsCompleted { get; set; }
}

