// src/components/LocationsCard/LocationsCard.jsx
import React from 'react';
import './LocationsCard.css';

const LocationsCard = ({ location }) => {
  const imageUrl = `https://cdn.thesimpsonsapi.com/1280${location.image_path}`;

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/400x300/75cffc/333?text=Lugar+no+disponible';
  };

  return (
    <div className="location-card">
      {/* Imagen del lugar */}
      <div className="location-image-container">
        <img
          src={imageUrl}
          alt={location.name}
          className="location-image"
          onError={handleImageError}
        />
      </div>

      {/* Contenido del lugar */}
      <div className="location-content">
        {/* Título del lugar */}
        <h3 className="location-title">{location.name}</h3>

        {/* Información detallada */}
        <div className="location-info">
          <div className="location-detail">
            <span className="location-label">📍 Pueblo:</span>
            <span className="location-value">{location.town}</span>
          </div>
          
          <div className="location-detail">
            <span className="location-label">🏢 Uso:</span>
            <span className="location-value">{location.use}</span>
          </div>
        </div>

        {/* Badge del pueblo */}
        <div style={{ textAlign: 'center' }}>
          <span className="location-town-badge">
            {location.town}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LocationsCard;