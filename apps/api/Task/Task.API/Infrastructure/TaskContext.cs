using Microsoft.EntityFrameworkCore;
using Task.API.Infrastructure.EntityConfigurations;

namespace Task.API.Infrastructure
{
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options) : base(options) { }
        public DbSet<Model.Task> Tasks { get; set; }
        public DbSet<Model.TaskStatus> TaskStatuses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new TaskEntityTypeConfigurations());
            builder.ApplyConfiguration(new TaskStatusEntityTypeConfigurations());
        }
    }
}


//https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/index