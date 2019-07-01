using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Project.API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.API.Infrastructure.EntityConfigurations
{
    public class ProjectEntityTypeConfiguration : IEntityTypeConfiguration<Model.Project>
    {
        public void Configure(EntityTypeBuilder<Model.Project> builder)
        {
            builder.ToTable("Project");

            builder.Property(p => p.Id)
                .ForSqlServerUseSequenceHiLo("project_hilo")
                .IsRequired();

            builder.Property(p => p.Created)
                .HasDefaultValueSql("CONVER(date, GETDATE())");

            builder.Property(p => p.Updated)
                .ValueGeneratedOnAddOrUpdate();

            builder.Property(p => p.Updated)
                .Metadata.AfterSaveBehavior = Microsoft.EntityFrameworkCore.Metadata.PropertySaveBehavior.Ignore;

            builder.Property(p => p.Title)
                .HasMaxLength(60);

            builder.Property(p => p.Subtitle)
                .HasMaxLength(135);

            builder.HasOne(p => p.ProjectStatus)
                .WithMany()
                .HasForeignKey(p => p.ProjectStatusId);

            builder.HasOne(p => p.ProjectType)
                .WithMany()
                .HasForeignKey(p => p.ProjectTypeId);

            builder.HasOne(p => p.ProjectCategory)
                .WithMany()
                .HasForeignKey(p => p.ProjectCategoryId);
        }

    }
}
