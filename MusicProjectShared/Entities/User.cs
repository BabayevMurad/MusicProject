namespace MusicProjectShared.Entities
{
    public class User
    {
        public int Id { get; set; }
        #pragma warning disable CS8618
        public string Username { get; set; }

        #pragma warning restore CS8618
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public virtual List<Music> Musics { get; set; }
        public virtual List<PlayList> PlayLists { get; set; }
    }
}
