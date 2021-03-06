﻿
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.API.Infrastructure.EntityConfigurations
{
    public class ProjectCategoryEntityTypeConfiguration : IEntityTypeConfiguration<ProjectCategory>
    {
        public void Configure(EntityTypeBuilder<ProjectCategory> builder)
        {
            builder.ToTable("ProjectCategory");

            builder.HasKey(ps => ps.Id);

            builder.Property(ps => ps.Id)
                .ForSqlServerUseSequenceHiLo("project_category_hilo")
                .IsRequired();

            builder.Property(ps => ps.Name)
                .IsRequired()
                .HasMaxLength(50);         
        }

    }
}
