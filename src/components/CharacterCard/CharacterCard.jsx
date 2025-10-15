// src/components/CharacterCard/CharacterCard.jsx
import { Link } from 'react-router-dom';
import React from 'react';
import './CharacterCard.css';

const CharacterCard = ({ character }) => {
  const imageUrl = `https://cdn.thesimpsonsapi.com/500/character/${character.id}.webp`;

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/300x350/fdf37a/333?text=Imagen+no+disponible';
  };

  return (
    <div className="card-flip-container">
      <div className="card-flip-inner">
        {/* LADO FRONTAL - Imagen y nombre */}
        <div className="card-flip-front">
          <div className="card-image-container">
            <img
              src={imageUrl}
              alt={character.name}
              className="card-image"
              onError={handleImageError}
            />
            <span className="flip-hint">🔄 Hover</span>
          </div>
          <h3 className="card-name">{character.name}</h3>
        </div>

        {/* LADO TRASERO - Ocupación y botón de detalles */}
        <div className="card-flip-back">
          <div className="back-content">
            <p className="back-occupation">
              {character.occupation || 'Ocupación desconocida'}
            </p>
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