using Project.Domain.Exceptions;
using Project.Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project.Domain.Model
{
    public class Member : Entity
    {
        public string IdentityGuid { get; private set; }
        public string Name { get; private set; }
        public string? Avatar { get; private set; }

        protected Member() { }

        public Member(string identity, string name, string? image): this()
        {
            IdentityGuid = !string.IsNullOrWhiteSpace(identity) ? identity : throw new ProjectDomainException(nameof(identity));
            Name = !string.IsNullOrWhiteSpace(name) ? name : throw new ProjectDomainException(nameof(name));
            Avatar = image;
        }

        //TODO: add roles or functionality 
    }
}
