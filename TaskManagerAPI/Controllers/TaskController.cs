using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Data;
using TaskManagerAPI.Dtos;
using TaskManagerAPI.Entities;

namespace TaskManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController(DataContext context, IMapper mapper) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTask(TaskDto taskDto)
        {
            var task = mapper.Map<TaskEntity>(taskDto);

            await context.Tasks.AddAsync(task);

            if (await context.SaveChangesAsync() > 0) return Ok(taskDto);

            return BadRequest("Cannot Add task currently");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> GetTask(int id)
        {
            var task = await context.Tasks.FindAsync(id);

            if (task == null) return BadRequest("Task not Found");

            return Ok(task);
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Task>>> GetAllTask()
        {
            var tasks = await context.Tasks.ToListAsync();

            return Ok(tasks);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteTask(int id)
        {
            var task = await context.Tasks.FindAsync(id);

            if (task == null) return BadRequest("Cannot find task");

            context.Tasks.Remove(task);

            if (await context.SaveChangesAsync() > 0) return NoContent();

            return BadRequest("Failed to Delete task");
        }

        [HttpPut("edit/{id}")]
        public async Task<ActionResult<TaskDto>> UpdateTask(int id, TaskDto taskDto)
        {

            var task = await context.Tasks.FindAsync(id);

            if (task == null) return BadRequest("Cannot find task");

            mapper.Map(taskDto, task);

            if (await context.SaveChangesAsync() > 0) return Ok(taskDto);

            return BadRequest("Failed to update");
        }

        [HttpPut("markcomplete/{id}")]
        public async Task<ActionResult> ToggleComplete(int id)
        {

            var task = await context.Tasks.FindAsync(id);
            if (task == null) return BadRequest("Cannot find task");

            if (!task.IsCompleted)
            {
                task.IsCompleted = true;
            }

            if (await context.SaveChangesAsync() > 0) return NoContent();

            return BadRequest("Failed to update");
        }
    }
}