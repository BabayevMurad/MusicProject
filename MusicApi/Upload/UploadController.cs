using Microsoft.AspNetCore.Mvc;
using MusicProjectShared.Entities.Dto_s;

namespace MusicApi.Upload
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Upload([FromForm] UploadDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name) || dto.Poster == null || dto.Music == null)
                return BadRequest("Məlumatlar natamamdır.");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads");
            Directory.CreateDirectory(uploadsFolder);

            var posterFileName = Guid.NewGuid() + Path.GetExtension(dto.Poster.FileName);
            var posterPath = Path.Combine(uploadsFolder, posterFileName);
            using (var stream = new FileStream(posterPath, FileMode.Create))
                await dto.Poster.CopyToAsync(stream);

            var musicFileName = Guid.NewGuid() + Path.GetExtension(dto.Music.FileName);
            var musicPath = Path.Combine(uploadsFolder, musicFileName);
            using (var stream = new FileStream(musicPath, FileMode.Create))
                await dto.Music.CopyToAsync(stream);

            var posterUrl = $"/Uploads/{posterFileName}";
            var musicUrl = $"/Uploads/{musicFileName}";

            // DB yazısı buraya əlavə edilə bilər

            return Ok(new
            {
                dto.Name,
                posterUrl,
                musicUrl
            });
        }
    }
}
