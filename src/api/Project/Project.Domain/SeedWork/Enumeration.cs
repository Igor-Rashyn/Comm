using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Project.Domain.SeedWork
{
    public abstract class Enumeration : IComparable
    {
        public string Name { get; private set; }
        public int Id { get; private set; }

        protected Enumeration() { }

        protected Enumeration(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public override string ToString() => Name;

        public static IEnumerable<T> GetAll<T>() where T: Enumeration
        {
            var fields = typeof(T).GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.DeclaredOnly);
            return fields.Select(fields => fields.GetValue(null)).Cast<T>();
        }

        public override bool Equals(object obj)
        {
            var otherValue = obj as Enumeration;

            if (otherValue == null)
                return false;

            var typeMatches = GetType().Equals(obj.GetType());
            var valueMatches = Id.Equals(otherValue.Id);

            return typeMatches && valueMatches;
        }

        public override int GetHashCode() => Id.GetHashCode();

        public static T FromId<T>(int id) where T : Enumeration
        {
            return Parse<T, int>(id, "id", item => item.Id == id);
        }

        public static T FromName<T>(string name) where T: Enumeration
        {
            return Parse<T, string>(name, "name", item => item.Name == name);
        }

        private static T Parse<T, T1>(T1 value, string description, Func<T, bool> predicate) where T : Enumeration
        {
            var item = GetAll<T>().FirstOrDefault(predicate);

            if (item == null)
                throw new InvalidOperationException($"'{value}' is not a valid {description} in {typeof(T)}");
            return item;
        }

        public int CompareTo(object obj) => Id.CompareTo(((Enumeration)obj).Id);
    }
}
