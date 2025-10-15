// src/pages/CharacterDetail/CharacterDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CharacterDetail.css';

const API_BASE_URL = 'https://thesimpsonsapi.com/api/characters';

// Objeto de traducción para los campos que vienen en inglés
const translations = {
  // Estados
  'Alive': 'Vivo',
  'Dead': 'Muerto',
  'Unknown': 'Desconocido',
  
  // Géneros
  'Male': 'Masculino',
  'Female': 'Femenino',
  'Non-binary': 'No binario',
  
  // Ocupaciones comunes
  'Unemployed': 'Desempleado',
  'Safety Inspector': 'Inspector de Seguridad',
  'Student': 'Estudiante',
  'Housewife': 'Ama de casa',
  'Nuclear Safety Inspector': 'Inspector de Seguridad Nuclear',
  'Homemaker': 'Ama de casa',
  'Elementary School Student': 'Estudiante de Primaria',
  'Baby': 'Bebé',
  'Unknown': 'Desconocida',
  'Bartender': 'Cantinero',
  'Police Chief': 'Jefe de Policía',
  'Principal': 'Director',
  'Teacher': 'Profesor/a',
  'Retired': 'Jubilado',
  'Nuclear Plant Owner': 'Dueño de Planta Nuclear',
  'Reverend': 'Reverendo',
  'Doctor': 'Doctor',
  'Lawyer': 'Abogado',
  'News Anchor': 'Presentador de Noticias',
};

// Función para traducir texto
const translateText = (text) => {
  return translations[text] || text;
};

const CharacterDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacterDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/${id}`);

                if (!response.ok) {
                    throw new Error('Personaje no encontrado.');
                }

                const data = await response.json();
                setCharacter(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacterDetail();
    }, [id]);

    // Estados de carga
    if (loading) {
        return <div className="detail-loading">⏳ Cargando detalles del personaje...</div>;
    }

    if (error) {
        return <div className="detail-error">❌ Error: {error}</div>;
    }

    if (!character) {
        return <div className="detail-not-found">😕 No se pudo cargar la información del personaje.</div>;
    }

    // Lógica para formatear frases
    const phrases = character.phrases && character.phrases.length > 0
        ? character.phrases.join(' | ')
        : 'No disponible';

    // URL de la imagen
    const imageUrl = `https://cdn.thesimpsonsapi.com/500/character/${character.id}.webp`;

    // Función para obtener clase de estado
    const getStatusClass = (status) => {
        const statusLower = status.toLowerCase();
        if (statusLower === 'alive') return 'status-alive';
        if (statusLower === 'dead') return 'status-dead';
        return 'status-unknown';
    };

    return (
        <div className="detail-container">
            {/* Header con nombre del personaje */}
            <div className="detail-header">
                <h1 className="detail-title">{character.name}</h1>
            </div>

            {/* Contenido principal */}
            <div className="detail-content">
                <div className="detail-layout">
                    
                    {/* Columna izquierda - Imagen y datos básicos */}
                    <div className="detail-left-column">
                        {/* Imagen del personaje */}
                        <div className="detail-image-container">
                            <img
                                src={imageUrl}
                                alt={character.name}
                                className="detail-image"
                            />
                        </div>

                        {/* Información básica */}
                        <div className="detail-basic-info">
                            <div className="detail-info-item">
                                <span className="detail-info-label">💼 Ocupación:</span>
                                <span className="detail-info-value">{translateText(character.occupation)}</span>
                            </div>
                            
                            <div className="detail-info-item">
                                <span className="detail-info-label">💓 Estado:</span>
                                <span className={`status-badge ${getStatusClass(character.status)}`}>
                                    {translateText(character.status)}
                                </span>
                            </div>
                            
                            <div className="detail-info-item">
                                <span className="detail-info-label">🎂 Edad:</span>
                                <span className="detail-info-value">{character.age} años</span>
                            </div>

                            {character.gender && (
                                <div className="detail-info-item">
                                    <span className="detail-info-label">👤 Género:</span>
                                    <span className="detail-info-value">{translateText(character.gender)}</span>
                                </div>
                            )}

                            {character.birthdate && (
                                <div className="detail-info-item">
                                    <span className="detail-info-label">📅 Nacimiento:</span>
                                    <span className="detail-info-value">{character.birthdate}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Columna derecha - Frases y descripción */}
                    <div className="detail-right-column">
                        {/* Frases célebres */}
                        <div className="detail-phrases-card">
                            <h2 className="detail-section-title">💬 Frases Célebres</h2>
                            <p className="detail-phrases-text">"{phrases}"</p>
                        </div>

                        {/* Descripción */}
                        {character.description && (
                            <div className="detail-description-card">
                                <h2 className="detail-section-title">📖 Descripción</h2>
                                <p className="detail-description-text">{character.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetail;