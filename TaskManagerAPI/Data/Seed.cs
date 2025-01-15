using System;
using System.Text.Json;
using TaskManagerAPI.Entities;

namespace TaskManagerAPI.Data;

public class Seed
{
    public static async Task SeedData(DataContext context)
    {
        var data = await File.ReadAllTextAsync("Data/TaskData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var tasks = JsonSerializer.Deserialize<List<TaskEntity>>(data, options);

        if (tasks == null) return;

        foreach (var task in tasks)
        {
            await context.Tasks.AddAsync(task);
        }

        await context.SaveChangesAsync();
    }
}
