// src/pages/Characters/Characters.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Importamos para manejar la URL
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination'; // 1. Importamos Pagination

const API_BASE_URL = 'https://thesimpsonsapi.com/api/characters';

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [totalPages, setTotalPages] = useState(1); // 2. Añadimos estado para el total de páginas
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1; 

    // 3. Modificamos el useEffect para que dependa de la página actual
    useEffect(() => {
        const fetchCharacters = async (page) => {
            setLoading(true);
            setError(null);
            try {
                // Añadimos el parámetro "page" a la URL de la API
                const response = await fetch(`${API_BASE_URL}?page=${page}`);
                if (!response.ok) {
                    throw new Error('Error al obtener la información.');
                }
                const data = await response.json();
                setCharacters(data.results);
                setTotalPages(data.pages); // La API nos dice cuántas páginas hay
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters(currentPage);
    }, [currentPage]); // Se ejecutará cada vez que currentPage cambie

    // 4. Función para manejar el cambio de página
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setSearchParams({ page: newPage });
        }
    };

    if (loading) return <Loader />;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

    return (
        <div className="app-content-padding">
            <h1>Lista de Personajes</h1>
            <div className="character-grid">
                {characters.map(character => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </div>
            
            {/* 5. Añadimos el componente Pagination y le pasamos las órdenes */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Characters;