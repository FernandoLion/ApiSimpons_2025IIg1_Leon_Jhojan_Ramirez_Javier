// src/components/CharacterCard/CharacterCard.jsx
import { Link } from 'react-router-dom';
import React from 'react';
import './CharacterCard.css';

const CharacterCard = ({ character }) => {
  const imageUrl = `https://cdn.thesimpsonsapi.com/500/character/${character.id}.webp`;

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/200x300/fdf37a/333?text=Imagen+no+disponible';
  };

  return (
    <div className="card-flip-container">
      <div className="card-flip-inner">
        <div className="card-flip-front">
          {/* 👇 AÑADIMOS ESTE CONTENEDOR PARA LA IMAGEN 👇 */}
          <div className="card-image-container">
            <img
              src={imageUrl}
              alt={character.name}
              className="card-image"
              onError={handleImageError}
            />
          </div>
          <h3 className="card-name">{character.name}</h3>
        </div>
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