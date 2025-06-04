namespace MusicProjectShared.Entities
{
    public class PlayList
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public virtual List<Music>? Musics { get; set; }
    }
}
