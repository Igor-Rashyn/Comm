using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Project.API.Infrastructure.EntityConfigurations
{
    public class ProjectStatusEntityTypeConfiguration : IEntityTypeConfiguration<ProjectStatus>
    {
        public void Configure(EntityTypeBuilder<ProjectStatus> entity)
        {
            entity.ToTable("ProjectStatus");

            entity.HasKey(ps => ps.Id);

            entity.Property(ps => ps.Id)
                .ForSqlServerUseSequenceHiLo("project_status_hilo")
                .IsRequired();

            entity.Property(ps => ps.Name)
                .IsRequired()
                .HasMaxLength(50);         
        }

    }
}
