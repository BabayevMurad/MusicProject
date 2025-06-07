using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MusicProjectShared.Data
{
    public class MusicDbContextFactory : IDesignTimeDbContextFactory<MusicDbContext>
    {
        public MusicDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<MusicDbContext>();

            optionsBuilder.UseSqlServer("Data Source=(localdb)\\ProjectModels;Initial Catalog=MusicProjectDb;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");

            return new MusicDbContext(optionsBuilder.Options);
        }
    }
}
