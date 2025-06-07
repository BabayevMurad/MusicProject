import { useEffect, useState } from "react";
import axios from "axios";
 
function MusicPage() {
    const [musics, setMusics] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [selectedMusicId, setSelectedMusicId] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
 
    const userId = localStorage.getItem("user_id");
 
    useEffect(() => {
        const fetchMusics = async () => {
            const response = await axios.get("https://localhost:7243/music/list");
            setMusics(response.data);
        };
 
        const fetchPlaylists = async () => {
            const res = await axios.get("https://localhost:7243/playlist/list");
            setPlaylists(res.data);
        };
 
        fetchMusics();
        fetchPlaylists();
    }, []);
 
    const handleAddClick = (musicId) => {
        setSelectedMusicId(musicId);
        setShowDropdown(true);
    };
 
    const handleAddToPlaylist = async (playlistId) => {
        if (!selectedMusicId) return;
 
        await axios.post("https://localhost:7243/playlist/addMusic", {
            playlistId,
            musicId: selectedMusicId
        });
 
        alert("Musiqi əlavə olundu!");
        setShowDropdown(false);
        setSelectedMusicId(null);
    };
 
    const handleCreateNewPlaylist = async () => {
        const name = prompt("Yeni playlist adı:");
        if (!name) return;
 
        const res = await axios.post("https://localhost:7243/playlist/add", {
            name,
            userId: parseInt(userId),
        });
 
        const updated = await axios.get("https://localhost:7243/playlist/list");
        setPlaylists(updated.data);
    };
 
    const handleCloseDropdown = () => {
        setShowDropdown(false);
        setSelectedMusicId(null);
    };
 
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">🎵 Musiqi Siyahısı</h1>
 
            {musics.length === 0 ? (
                <div className="text-center text-gray-500">Yüklənir və ya siyahı boşdur...</div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {musics.map((music) => (
                        <div key={music.id} className="bg-white shadow-md rounded-xl p-4 border relative">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">{music.name}</h2>
                            {music.posterUrl && (
                                <img
                                    src={`https://localhost:7077${music.posterUrl}`}
                                    className="mb-4 rounded-lg object-cover w-full max-h-60"
                                    alt="poster"
                                />
                            )}
                            {music.musicUrl && (
                                <audio controls className="w-full">
                                    <source src={`https://localhost:7077${music.musicUrl}`} type="audio/mpeg" />
                                </audio>
                            )}
 
                            <button
                                onClick={() => handleAddClick(music.id)}
                                className="mt-4 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 text-sm"
                            >
                                ➕ Add
                            </button>
 
                            {showDropdown && selectedMusicId === music.id && (
                                <div className="mt-3 border p-3 rounded shadow bg-white relative">
                                    <button
                                        onClick={handleCloseDropdown}
                                        className="absolute top-1 right-2 text-red-600 text-lg font-bold hover:text-red-800"
                                        title="Bağla"
                                    >
                                        ✖
                                    </button>
 
                                    <p className="font-semibold mb-2">Playlist seç:</p>
                                    <ul className="space-y-1 mt-1">
                                        {playlists.map((p) => (
                                            <li key={p.id}>
                                                <button
                                                    onClick={() => handleAddToPlaylist(p.id)}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {p.name}
                                                </button>
                                            </li>
                                        ))}
                                        <li>
                                            <button
                                                onClick={handleCreateNewPlaylist}
                                                className="text-green-600 hover:underline"
                                            >
                                                ➕ Yeni playlist yarat
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
 
export default MusicPage;