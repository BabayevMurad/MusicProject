import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import RegisterLogin from './RegisterLogin'
import MusicPage from './MusicPage'
import PlaylistPage from './PlaylistPage'
import FavoritesPage from './FavoritesPage'
import Sidebar from './Sidebar'

function App() {
  const location = useLocation();

  const showSidebar = location.pathname !== "/";

  return (
    <>
      {showSidebar && <Sidebar />}

      <div className={showSidebar ? "ml-64 p-4" : ""}>
        <Routes>
          <Route path="/" element={<RegisterLogin />} />
          <Route path="/musicapp" element={<MusicPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
