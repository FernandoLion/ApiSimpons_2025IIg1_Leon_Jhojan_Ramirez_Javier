// src/App.jsx
import { HashRouter, Routes, Route } from 'react-router-dom'; // 👈 CAMBIO AQUÍ
import Home from './pages/Home/Home';
import Characters from './pages/Characters/Characters';
import Locations from './pages/Locations/Locations';
import Episodes from './pages/Episodes/Episodes';
import Navbar from './components/Navbar/Navbar';
import CharacterDetail from './pages/CharacterDetail/CharacterDetail';
import VideoPlayer from './pages/VideoPlayer/VideoPlayer';

function App() {
  return (
    // 👇 Cambiamos BrowserRouter por HashRouter
    <HashRouter>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personajes" element={<Characters />} />
        <Route path="/lugares" element={<Locations />} />
        <Route path="/episodios" element={<Episodes />} />
        <Route path="/personaje/:id" element={<CharacterDetail />} />
        <Route path="/video" element={<VideoPlayer />} />
        
        {/* La ruta comodín sigue funcionando */}
        <Route path="*" element={<Home />} /> 
      </Routes>
    </HashRouter>
  );
}

export default App;