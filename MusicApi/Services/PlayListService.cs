using Microsoft.EntityFrameworkCore;
using MusicProjectShared.Data;
using MusicProjectShared.Entities;

namespace MusicApi.Services
{
    public class PlayListService : IPlayListService
    {
        private readonly MusicDbContext _context;

        public PlayListService(MusicDbContext context)
        {
            _context = context;
        }

        public async Task AddPlayListAsync(PlayList playList)
        {
            await _context.PlayLists.AddAsync(playList);

            await _context.SaveChangesAsync();
        }

        public async Task DeletePlayListAsync(int id)
        {
            var playlist = await _context.PlayLists.FirstOrDefaultAsync(p => p.Id == id);

            _context.PlayLists.Remove(playlist!);

            await _context.SaveChangesAsync();
        }

        public async Task<List<PlayList>> GetListPlaylistAsync()
        {
            return await _context.PlayLists.ToListAsync();
        }

        public async Task<PlayList> GetPlayListAsync(int id)
        {
            return await _context.PlayLists.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task UpdatePlayListAsync(PlayList playList)
        {
            _context.PlayLists.Update(playList);
            await _context.SaveChangesAsync();
        }

        public async Task AddMusicToPlaylist(int PlaylistId, int MusicId)
        {
            var playlist = await _context.PlayLists.Include(p => p.Musics)
                .FirstOrDefaultAsync(p => p.Id == PlaylistId);
            if (playlist != null)
            {
                var music = await _context.Musics.FindAsync(MusicId);
                if (music != null && !playlist.Musics.Contains(music))
                {
                    playlist.Musics.Add(music);
                    await _context.SaveChangesAsync();
                }
            }
        }

        public async Task RemoveMusicToPlaylist(int PlaylistId, int MusicId)
        {
            var playlist = await _context.PlayLists.Include(p => p.Musics)
                .FirstOrDefaultAsync(p => p.Id == PlaylistId);
            if (playlist != null)
            {
                var music = await _context.Musics.FindAsync(MusicId);
                if (music != null && !playlist.Musics.Contains(music))
                {
                    playlist.Musics.Remove(music);
                    await _context.SaveChangesAsync();
                }
            }
        }
    }
}
