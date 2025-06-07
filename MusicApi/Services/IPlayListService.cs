using MusicProjectShared.Entities;

namespace MusicApi.Services
{
    public interface IPlayListService
    {
        Task<List<PlayList>> GetListPlaylistAsync();
        Task<PlayList> GetPlayListAsync(int id);
        Task AddPlayListAsync(PlayList playList);
        Task DeletePlayListAsync(int id);
        Task<bool> UpdatePlayListNameAsync(int id, string newName);
        Task AddMusicToPlaylist(int PlaylistId, int MusicId);
        Task RemoveMusicToPlaylist(int PlaylistId, int MusicId);
        Task<List<Music>> GetMusicsByPlayList(int id);
        Task<List<PlayList>> GetPlayListsByUserId(int userId);
    }
}
