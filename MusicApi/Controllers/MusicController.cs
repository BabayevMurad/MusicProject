using Microsoft.AspNetCore.Mvc;
using MusicApi.Services;
using MusicProjectShared.Entities;
using MusicProjectShared.Entities.Dto_s;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
    }
}
