using Microsoft.EntityFrameworkCore;
using MusicProjectShared.Entities;

namespace MusicProjectShared.Data
{
    public class MusicDbContext : DbContext
    {
        public MusicDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Music> Musics { get; set; }
        public DbSet<PlayList> PlayLists { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Music -> User (cascade delete allowed)
            modelBuilder.Entity<Music>()
                .HasOne(m => m.User)
                .WithMany(u => u.Musics)
                .HasForeignKey(m => m.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // PlayList -> User (cascade delete allowed)
            modelBuilder.Entity<PlayList>()
                .HasOne(p => p.User)
                .WithMany(u => u.PlayLists)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Many-to-many PlayList <-> Music with Restrict delete behavior on FKs
            modelBuilder.Entity<PlayList>()
            .HasMany(p => p.Musics)
            .WithMany(m => m.PlayLists)
            .UsingEntity<Dictionary<string, object>>(
                "PlayListMusics",
                j => j
                    .HasOne<Music>()
                    .WithMany()
                    .HasForeignKey("MusicId")
                    .HasConstraintName("FK_PlayListMusics_Music_MusicId")
                    .OnDelete(DeleteBehavior.Restrict), // Music silinərkən qorunsun
                j => j
                    .HasOne<PlayList>()
                    .WithMany()
                    .HasForeignKey("PlayListId")
                    .HasConstraintName("FK_PlayListMusics_PlayList_PlayListId")
                    .OnDelete(DeleteBehavior.Cascade), // Playlist silinərkən əlaqələr silinsin
                j =>
                {
                    j.HasKey("PlayListId", "MusicId");
                    j.ToTable("PlayListMusics");
                }
            );
        }
    }
}
