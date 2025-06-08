using Microsoft.AspNetCore.Http;


namespace MusicProjectShared.Entities.Dto_s
{
    public class UploadDto
    {
        public string Name { get; set; }
        public IFormFile Poster { get; set; }
        public IFormFile Music { get; set; }

    }
}
