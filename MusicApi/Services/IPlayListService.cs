using MusicProjectShared.Entities;

namespace MusicApi.Services
{
    public interface IPlayListService
    {
        Task<List<PlayList>> GetListPlaylistAsync();
        Task<PlayList> GetPlayListAsync(int id);
        Task AddPlayListAsync(PlayList playList);
        Task DeletePlayListAsync(int id);
        Task UpdatePlayListAsync(PlayList playList);
        Task AddMusicToPlaylist(int PlaylistId, int MusicId);
        Task RemoveMusicToPlaylist(int PlaylistId, int MusicId);
    }
}
