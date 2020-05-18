using Comment.API.Infrastructure.EntityConfigurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Comment.API.Infrastructure
{
    public class CommentContext : DbContext
    {
        public CommentContext(DbContextOptions<CommentContext> options) : base(options) { }

        public DbSet<Model.CommentItem> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new CommentEntityTypeConfiguration());
        }

        public class CommentContextDesignFactory : IDesignTimeDbContextFactory<CommentContext> 
        {
            public CommentContext CreateDbContext(string [] args)
            {
                var optionsBuilder = new DbContextOptionsBuilder<CommentContext>()
                    .UseSqlServer("Server=.;Initial catalog=CommentDb;Integrated Security=true");

                return new CommentContext(optionsBuilder.Options);
            }
        }
    }
}
