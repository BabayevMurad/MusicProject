namespace MusicProjectShared.Entities
{
    public class Like
    {
        public int Id { get; set; }
        public int LikeCount { get; set; }
        public int MusicId { get; set; }
        public virtual Music? Music { get; set; }
        public virtual List<User>? Users { get; set; }
    }
}
