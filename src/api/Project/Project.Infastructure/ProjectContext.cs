using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Project.Domain.Model;
using Project.Domain.SeedWork;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Project.API.Infrastructure
{
    public class ProjectContext : DbContext, IUnitOfWork
    {
        private ProjectContext(DbContextOptions<ProjectContext> options) : base(options) { }
        public DbSet<Domain.Model.Project> Projects { get; set; }
        public DbSet<Category> ProjectCategories { get; set; }
        public DbSet<Status> ProjectStatuses { get; set; }

        private readonly IMediator _mediator;
        private IDbContextTransaction _currentTransaction;
        public IDbContextTransaction GetCurrentTransaction => _currentTransaction;
        public bool HasActiveTransaction => _currentTransaction != null;

        public ProjectContext(DbContextOptions<ProjectContext> options, IMediator mediator): base(options)
        {
            _mediator = mediator ?? throw new ArgumentException(nameof(mediator));

            System.Diagnostics.Debug.WriteLine("ProjectContext::ctor ->" + this.GetHashCode());
        }

        public async Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            await _mediator.DispatchDomainEventAsync(this);
            var result = await base.SaveChangesAsync();

            return true;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new ProjectEntityTypeConfiguration());
            builder.ApplyConfiguration(new ProjectStatusEntityTypeConfiguration());
            builder.ApplyConfiguration(new ProjectTypeEntityTypeConfiguration());
            builder.ApplyConfiguration(new ProjectCategoryEntityTypeConfiguration());
            
        }
    }
}
