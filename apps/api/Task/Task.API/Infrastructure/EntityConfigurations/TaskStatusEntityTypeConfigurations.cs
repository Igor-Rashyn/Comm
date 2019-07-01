using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Task.API.Model;

namespace Task.API.Infrastructure.EntityConfigurations
{
    public class TaskStatusEntityTypeConfigurations : IEntityTypeConfiguration<TaskStatus>
    { 
        public void Configure(EntityTypeBuilder<TaskStatus> builder)
        {
            builder.ToTable("TaskStatus");

            builder.HasKey(ts => ts.Id);

            builder.Property(ts => ts.Id)
                .ForSqlServerUseSequenceHiLo("project_status_hilo")
                .IsRequired();

            builder.Property(ts => ts.Name)
                .IsRequired()
                .HasMaxLength(50);
        }

    }
}
