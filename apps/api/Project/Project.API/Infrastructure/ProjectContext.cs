using Microsoft.EntityFrameworkCore;
using Project.API.Infrastructure.EntityConfigurations;
using Project.API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.API.Infrastructure
{
    public class ProjectContext : DbContext
    {
        public ProjectContext(DbContextOptions<ProjectContext> options) : base(options) { }
        public DbSet<Model.Project> ProjectItems { get; set; }
        public DbSet<ProjectCategory> ProjectCategories { get; set; }
        public DbSet<ProjectStatus> ProjectStatuses { get; set; }
        public DbSet<ProjectType> ProjectTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new ProjectEntityTypeConfiguration());
            builder.ApplyConfiguration(new ProjectStatusEntityTypeConfiguration());
            builder.ApplyConfiguration(new ProjectTypeEntityTypeConfiguration());
            builder.ApplyConfiguration(new ProjectCategoryEntityTypeConfiguration());
            
        }
    }
}
