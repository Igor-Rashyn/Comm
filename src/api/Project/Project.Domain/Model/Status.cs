using Project.Domain.Exceptions;
using Project.Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Project.Domain.Model
{
    public class Status : Enumeration
    {
        public static Status Draft = new Status(1, nameof(Draft).ToLowerInvariant());
        public static Status Active = new Status(2, nameof(Active).ToLowerInvariant());
        public static Status Close = new Status(3, nameof(Close).ToLowerInvariant());

        protected Status()
        {
        }

        public Status(int id, string name): base(id, name) { }

        public static IEnumerable<Status> List() => new[] { Draft, Active, Close };

        public static Status FromName(string name)
        {
            var status = List().SingleOrDefault(s => String.Equals(s.Name, name, StringComparison.CurrentCultureIgnoreCase));

            if (status == null)
                throw new ProjectDomainException($"ProjectStatus values: {String.Join(",", List().Select(s => s.Name))}");

            return status;
        }

        public static Status From(int id)
        {
            var status = List().SingleOrDefault(s => s.Id == id);

            if (status == null)
                throw new ProjectDomainException($"ProjectStatus values: {String.Join(",", List().Select(s => s.Name))}");

            return status;
        }
    }
}
