import { useEffect, useState } from "react";
import axios from "axios";
 
function MusicPage() {
    const [musics, setMusics] = useState([]);
 
    useEffect(() => {
        const fetchMusics = async () => {
            try {
                const response = await axios.get("https://localhost:7243/music/list");
                setMusics(response.data);
            } catch (error) {
                console.error("Musiqi siyahısı alınarkən xəta baş verdi:", error);
            }
        };
 
        fetchMusics();
    }, []);
 
    const handleAddToPlaylist = async (musicId) => {
        const playlistName = prompt("Yeni playlist adı:");
        const userId = localStorage.getItem("user_id");
 
        if (!playlistName || !userId) return;
 
        try {
            // Playlist yaradılır
            await axios.post("https://localhost:7243/playlist/add", {
                name: playlistName,
                userId: parseInt(userId),
            });
 
            // Mövcud playlistləri çək
            const listRes = await axios.get("https://localhost:7243/playlist/list");
            const created = listRes.data.find(p => p.name === playlistName);
 
            if (!created) {
                alert("Playlist tapılmadı");
                return;
            }
 
            // Musiqini əlavə et
            await axios.put(`https://localhost:7243/playlist/update/${created.id}`, {
                userId: created.userId,
                name: created.name,
                musics: [musicId],
            });
 
            alert("Musiqi əlavə olundu!");
        } catch (err) {
            console.error("Əlavə xətası:", err);
            alert("Əlavə uğursuz oldu.");
        }
    };
 
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">🎵 Musiqi Siyahısı</h1>
 
            {musics.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>Yüklənir və ya siyahı boşdur...</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {musics.map((music) => (
                        <div
                            key={music.id}
                            className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition-all"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                {music.name || "Adsız musiqi"}
                            </h2>
 
                            {music.posterUrl && (
                                <img
                                    src={`https://localhost:7077${music.posterUrl}`}
                                    alt="Poster"
                                    className="mb-4 rounded-lg object-cover w-full max-h-60"
                                />
                            )}
 
                            {music.musicUrl ? (
                                <audio controls className="w-full">
                                    <source
                                        src={`https://localhost:7077${music.musicUrl}`}
                                        type="audio/mpeg"
                                    />
                                    Sənin brauzerin audio dəstəkləmir.
                                </audio>
                            ) : (
                                <p className="text-red-500 text-sm mt-2">Audio faylı tapılmadı.</p>
                            )}
 
                            <button
                                onClick={() => handleAddToPlaylist(music.id)}
                                className="mt-4 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 text-sm"
                            >
                                ➕ Add
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
 
export default MusicPage;
 
 