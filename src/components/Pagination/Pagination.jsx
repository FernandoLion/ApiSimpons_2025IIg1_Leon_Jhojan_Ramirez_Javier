// src/components/Pagination/Pagination.jsx
import React from 'react';
import './Pagination.css'; // Importamos sus estilos

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination-container">
      {/* Botón ANTERIOR */}
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="pagination-button"
      >
        &lt; Anterior
      </button>
      
      {/* Indicador de Página */}
      <span className="pagination-info">
        Página {currentPage} de {totalPages}
      </span>

      {/* Botón SIGUIENTE */}
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Siguiente &gt;
      </button>
    </div>
  );
};

export default Pagination;