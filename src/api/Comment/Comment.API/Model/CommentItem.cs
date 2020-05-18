using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Comment.API.Model
{
    public class CommentItem
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string UserId { get; set; }

        public string PictureFileName { get; set; }
        public string PictureUri { get; set; }
        public string EntityType { get; set; }
        public string EntityId { get; set; }
        public int? ParentId { get; set; }
        public virtual CommentItem Parent { get; set; }

        public CommentItem() { }
    }
}
