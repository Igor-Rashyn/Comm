using System;

namespace Comment.API.Infrastructure.Exceptions
{
    public class CommentDomainException : Exception
    {
        public CommentDomainException() { }
        public CommentDomainException(string message) : base(message) { }
        public CommentDomainException(string message, Exception innerException) : base(message, innerException) { }
    }
}
