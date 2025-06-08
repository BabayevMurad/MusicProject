using Microsoft.AspNetCore.Mvc;
using MusicApi.Services;
using MusicProjectShared.Entities;
using MusicProjectShared.Entities.Dto_s;

namespace MusicApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusicController : ControllerBase
    {

        private readonly IMusicService _musicService;

        public MusicController(IMusicService musicService)
        {
            _musicService = musicService;
        }

        [HttpGet("GetMusicList")]   
        public async Task<List<Music>> GetMusicList()
        {
            return await _musicService.GetMusicList();
        }

        [HttpGet("GetMusic/{id}")]
        public async Task<Music> GetMusic(int id)
        {
            return await _musicService.GetMusic(id);
        }

        [HttpPost("AddMusic")]
        public async Task AddMusic([FromBody] MusicAddDto musicAdd)
        {
            await _musicService.AddMusicAsync(musicAdd);
        }

        [HttpDelete("DeleteMusic/{id}")]
        public async Task Delete(int id)
        {
            await _musicService.DeleteMusicAsync(id);
        }

        [HttpPost("LikeMusic/{id}/{userId}")]
        public async Task<ActionResult> LikeMusic(int id, int userId)
        {
            var count =await _musicService.LikeMusic(id, userId);

            return Ok(new { likeCount = count });
        }

        [HttpPost("UnLikeMusic/{id}/{userId}")]
        public async Task<ActionResult> UnLikeMusic(int id, int userId)
        {
            var count = await _musicService.UnlikeMusic(id, userId);

            return Ok(new { likeCount = count });
        }

        //{
        //  "name": "Chill Pop Motivational",
        //  "posterUrl": "/Uploads/12-35-32-759_200x200.jpg",
        //  "musicUrl": "/Uploads/chill-pop-motivational-upbeat-250525.mp3",
        //  "userId": 1
        //}

        //{
        //  "name": "Eona Emotional Ambient Pop",
        //  "posterUrl": "/Uploads/18-04-45-226_200x200.jpg",
        //  "musicUrl": "/Uploads/eona-emotional-ambient-pop-351436.mp3",
        //  "userId": 2
        //}
    }
}
