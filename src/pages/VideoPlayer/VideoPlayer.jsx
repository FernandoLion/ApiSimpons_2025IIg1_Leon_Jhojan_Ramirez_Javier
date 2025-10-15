// src/pages/VideoPlayer/VideoPlayer.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './VideoPlayer.css';
import lasdederecho from '../../assets/images/lasdederechodos.mp4';

function VideoPlayer() {
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    // Cuando el video termine, regresa a la página de inicio
    navigate('/');
  };

  useEffect(() => {
    // Opcional: Si el usuario presiona ESC, también regresa
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [navigate]);

  return (
    <div className="video-container">
      <video
        className="fullscreen-video"
        autoPlay
        onEnded={handleVideoEnd}
        controls={false}
      >
        {/* 👇 AQUÍ PON LA RUTA DE TU VIDEO */}
        <source src={lasdederecho} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
      
      {/* Botón opcional para cerrar antes */}
      <button 
        className="close-button"
        onClick={() => navigate('/')}
        aria-label="Cerrar video"
      >
        ✕
      </button>
    </div>
  );
}

export default VideoPlayer;