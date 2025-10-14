// 1. Importaciones necesarias
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Characters from './pages/Characters/Characters';
import Locations from './pages/Locations/Locations';
import Episodes from './pages/Episodes/Episodes';
import Navbar from './components/Navbar/Navbar';
import CharacterDetail from './pages/CharacterDetail/CharacterDetail';

function App() {
  return (
    // 2. El componente "Router" que envuelve todo
    <BrowserRouter>
     <Navbar /> {/* 2. Colócala aquí */}
      {/* Aquí irá nuestra barra de navegación en el futuro */}

      {/* 3. El contenedor de nuestras rutas */}
      <Routes>
        {/* 4. Definición de cada ruta */}
        <Route path="/" element={<Home />} />
        <Route path="/personajes" element={<Characters />} />
        <Route path="/lugares" element={<Locations />} />
        <Route path="/episodios" element={<Episodes />} />
        <Route path="/personaje/:id" element={<CharacterDetail />} />
        {/* 5. Ruta para páginas no encontradas */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;