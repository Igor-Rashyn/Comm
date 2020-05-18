using Project.Domain.Exceptions;
using Project.Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project.Domain.Model
{
    public class Post : Entity
    {
        public string Title { get; private set; }
        public string Note { get; private set; }
        public Member CreatedBy { get; private set; }
        private readonly List<string> _followers;
        public IReadOnlyCollection<string> Followers => _followers;
        public IList<Comment> Comments { get; private set; }


        protected Post() 
        {
            _followers = new List<string>();
            Comments = new List<Comment>();
        }


        public Post(Member member, string title, string note): this()
        {
            Title = title;
            CreatedBy = member;
            Note = note;
        }
        //Maybe change it to something more flexible. User can follow Project/Task/Update
        public bool Follow(string userId) 
        {
            if (String.IsNullOrWhiteSpace(userId))
                return false;
            _followers.Add(userId);
            return true;
               
        }

        public int GetFollowers() => _followers.Count;

        public void AddComment(string userId, string message)
        {
            if(String.IsNullOrWhiteSpace(userId))
                throw new ProjectDomainException(nameof(userId));
            if(String.IsNullOrWhiteSpace(message))
                throw new ProjectDomainException(nameof(message));
            //AddDomainEvent() //TODO: add event
            Comments.Add(new Comment(userId, message, this));
        }
    }
}
