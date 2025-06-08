using MusicProjectShared.Entities;
using MusicProjectShared.Entities.Dto_s;

namespace MusicApi.Services
{
    public interface IMusicService
    {
        Task AddMusicAsync(MusicAddDto music);
        Task DeleteMusicAsync(int id);
        Task<Music> GetMusic(int id);
        Task<List<Music>> GetMusicList();
        Task<int> LikeMusic(int id, int userId);
        Task<int> UnlikeMusic(int musicId, int userId);
    }
}
