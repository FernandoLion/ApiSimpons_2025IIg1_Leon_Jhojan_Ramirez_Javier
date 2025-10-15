// src/pages/Locations/Locations.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LocationCard from '../../components/LocationsCard/LocationsCard';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';

const API_LOCATIONS_URL = 'https://thesimpsonsapi.com/api/locations';

const Locations = () => {
    // ESTADOS
    const [allLocations, setAllLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1; 

    // Efecto para buscar los datos de la API cuando cambia la página
    useEffect(() => {
        const fetchLocations = async (page) => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_LOCATIONS_URL}?page=${page}`);
                if (!response.ok) throw new Error('Error al cargar los lugares.');
                
                const data = await response.json();
                setAllLocations(data.results || []);
                setFilteredLocations(data.results || []);
                setTotalPages(data.pages || 1);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLocations(currentPage);
    }, [currentPage]);

    // Efecto para filtrar los datos que ya tenemos cuando el usuario escribe
    useEffect(() => {
        const results = allLocations.filter(location =>
            location.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredLocations(results);
    }, [searchTerm, allLocations]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setSearchTerm('');
            setSearchParams({ page: newPage });
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="app-content-padding">
            <h1>Lugares Icónicos</h1>
            <div className="filters-container">
                <input
                    type="text"
                    placeholder="Filtrar lugares en esta página..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredLocations.length === 0 && !loading && (
                <p className="info-message">No se encontraron lugares con ese nombre en esta página.</p>
            )}
            
            <div className="locations-grid">
                {filteredLocations.map(location => (
                    <LocationCard key={location.id} location={location} />
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

export default Locations;