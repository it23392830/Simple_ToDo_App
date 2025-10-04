using Microsoft.AspNetCore.Mvc;
using SimpleToDoApp.Models;

namespace SimpleToDoApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodosController : ControllerBase
    {
        private static List<TodoItem> todos = new()
        {
            new TodoItem { Id = 1, Task = "Sample Task 1", IsDone = false },
            new TodoItem { Id = 2, Task = "Sample Task 2", IsDone = true }
        };

        [HttpGet]
        public IActionResult Get() => Ok(todos);

        [HttpPost]
        public IActionResult Post([FromBody] string task)
        {
            var newTodo = new TodoItem { Id = todos.Count + 1, Task = task };
            todos.Add(newTodo);
            return Ok(newTodo);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] TodoItem updatedTodo)
        {
            var todo = todos.FirstOrDefault(t => t.Id == id);
            if (todo == null) return NotFound();
            
            todo.Task = updatedTodo.Task;
            todo.IsDone = updatedTodo.IsDone;
            return Ok(todo);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todo = todos.FirstOrDefault(t => t.Id == id);
            if (todo == null) return NotFound();
            todos.Remove(todo);
            return Ok();
        }
    }
}
