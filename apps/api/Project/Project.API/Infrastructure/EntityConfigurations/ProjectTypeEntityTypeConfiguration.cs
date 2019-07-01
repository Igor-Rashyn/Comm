using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Project.API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.API.Infrastructure.EntityConfigurations
{
    public class ProjectTypeEntityTypeConfiguration : IEntityTypeConfiguration<ProjectType>
    {
        public void Configure(EntityTypeBuilder<ProjectType> builder)
        {
            builder.ToTable("ProjectType");

            builder.HasKey(ps => ps.Id);

            builder.Property(ps => ps.Id)
                .ForSqlServerUseSequenceHiLo("project_type_hilo")
                .IsRequired();

            builder.Property(ps => ps.Name)
                .IsRequired()
                .HasMaxLength(50);         
        }

    }
}
