namespace TodoApi.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string Task { get; set; } = string.Empty;
        public bool IsDone { get; set; } = false;
    }
}
