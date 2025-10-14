import { Link } from 'react-router-dom';
import React from 'react';
import './CharacterCard.css'; // Importa sus propios estilos

const CharacterCard = ({ character }) => {
  // Construimos la URL de la imagen usando el ID, como descubriste
  const imageUrl = `https://cdn.thesimpsonsapi.com/500/character/${character.id}.webp`;

  // La función de reemplazo en caso de que la imagen falle
  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/200x300/fdf37a/333?text=Imagen+no+disponible';
  };

  return (
    // Contenedor que define la perspectiva 3D
    <div className="card-flip-container">
      <div className="card-flip-inner">
        {/* LADO FRONTAL */}
        <div className="card-flip-front">
          <img
            src={imageUrl}
            alt={character.name}
            className="card-image"
            onError={handleImageError}
          />
          <h3 className="card-name">{character.name}</h3>
        </div>
        {/* LADO TRASERO */}
        <div className="card-flip-back">
          <div className="back-content">
            <p className="back-text back-occupation">{character.occupation}</p>
            <Link to={`/personaje/${character.id}`}>
              <button className="details-button">
                Ver Detalles
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;