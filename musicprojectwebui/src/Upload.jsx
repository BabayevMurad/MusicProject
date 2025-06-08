import { useState } from "react";
import axios from "axios";
 
function Upload({ onUploadSuccess }) {
  const [name, setName] = useState("");
  const [poster, setPoster] = useState(null);
  const [music, setMusic] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const userId = localStorage.getItem("user_id") || "1"; // Fallback user ID
 
  const handleUpload = async () => {
    if (!name || !poster || !music) {
      alert("Bütün sahələri doldurun!");
      return;
    }
 
    setLoading(true);
 
    try {
      // 1. Upload poster + music files
      const formData = new FormData();
      formData.append("name", name);
      formData.append("poster", poster);
      formData.append("music", music);
 
      const uploadRes = await axios.post("https://localhost:7243/music/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
 
      const { posterUrl, musicUrl } = uploadRes.data;
 
      // 2. Save music record to database
      const musicAddDto = {
        name,
        posterUrl,
        musicUrl,
        userId: parseInt(userId),
      };
 
      await axios.post("https://localhost:7243/music/add", musicAddDto);
 
      alert("Musiqi əlavə olundu!");
      setName("");
      setPoster(null);
      setMusic(null);
      onUploadSuccess(); // Refresh list
 
    } catch (err) {
      console.error(err);
      alert("Yükləmə və ya əlavə etmə zamanı xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
<div className="bg-gray-100 p-5 rounded-xl shadow-md mt-10">
<h2 className="text-xl font-bold mb-4">➕ Yeni musiqi əlavə et</h2>
 
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Musiqinin adı"
        className="block w-full mb-3 px-4 py-2 rounded border"
      />
 
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPoster(e.target.files[0])}
        className="block mb-3"
      />
 
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setMusic(e.target.files[0])}
        className="block mb-3"
      />
 
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
>
        {loading ? "Yüklənir..." : "Yüklə"}
</button>
</div>
  );
}
 
export default Upload;