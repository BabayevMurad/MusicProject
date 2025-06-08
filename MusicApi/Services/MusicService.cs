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
            var like = await _context.Likes.AddAsync(new Like
            {
                LikeCount = 0,
                Users = new List<User>()
            });

            await _context.SaveChangesAsync();

            var newMusic = new Music
            {
                Name = music.Name,
                PosterUrl = music.PosterUrl,
                MusicUrl = music.MusicUrl,
                UserId = music.UserId,
                LikeId = like.Entity.Id,
                Like = like.Entity,
            };

            var musicReturn = await _context.Musics.AddAsync(newMusic);
            
            await _context.SaveChangesAsync();

            var likeChange =  await _context.Likes.FirstOrDefaultAsync(l => l.Id == like.Entity.Id);

            await _context.SaveChangesAsync();

            likeChange.MusicId = musicReturn.Entity.Id;
            likeChange.Music = musicReturn.Entity;

            await _context.SaveChangesAsync();
        }

        public async Task<bool> LikeMusic(int id, int userId)
        {
            var music = await _context.Musics
                .Include(m => m.Like)
                .ThenInclude(l => l.Users)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (music == null)
                throw new Exception("Music not found.");

            if (music.Like == null)
                throw new Exception("Like data not initialized for this music.");

            var like = music.Like;

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
                throw new Exception("User not found.");

            if (like.Users?.Any(u => u.Id == userId) == true)
                return false;

            like.Users ??= new List<User>();
            like.Users.Add(user);

            like.LikeCount = like.Users.Count;

            music.LikeCount = like.LikeCount;

            await _context.SaveChangesAsync();

            return true;
        }


        public async Task DeleteMusicAsync(int id)
        {
            var music = await _context.Musics
                .Include(m => m.PlayLists)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (music != null)
            {
                music.PlayLists?.Clear();

                _context.Musics.Remove(music);

                await _context.SaveChangesAsync();
            }
        }

        public async Task<Music> GetMusic(int id)
        {
            return await _context.Musics.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<List<Music>> GetMusicList()
        {
            return await _context.Musics.ToListAsync();
        }

        public async Task<bool> UnlikeMusic(int musicId, int userId)
        {
            var music = await _context.Musics
                .Include(m => m.Like)
                .ThenInclude(l => l!.Users)
                .FirstOrDefaultAsync(m => m.Id == musicId);

            if (music == null)
                throw new Exception("Music not found.");

            if (music.Like == null)
                throw new Exception("Like entity is missing for this music.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
                throw new Exception("User not found.");

            var like = music.Like;

            if (like.Users == null || !like.Users.Any(u => u.Id == userId))
                return false;

            var userToRemove = like.Users.FirstOrDefault(u => u.Id == userId);
            like.Users.Remove(userToRemove);

            like.LikeCount = like.Users.Count;

            await _context.SaveChangesAsync();

            return true;
        }

    }
}
