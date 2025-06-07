using Microsoft.AspNetCore.Mvc;
using MusicApi.Services;
using MusicProjectShared.Entities;
using MusicProjectShared.Entities.Dto_s;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MusicApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayListController : ControllerBase
    {
        private readonly IPlayListService _playList;

        public PlayListController(IPlayListService playList)
        {
            _playList = playList;
        }

        [HttpGet("GetListPlaylist")]
        public async Task<List<PlayList>> GetListPlaylist()
        {
            return await _playList.GetListPlaylistAsync();
        }

        [HttpGet("GetPlayList/{id}")]
        public async Task<PlayList> GetPlayList(int id)
        {
            return await _playList.GetPlayListAsync(id);
        }

        // POST api/<PlayListController>
        [HttpPost("AddPlayListq")]
        public async Task AddPlayList([FromBody] PlayListAddDto playListAdd)
        {
            var playList = new PlayList
            {
                Name = playListAdd.Name,
                UserId = playListAdd.UserId,

            };

            await _playList.AddPlayListAsync(playList);
        }

        // PUT api/<PlayListController>/5
        [HttpPut("PlayListChange/{id}")]
        public async Task PlayListChange(int id, [FromBody] PlayListChangeDto playListChange)
        {
            await _playList.UpdatePlayListAsync(new PlayList
            {
                UserId = playListChange.UserId,
                Name = playListChange.Name,
                Musics = playListChange.Musics
            });
        }

        // DELETE api/<PlayListController>/5
        [HttpDelete("DeletePlaylist/{id}")]
        public async Task DeletePlaylist(int id)
        {
            await _playList.DeletePlayListAsync(id);
        }

        [HttpPost("AddMusicToPlaylist")]
        public async Task AddMusicToPlaylist([FromBody] AddMusicDto addMusic)
        {
            await _playList.AddMusicToPlaylist(addMusic.PlaylistId, addMusic.MusicId);
        }

        [HttpDelete("RemoveMusicToPlaylist")]
        public async Task RemoveMusicToPlaylist([FromBody] AddMusicDto addMusic)
        {
            await _playList.RemoveMusicToPlaylist(addMusic.PlaylistId, addMusic.MusicId);
        }
    }
}
