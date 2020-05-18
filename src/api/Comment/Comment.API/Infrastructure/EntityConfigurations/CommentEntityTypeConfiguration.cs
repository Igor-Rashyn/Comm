using Comment.API.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Comment.API.Infrastructure.EntityConfigurations
{
    public class CommentEntityTypeConfiguration : IEntityTypeConfiguration<CommentItem>
    {
        public void Configure(EntityTypeBuilder<CommentItem> builder)
        {
            builder.ToTable("Comment");

            builder.Property(ct => ct.Id)
                .ForSqlServerUseSequenceHiLo("comment_hilo")
                .IsRequired();

            builder.Property(ct => ct.PictureFileName)
                .IsRequired(false);

            builder.Ignore(ct => ct.PictureUri);              

            builder.Property(ct => ct.UserId)
                .IsRequired(true);

            builder.Property(ct => ct.EntityType)
                .IsRequired(true);

            builder.Property(ct => ct.EntityId)
                .IsRequired(true);

            builder.HasOne(ct => ct.Parent)
                .WithMany()
                .HasForeignKey(ct => ct.ParentId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired(false);
        }
    }
}
