import { useEffect, useState } from "react";
import axios from "axios";
 
function PlaylistPage() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [newName, setNewName] = useState("");
    const userId = localStorage.getItem("user_id");
 
    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const res = await axios.get(`https://localhost:7243/playlist/getPlayListByUser/${userId}`);
                const allPlaylists = [];
 
                for (const playlist of res.data) {
                    const musicRes = await axios.get(`https://localhost:7243/playlist/getMusicByList/${playlist.id}`);
                    allPlaylists.push({ ...playlist, musics: musicRes.data });
                }
 
                setPlaylists(allPlaylists);
            } catch (err) {
                console.error("Playlistləri və musiqiləri yükləmək mümkün olmadı:", err);
            } finally {
                setLoading(false);
            }
        };
 
        if (userId) {
            fetchPlaylists();
        } else {
            console.warn("İstifadəçi ID tapılmadı.");
            setLoading(false);
        }
    }, [userId]);
 
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Bu playlisti silmək istədiyinizə əminsiniz?");
        if (!confirmed) return;
 
        try {
            await axios.delete(`https://localhost:7243/playlist/delete/${id}`);
            setPlaylists(playlists.filter(p => p.id !== id));
        } catch (err) {
            console.error("Playlist silinərkən xəta baş verdi:", err);
        }
    };
 
    const handleEditClick = (id, currentName) => {
        setEditingId(id);
        setNewName(currentName);
    };
 
    const handleRenameSubmit = async (id) => {
        try {
            await axios.patch(`https://localhost:7243/playlist/update/${id}`, { name: newName });
            setPlaylists(playlists.map(p => p.id === id ? { ...p, name: newName } : p));
        } catch (err) {
            console.error("Playlist adı dəyişdirilə bilmədi:", err);
        } finally {
            setEditingId(null);
            setNewName("");
        }
    };
 
    if (loading) return <p>Yüklənir...</p>;
 
    return (
<div>
<h1 className="text-2xl font-bold mb-4">Sənin Playlistlərin və Musiqilərin</h1>
            {playlists.length === 0 ? (
<p>Playlist yoxdur.</p>
            ) : (
                playlists.map((playlist) => (
<div key={playlist.id} className="mb-6 border p-4 rounded shadow">
<div className="flex justify-between items-center mb-2">
                            {editingId === playlist.id ? (
<div className="flex items-center gap-2">
<input
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="border rounded px-2 py-1"
                                        placeholder="Yeni ad"
                                    />
<button
                                        onClick={() => handleRenameSubmit(playlist.id)}
                                        className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600"
>
                                        ✅ Təsdiqlə
</button>
<button
                                        onClick={() => setEditingId(null)}
                                        className="bg-gray-400 text-white px-2 py-1 rounded text-sm hover:bg-gray-500"
>
                                        ❌ Ləğv et
</button>
</div>
                            ) : (
<>
<h2 className="text-xl font-semibold">{playlist.name}</h2>
<div className="space-x-2">
<button
                                            onClick={() => handleEditClick(playlist.id, playlist.name)}
                                            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-sm"
>
                                            ✏️ Dəyiş
</button>
<button
                                            onClick={() => handleDelete(playlist.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
>
                                            🗑️ Sil
</button>
</div>
</>
                            )}
</div>
 
                        {playlist.musics.length === 0 ? (
<p>Bu playlistdə musiqi yoxdur.</p>
                        ) : (
<ul className="list-disc ml-5">
                                {playlist.musics.map((music) => (
<li key={music.id}>{music.name}</li>
                                ))}
</ul>
                        )}
</div>
                ))
            )}
</div>
    );
}
 
export default PlaylistPage;