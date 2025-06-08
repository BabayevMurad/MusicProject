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
        public DbSet<Like> Likes { get; set; }

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

            // Many-to-many PlayList <-> Music
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
                        .OnDelete(DeleteBehavior.Restrict),
                    j => j
                        .HasOne<PlayList>()
                        .WithMany()
                        .HasForeignKey("PlayListId")
                        .HasConstraintName("FK_PlayListMusics_PlayList_PlayListId")
                        .OnDelete(DeleteBehavior.Cascade),
                    j =>
                    {
                        j.HasKey("PlayListId", "MusicId");
                        j.ToTable("PlayListMusics");
                    }
                );

            // One-to-one Music <-> Like (foreign key in Music)
            modelBuilder.Entity<Music>()
                .HasOne(m => m.Like)
                .WithOne(l => l.Music)
                .HasForeignKey<Music>(m => m.LikeId)
                .OnDelete(DeleteBehavior.Cascade); // Optional: adjust based on your use case

            // One-to-many Like <-> Users (if this means many users who liked the same music)
            modelBuilder.Entity<Like>()
                .HasMany(l => l.Users)
                .WithMany() // You can model this more specifically if needed
                .UsingEntity<Dictionary<string, object>>(
                    "UserLikes",
                    j => j
                        .HasOne<User>()
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade),
                    j => j
                        .HasOne<Like>()
                        .WithMany()
                        .HasForeignKey("LikeId")
                        .OnDelete(DeleteBehavior.Cascade),
                    j =>
                    {
                        j.HasKey("UserId", "LikeId");
                        j.ToTable("UserLikes");
                    }
                );
        }

    }
}
