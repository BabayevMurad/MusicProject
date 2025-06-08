import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Upload from "./Upload";
 
const fixUrl = (url) => {
  if (!url) return "";
  return url.toLowerCase().startsWith("/uploads/")
    ? `https://localhost:7077${url}`
    : url;
};
 
function MusicPage() {
  const [musics, setMusics] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const userId = localStorage.getItem("user_id") || "guest";
 
  const likeCountsStorageKey = "likeCounts";
  const userLikesStorageKey = "userLikes";
 
  const fetchMusics = async () => {
    const response = await axios.get("https://localhost:7243/music/list");
    setMusics(response.data);
 
    let counts = {};
    response.data.forEach((m) => {
      counts[m.id] = m.likeCount || 0;
    });
 
    const stored = JSON.parse(localStorage.getItem(likeCountsStorageKey));
    if (stored) counts = { ...counts, ...stored };
 
    setLikeCounts(counts);
  };
 
  useEffect(() => {
    fetchMusics();
 
    const storedLikes = JSON.parse(localStorage.getItem(userLikesStorageKey)) || {};
    setUserLikes(storedLikes);
  }, []);
 
  const toggleLike = async (musicId) => {
    const currentLikes = userLikes[userId] || [];
    const isLiked = currentLikes.includes(musicId);
 
    const url = isLiked
      ? `https://localhost:7243/music/unlike/${musicId}/${userId}`
      : `https://localhost:7243/music/like/${musicId}/${userId}`;
 
    try {
      const res = await axios.post(url);
      const updatedLikeCount = res.data.likeCount;
 
      setLikeCounts((prev) => {
        const updated = { ...prev, [musicId]: updatedLikeCount };
        localStorage.setItem(likeCountsStorageKey, JSON.stringify(updated));
        return updated;
      });
 
      const updatedLikes = isLiked
        ? currentLikes.filter((id) => id !== musicId)
        : [...currentLikes, musicId];
 
      const updatedUserLikes = { ...userLikes, [userId]: updatedLikes };
      setUserLikes(updatedUserLikes);
      localStorage.setItem(userLikesStorageKey, JSON.stringify(updatedUserLikes));
    } catch {
      alert("Xəta baş verdi.");
    }
  };
 
  return (
<div className="max-w-4xl mx-auto px-4 py-8">
<h1 className="text-3xl font-bold mb-6 text-center">🎵 Musiqi Siyahısı</h1>
 
      {musics.length === 0 ? (
<div className="text-center text-gray-500">Yüklənir və ya siyahı boşdur...</div>
      ) : (
<div className="grid gap-6 md:grid-cols-2">
          {musics.map((music) => (
<div key={music.id} className="bg-white shadow-lg rounded-xl p-5 border border-gray-200">
<h2 className="text-xl font-semibold text-gray-800 mb-3">{music.name}</h2>
 
              {music.posterUrl && (
<img
                  src={fixUrl(music.posterUrl)}
                  alt="poster"
                  onError={(e) => (e.target.style.display = "none")}
                  className="mb-4 rounded object-cover w-full max-h-60"
                />
              )}
 
              {music.musicUrl && (
<audio controls className="w-full mb-4">
<source src={fixUrl(music.musicUrl)} type="audio/mpeg" />
</audio>
              )}
 
              <div className="flex items-center gap-3">
<button
                  onClick={() => toggleLike(music.id)}
                  className={`text-2xl transition-transform duration-150 ${
                    userLikes[userId]?.includes(music.id) ? "text-red-600" : "text-gray-400"
                  } hover:scale-110`}
>
                  {userLikes[userId]?.includes(music.id) ? <FaHeart /> : <FaRegHeart />}
</button>
<span className="text-sm text-gray-600">
                  {likeCounts[music.id] || 0} like
</span>
</div>
</div>
          ))}
</div>
      )}
 
      {/* Upload formu alt hissədə */}
<Upload onUploadSuccess={fetchMusics} />
</div>
  );
}
 
export default MusicPage;