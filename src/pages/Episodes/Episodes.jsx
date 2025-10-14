// src/pages/Episodes/Episodes.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';

const API_EPISODES_URL = 'https://thesimpsonsapi.com/api/episodes';

const Episodes = () => {
    // ESTADOS: Ahora tenemos dos filtros
    const [allEpisodes, setAllEpisodes] = useState([]);
    const [filteredEpisodes, setFilteredEpisodes] = useState([]);
    const [nameFilter, setNameFilter] = useState(''); // Filtro por nombre
    const [seasonFilter, setSeasonFilter] = useState(''); // Filtro por temporada

    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1; 

    // Efecto para buscar datos de la API
    useEffect(() => {
        const fetchEpisodes = async (page) => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_EPISODES_URL}?page=${page}`);
                if (!response.ok) throw new Error('Error al cargar los episodios.');
                
                const data = await response.json();
                setAllEpisodes(data.results || []);
                setFilteredEpisodes(data.results || []);
                setTotalPages(data.pages || 1);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEpisodes(currentPage);
    }, [currentPage]);

    // Efecto para filtrar por NOMBRE y TEMPORADA
    useEffect(() => {
        let results = [...allEpisodes];

        // Primero, filtramos por nombre
        results = results.filter(episode =>
            episode.name.toLowerCase().includes(nameFilter.toLowerCase())
        );

        // Luego, si hay un filtro de temporada, lo aplicamos
        if (seasonFilter) {
            results = results.filter(episode => 
                episode.season.toString() === seasonFilter
            );
        }

        setFilteredEpisodes(results);
    }, [nameFilter, seasonFilter, allEpisodes]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setNameFilter('');
            setSeasonFilter('');
            setSearchParams({ page: newPage });
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="app-content-padding">
            <h1>Episodios de Los Simpsons</h1>
            <div className="filters-container">
                <input
                    type="text"
                    placeholder="Filtrar por nombre..."
                    className="search-input"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Filtrar por temporada..."
                    className="search-input"
                    value={seasonFilter}
                    onChange={(e) => setSeasonFilter(e.target.value)}
                    min="1"
                />
            </div>

            {filteredEpisodes.length === 0 && !loading && (
                <p className="info-message">No se encontraron episodios con esos filtros en esta página.</p>
            )}

            <div className="character-grid">
                {filteredEpisodes.map(episode => (
                    <EpisodeCard key={episode.id} episode={episode} />
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

export default Episodes;