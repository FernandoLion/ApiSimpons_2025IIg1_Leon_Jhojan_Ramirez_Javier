import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importa sus propios estilos

const Navbar = () => {
    const navButtonClass = "nav-btn-simpsons";

    return (
        <div className="navbar-wrapper">
            <nav className="navbar-simpsons">
                <Link to="/" className={navButtonClass}>Home</Link>
                <Link to="/personajes" className={navButtonClass}>Personajes</Link>
                <Link to="/lugares" className={navButtonClass}>Lugares</Link>
                <Link to="/episodios" className={navButtonClass}>Episodios</Link>
            </nav>
        </div>
    );
};

export default Navbar;