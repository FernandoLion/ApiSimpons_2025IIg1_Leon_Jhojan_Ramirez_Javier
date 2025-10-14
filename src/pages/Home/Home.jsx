// src/pages/Home/Home.jsx
import React from 'react';
import './Home.css'; // Importamos sus estilos

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        {/* Usamos la imagen de la familia en el sofá */}
        <img 
          src="./src/img/logo.png" 
          alt="Familia Simpsons" 
          className="hero-image"
        />

        <h1 className="welcome-title">
          ¡Bienvenido a la App de Los Simpsons!
        </h1>
        <p className="welcome-text">
          Explora los personajes, lugares y episodios de la serie más famosa de Springfield.
        </p>
      </div>
    </div>
  );
};

export default Home;