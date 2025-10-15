// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Characters from './pages/Characters/Characters';
import Locations from './pages/Locations/Locations';
import Episodes from './pages/Episodes/Episodes';
import Navbar from './components/Navbar/Navbar';
import CharacterDetail from './pages/CharacterDetail/CharacterDetail';

function App() {
  return (
    // 👇 ESTE ES EL CAMBIO MÁS ROBUSTO Y RECOMENDADO 👇
    // Le decimos al Router que use la variable de entorno BASE_URL que Vite define.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personajes" element={<Characters />} />
        <Route path="/lugares" element={<Locations />} />
        <Route path="/episodios" element={<Episodes />} />
        <Route path="/personaje/:id" element={<CharacterDetail />} />
        
        {/* La ruta comodín debe apuntar a la página de inicio */}
        <Route path="*" element={<Home />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;