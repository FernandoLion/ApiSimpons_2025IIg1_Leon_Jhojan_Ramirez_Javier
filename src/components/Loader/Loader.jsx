// src/components/Loader/Loader.jsx
import React from 'react';
import './Loader.css'; // Importamos los estilos para la animación

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
    </div>
  );
};

export default Loader;