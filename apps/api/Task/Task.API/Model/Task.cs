using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Task.API.Model
{
    public class Task
    {
        public int Id { get; set; }
        public int TaskStatusId { get; set; }
        public TaskStatus Status { get; set; }
        public string Title { get; set; }
        public string Description { get; set; } // или блоб буду хранить rich text editor
        public string CreatorId { get; private set; }
        public int ProjectId { get; private set; }
        private readonly List<TaskPerformer> _taskPerformers;
        public IReadOnlyCollection<TaskPerformer> TaskPerformers => _taskPerformers;
        //public IEnumerable<Comment> Comments { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

        public Task(int projectId, string userId, string title) {
            CreatorId = !string.IsNullOrWhiteSpace(userId) ? userId : throw new ArgumentNullException(nameof(userId));
            ProjectId = projectId;
            Title = !string.IsNullOrWhiteSpace(title) ? title : throw new ArgumentNullException(nameof(title));
            _taskPerformers = new List<TaskPerformer>();
        }


        public void AddPerformer(string userId, string fullName)
        {
            var isPerformerAssigned = _taskPerformers.Where(p => p.UserId == userId);

            if (isPerformerAssigned != null)
            {
                throw new Exception();
            }
            else
            {
                var performer = new TaskPerformer(userId, fullName);
                _taskPerformers.Add(performer);
            }
        }

    }
}
