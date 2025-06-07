namespace MusicProjectShared.Entities
{
    public class Music
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PosterUrl { get; set; }
        public string MusicUrl { get; set; }
        public virtual User? User { get; set; }
        public int UserId { get; set; }
        public int LikeCount { get; set; }
        public virtual List<PlayList> PlayLists { get; set; }
    }
}
