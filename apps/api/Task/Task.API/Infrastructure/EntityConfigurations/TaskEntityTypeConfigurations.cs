using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Task.API.Infrastructure.EntityConfigurations
{
    public class TaskEntityTypeConfigurations : IEntityTypeConfiguration<Model.Task>
    {
        public void Configure(EntityTypeBuilder<Model.Task> builder)
        {
            builder.ToTable("Task");

            builder.Property(t => t.Id)
                .ForSqlServerUseSequenceHiLo("taskseq")
                .IsRequired();

            builder.Property(t => t.Created)
                .HasDefaultValueSql("CONVER(date, GETDATE())");

            builder.Property(t => t.Updated)
                .ValueGeneratedOnAddOrUpdate();

            builder.Property(t => t.Updated)
                .Metadata.AfterSaveBehavior = Microsoft.EntityFrameworkCore.Metadata.PropertySaveBehavior.Ignore;

            builder.Property(t => t.Title)
                .HasMaxLength(90);

            builder.Property(t => t.Description)
                .HasMaxLength(500);

            builder.HasOne(t => t.Status)
                .WithMany()
                .HasForeignKey(t => t.TaskStatusId);

            var navigation = builder.Metadata.FindNavigation(nameof(Model.Task.TaskPerformers));
            navigation.SetPropertyAccessMode(PropertyAccessMode.Field);

         //   builder.HasMany(t => t.TaskPerformers)
         //.WithOne(p => p.Task)
         //.HasForeignKey(p => p.TaskId)
         //.IsRequired();

        }

    }
}
