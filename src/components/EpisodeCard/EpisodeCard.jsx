// src/components/EpisodeCard/EpisodeCard.jsx
import React from 'react';
// Reutilizamos el CSS de CharacterCard para no repetir código
import '../CharacterCard/CharacterCard.css'; 

const EpisodeCard = ({ episode }) => {
  const imageUrl = `https://cdn.thesimpsonsapi.com/200${episode.image_path}`;

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/200x300/75cffc/333?text=Episodio+no+disponible';
  };

  return (
    <div className="card-flip-container">
      <div className="card-flip-inner">
        {/* LADO FRONTAL */}
        <div className="card-flip-front">
          <div className="card-image-container">
            <img
              src={imageUrl}
              alt={episode.name}
              className="card-image"
              onError={handleImageError}
            />
          </div>
          <h3 className="card-name">{episode.name}</h3>
        </div>
        {/* LADO TRASERO */}
        <div className="card-flip-back">
          <div className="back-content">
            <p className="back-occupation"><strong>Temporada:</strong> {episode.season}</p>
            <p className="back-occupation"><strong>Episodio:</strong> {episode.episode_number}</p>
            <p className="back-occupation"><strong>Fecha:</strong> {episode.airdate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 👇 ESTA ES LA LÍNEA CRUCIAL QUE PROBABLEMENTE FALTABA 👇
export default EpisodeCard;