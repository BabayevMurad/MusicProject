// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FaHeart, FaRegHeart } from "react-icons/fa";

// function MusicPage() {
//   const [musics, setMusics] = useState([]);
//   const [playlists, setPlaylists] = useState([]);
//   const [selectedMusicId, setSelectedMusicId] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const [likeCounts, setLikeCounts] = useState({});
//   const [userLikes, setUserLikes] = useState({});

//   const userId = localStorage.getItem("user_id") || "guest";

//   // LocalStorage açarları
//   const userLikesStorageKey = "userLikes";
//   const likeCountsStorageKey = "likeCounts";

//   useEffect(() => {
//     const fetchMusics = async () => {
//       const response = await axios.get("https://localhost:7243/music/list");
//       setMusics(response.data);

//       // İlk dəfə backenddən gələn likeCount-ları yüklə
//       let counts = {};
//       response.data.forEach((m) => {
//         counts[m.id] = m.likeCount || 0;
//       });

//       // LocalStorage-dan likeCounts varsa onu override et
//       const storedLikeCounts = JSON.parse(localStorage.getItem(likeCountsStorageKey));
//       if (storedLikeCounts) {
//         counts = { ...counts, ...storedLikeCounts };
//       }

//       setLikeCounts(counts);
//     };

//     const fetchPlaylists = async () => {
//       const res = await axios.get("https://localhost:7243/playlist/list");
//       setPlaylists(res.data);
//     };

//     // LocalStorage-dan userLikes yüklə
//     const fetchUserLikesFromStorage = () => {
//       const stored = JSON.parse(localStorage.getItem(userLikesStorageKey)) || {};
//       setUserLikes(stored);
//     };

//     fetchMusics();
//     fetchPlaylists();
//     fetchUserLikesFromStorage();
//   }, []);

//   const toggleLike = async (musicId) => {
//     const currentUserLikes = userLikes[userId] || [];
//     const isLiked = currentUserLikes.includes(musicId);

//     const url = isLiked
//       ? `https://localhost:7243/music/unlike/${musicId}/${userId}`
//       : `https://localhost:7243/music/like/${musicId}/${userId}`;

//     try {
//       // Backend-dən updated likeCount-u alırıq
//       const response = await axios.post(url);
//       const updatedLikeCount = response.data.likeCount;

//       // likeCounts state və localStorage update
//       setLikeCounts((prev) => {
//         const updated = { ...prev, [musicId]: updatedLikeCount };
//         localStorage.setItem(likeCountsStorageKey, JSON.stringify(updated));
//         return updated;
//       });

//       // userLikes update və localStorage update
//       const updatedLikes = isLiked
//         ? currentUserLikes.filter((id) => id !== musicId)
//         : [...currentUserLikes, musicId];

//       const updatedUserLikes = { ...userLikes, [userId]: updatedLikes };
//       setUserLikes(updatedUserLikes);
//       localStorage.setItem(userLikesStorageKey, JSON.stringify(updatedUserLikes));
//     } catch (error) {
//       alert("Xəta baş verdi.");
//     }
//   };

//   // Qalan kod eynidir (render və s.)

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       {/* header və loading hissələri */}
//       {musics.length === 0 ? (
//         <div className="text-center text-gray-500">Yüklənir və ya siyahı boşdur...</div>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2">
//           {musics.map((music) => (
//             <div key={music.id} className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 relative hover:shadow-indigo-300 transition-shadow">
//               <h2 className="text-2xl font-semibold text-gray-900 mb-4">{music.name}</h2>

//               {music.posterUrl && (
//                 <img
//                   src={`https://localhost:7077${music.posterUrl}`}
//                   alt="poster"
//                   className="mb-5 rounded-lg object-cover w-full max-h-64 shadow-sm"
//                 />
//               )}

//               {music.musicUrl && (
//                 <audio controls className="w-full mb-4 rounded">
//                   <source src={`https://localhost:7077${music.musicUrl}`} type="audio/mpeg" />
//                   Sizin brauzer audio elementini dəstəkləmir.
//                 </audio>
//               )}

//               <div className="mt-4 flex items-center gap-4">
//                 <button
//                   onClick={() => toggleLike(music.id)}
//                   className={`text-2xl transition-transform duration-150 ${
//                     userLikes[userId]?.includes(music.id) ? "text-red-600" : "text-gray-400"
//                   } hover:scale-110 hover:text-red-700`}
//                   aria-label={userLikes[userId]?.includes(music.id) ? "Dislike" : "Like"}
//                 >
//                   {userLikes[userId]?.includes(music.id) ? <FaHeart /> : <FaRegHeart />}
//                 </button>

//                 <span className="text-gray-700 font-medium">
//                   {likeCounts[music.id] || 0} {likeCounts[music.id] === 1 ? "like" : "likes"}
//                 </span>

//                 {/* playlist və digər düymələr */}
//               </div>

//               {/* Playlist dropdown */}
//               {showDropdown && selectedMusicId === music.id && (
//                 <div className="mt-3 border border-indigo-300 p-4 rounded-lg shadow-lg bg-white relative z-10">
//                   {/* close button, playlist seçimi */}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default MusicPage;
