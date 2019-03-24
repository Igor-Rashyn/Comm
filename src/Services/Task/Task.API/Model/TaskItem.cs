using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Task.API.Model
{
    public class TaskItem
    {
        public int Id { get; set; }
        public TaskStatus Status { get; set; }
        public string Title { get; set; }
        public string Description { get; set; } // или блоб буду хранить rich text editor
        //public IEnumerable<User> Performers { get; set; }
        //public Project Project { get; set; }
        //public IEnumerable<Comment> Comments { get; set; }
    }
}
