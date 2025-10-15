// src/components/EpisodeCard/EpisodeCard.jsx
import React from 'react';
import './EpisodeCard.css';

const EpisodeCard = ({ episode }) => {
  const imageUrl = `https://cdn.thesimpsonsapi.com/200${episode.image_path}`;

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/400x250/75cffc/333?text=Episodio+no+disponible';
  };

  // Formatear la fecha de forma más legible
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
  };

  // Si hay descripción, la usamos. Si no, usamos un texto alternativo
  const description = episode.description || episode.synopsis || 
    `Episodio ${episode.episode_number} de la temporada ${episode.season}. Una aventura más de la familia más famosa de Springfield.`;

  return (
    <div className="episode-card-flip-container">
      <div className="episode-card-flip-inner">
        
        {/* LADO FRONTAL - Imagen, título y badges */}
        <div className="episode-card-flip-front">
          {/* Imagen del episodio */}
          <div className="episode-image-container">
            <img
              src={imageUrl}
              alt={episode.name}
              className="episode-image"
              onError={handleImageError}
            />
            <span className="episode-flip-hint">🔄 Hover</span>
          </div>

          {/* Contenido frontal */}
          <div className="episode-front-content">
            {/* Título con estilo llamativo */}
            <h3 className="episode-title">{episode.name}</h3>

            {/* Badges de temporada y episodio */}
            <div className="episode-badges">
              <span className="episode-badge badge-season">T{episode.season}</span>
              <span className="episode-badge badge-episode">Ep {episode.episode_number}</span>
            </div>
          </div>
        </div>

        {/* LADO TRASERO - Descripción completa y fecha */}
        <div className="episode-card-flip-back">
          <div className="episode-back-content">
            {/* Descripción completa */}
            <div className="episode-description-back">
              {description}
            </div>

            {/* Fecha de emisión */}
            <div className="episode-airdate-back">
              📅 Emitido: {formatDate(episode.airdate)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EpisodeCard;