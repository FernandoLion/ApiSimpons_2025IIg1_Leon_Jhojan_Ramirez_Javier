// src/components/LocationsCard/LocationsCard.jsx
import React from 'react';
// ¡Vamos a reutilizar el CSS de CharacterCard para no repetir código!
import '../CharacterCard/CharacterCard.css'; 

const LocationsCard = ({ location }) => {
  // AQUÍ ESTÁ LA CORRECCIÓN: Añadimos el tamaño "1280" a la URL
  const imageUrl = `https://cdn.thesimpsonsapi.com/1280${location.image_path}`;

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/300x200/75cffc/333?text=Lugar+no+disponible';
  };

  return (
    <div className="card-flip-container">
      <div className="card-flip-inner">
        {/* LADO FRONTAL */}
        <div className="card-flip-front">
          <div className="card-image-container">
            <img
              src={imageUrl}
              alt={location.name}
              className="card-image"
              onError={handleImageError}
            />
          </div>
          <h3 className="card-name">{location.name}</h3>
        </div>
        {/* LADO TRASERO */}
        <div className="card-flip-back">
          <div className="back-content">
            <p className="back-occupation"><strong>Pueblo:</strong> {location.town}</p>
            <p className="back-occupation"><strong>Uso:</strong> {location.use}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsCard;