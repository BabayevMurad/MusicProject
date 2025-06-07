namespace MusicProjectShared.Entities.Dto_s
{
    public class PlayListChangeDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public List<Music>? Musics { get; set; }
    }
}
