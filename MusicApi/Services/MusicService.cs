using Microsoft.EntityFrameworkCore;
using MusicProjectShared.Data;
using MusicProjectShared.Entities;
using MusicProjectShared.Entities.Dto_s;

namespace MusicApi.Services
{
    public class MusicService : IMusicService
    {
        private readonly MusicDbContext _context;

        public MusicService(MusicDbContext context)
        {
            _context = context;
        }

        public async Task AddMusicAsync(MusicAddDto music)
        {
            var newMusic = new Music
            {
                Name = music.Name,
                PosterUrl = music.PosterUrl,
                MusicUrl = music.MusicUrl
            };

            var musicReturn = await _context.Musics.AddAsync(newMusic);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteMusicAsync(int id)
        {
            var music = await _context.Musics.FirstOrDefaultAsync(m => m.Id == id);

            _context.Musics.Remove(music);

            await _context.SaveChangesAsync();
        }

        public async Task<Music> GetMusic(int id)
        {
            return await _context.Musics.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<List<Music>> GetMusicList()
        {
            return await _context.Musics.ToListAsync();
        }
    }
}
