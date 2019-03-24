using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Project.API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.API.Infrastructure.EntityConfigurations
{
    public class ProjectStatusEntityTypeConfiguration : IEntityTypeConfiguration<ProjectStatus>
    {
        public void Configure(EntityTypeBuilder<ProjectStatus> builder)
        {
            builder.ToTable("ProjectStatus");

            builder.HasKey(ps => ps.Id);

            builder.Property(ps => ps.Id)
                .ForSqlServerUseSequenceHiLo("project_status_hilo")
                .IsRequired();

            builder.Property(ps => ps.Name)
                .IsRequired()
                .HasMaxLength(50);         
        }

    }
}
