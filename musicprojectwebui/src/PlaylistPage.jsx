import { useEffect, useState } from "react";
import axios from "axios";
 
function PlaylistPage() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
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
 
    if (loading) return <p>Yüklənir...</p>;
 
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Sənin Playlistlərin və Musiqilərin</h1>
            {playlists.length === 0 ? (
                <p>Playlist yoxdur.</p>
            ) : (
                playlists.map((playlist) => (
                    <div key={playlist.id} className="mb-6 border p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">{playlist.name}</h2>
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