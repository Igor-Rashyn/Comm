using System;
using System.Collections.Generic;
using System.Text;

namespace Project.Domain.Model
{
    //TODO: move to separate API. Add self link
    public class Comment
    {
        public int Id { get; private set; }
        public string CreatedBy { get; private set; }
        public string Message { get; private set; }
        public DateTime CreatedAt {get; private set; }
        public Post Update { get; private set; }

        protected Comment()
        {
            CreatedAt = DateTime.Now;
        }

        public Comment(string userId, string message, Post update)
        {
            Message = message;
            CreatedBy = userId;
            Update = update;
        }
    }
}
