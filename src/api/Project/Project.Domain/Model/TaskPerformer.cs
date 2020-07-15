using System;
using System.Collections.Generic;
using System.Linq;


namespace Project.Domain.Model
{
    public class TaskPerformer
    {
        public string UserId { get; private set; }
        public string FullName { get; private set; }
        public string Role { get; set; }
        public int TaskId { get; set; }
        public Task Task { get; set; }
        //public string UserPic { get; set; } // url

        public TaskPerformer(string userId, string fullName)
        {
            UserId = !string.IsNullOrWhiteSpace(userId) ? userId : throw new ArgumentNullException(nameof(userId));
            FullName = !string.IsNullOrWhiteSpace(fullName) ? fullName : throw new ArgumentNullException(nameof(fullName));
        }
    }
}
