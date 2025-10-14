// src/pages/CharacterDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook para obtener parámetros de la URL

// URL base de la API para el endpoint de personajes
const API_BASE_URL = 'https://thesimpsonsapi.com/api/characters';

/**
 * CharacterDetail Componente funcional para mostrar la información detallada de un personaje.
 * Cumple con los requisitos de la ruta dinámica /personaje/:id.
 */
const CharacterDetail = () => {
    // Obtiene el ID del personaje desde los parámetros de la URL.
    const { id } = useParams(); 
    // Estados para almacenar los datos, el estado de carga y posibles errores.
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Efecto que se ejecuta al montar el componente y cada vez que cambia el ID.
    useEffect(() => {
        const fetchCharacterDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                // Realiza la petición a la API usando el ID del personaje.
                const response = await fetch(`${API_BASE_URL}/${id}`);

                // Manejo de errores HTTP (si la respuesta no es 200 OK).
                if (!response.ok) {
                    throw new Error('Personaje no encontrado.');
                }

                const data = await response.json();
                setCharacter(data);

            } catch (err) {
                // Captura y muestra errores de red o de la API (Control de Errores - Extra Opcional).
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacterDetail();
    }, [id]); // Dependencia: se re-ejecuta si el ID cambia.

    // --- Renderizado Condicional y Lógica de Datos ---

    // Muestra un mensaje de carga.
    if (loading)
        return <div style={{ padding: '20px', textAlign: 'center' }}>Cargando detalles de personaje...</div>;
    // Muestra un mensaje de error.
    if (error)
        return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
    // Muestra un mensaje si no se encontró el personaje.
    if (!character)
        return <div style={{ padding: '20px' }}>No se pudo cargar la información del personaje.</div>;

    // Lógica para formatear la frase célebre (requisito).
    const phrases =
        character.phrases && character.phrases.length > 0
            ? character.phrases.join(' | ')
            : 'No disponible';

    // Construcción de la URL de la imagen usando la CDN (cdn.thesimpsonsapi.com).
    const imageUrl = `https://cdn.thesimpsonsapi.com/500/character/${character.id}.webp`;

    // --- Renderizado Final (Estructura de Doble Columna) ---
    return (
        // Contenedor principal: Centrado y con fondo blanco semi-transparente para ver el cielo animado.
        <div
            className="detail-container"
            style={{
                maxWidth: '1000px',
                margin: '20px auto',
                padding: '40px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)', // Fondo blanco
                borderRadius: '15px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                color: '#212529', // Texto oscuro para legibilidad
            }}
        >
            {/* Título Principal (Nombre del Personaje) */}
            <h1
                style={{
                    textAlign: 'center',
                    color: '#ffc107', // Amarillo temático
                    marginBottom: '25px',
                    textShadow: '1px 1px 1px #000',
                }}
            >
                {character.name}
            </h1>

            {/* ESTRUCTURA DE DOS COLUMNAS (Flexbox) */}
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                
                {/* COLUMNA IZQUIERDA: Imagen y Datos Primarios */}
                <div style={{ flex: '1 1 350px', maxWidth: '350px', textAlign: 'center' }}>
                    
                    {/* Imagen del Personaje (Requisito) */}
                    <img
                        src={imageUrl}
                        alt={character.name}
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '15px',
                            border: '3px solid #ffc107',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        }}
                    />

                    {/* Contenedor de Datos Primarios: Ocupación, Estado, Edad */}
                    <div
                        style={{
                            marginTop: '20px',
                            padding: '15px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            backgroundColor: '#f8f9fa', // Fondo blanco/gris muy claro
                        }}
                    >
                        <p style={{ margin: '5px 0' }}>
                            <strong>Ocupación:</strong> {character.occupation}
                        </p>
                        <p style={{ margin: '5px 0' }}>
                            <strong>Estado:</strong> {character.status}
                        </p>
                        <p style={{ margin: '5px 0' }}>
                            <strong>Edad:</strong> {character.age}
                        </p>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Frase Célebre y Descripción */}
                <div style={{ flex: '1 1 500px' }}>
                    
                    {/* Frase célebre (Requisito) */}
                    <div
                        style={{
                            borderLeft: '5px solid #ffc107', // Borde amarillo para destacar
                            paddingLeft: '20px',
                            marginBottom: '30px',
                            backgroundColor: '#fffbe6', // Fondo amarillo muy claro
                            padding: '15px',
                            borderRadius: '8px',
                        }}
                    >
                        <h4>Frase(s) Célebre(s):</h4>
                        <p style={{ fontStyle: 'italic' }}>"{phrases}"</p>
                    </div>

                    {/* Descripción (si existe) */}
                    {character.description && (
                        <div style={{ marginTop: '20px' }}>
                            <h4>Descripción:</h4>
                            <p>{character.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Exportación del componente de detalle.
export default CharacterDetail;