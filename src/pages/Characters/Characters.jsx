import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';

const API_BASE_URL = 'https://thesimpsonsapi.com/api/characters';

const Characters = () => {
    const [allCharacters, setAllCharacters] = useState([]); 
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
    
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1; 

    useEffect(() => {
        const fetchCharacters = async (page) => {
            setLoading(true);
            setError(null);
            try {
                const url = `${API_BASE_URL}?page=${page}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error('Error al obtener la información.');
                
                const data = await response.json();
                console.log(`✅ Personajes cargados: ${data.results.length} ítems.`);
                setAllCharacters(data.results); 
                setFilteredCharacters(data.results); 
                setTotalPages(data.pages);
            } catch (err) {
                console.error('❌ Error al cargar personajes:', error);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCharacters(currentPage);
    }, [currentPage]);

    // --- EFECTO 2: SOLO PARA FILTRAR LOS DATOS QUE YA TENEMOS ---
    // Este useEffect se ejecuta solo cuando el usuario escribe en el buscador.
    useEffect(() => {
        const results = allCharacters.filter(character =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCharacters(results);
    }, [searchTerm, allCharacters]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setSearchTerm(''); // Limpiamos la búsqueda al cambiar de página
            setSearchParams({ page: newPage });
        }
    };
    
    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="app-content-padding">
            <h1>Lista de Personajes</h1>
            <div className="filters-container">
                <input
                    type="text"
                    placeholder="Filtrar personajes en esta página..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {filteredCharacters.length === 0 && !loading && (
                <p className="info-message">No se encontraron personajes con ese nombre en esta página.</p>
            )}

            <div className="character-grid">
                {/* Ahora mapeamos la lista FILTRADA */}
                {filteredCharacters.map(character => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </div>
            
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Characters;