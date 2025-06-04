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
    }
}
