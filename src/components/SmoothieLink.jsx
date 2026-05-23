import React from 'react';
import { useNavigate } from 'react-router-dom';
import { hasSmoothie } from '../utils/smoothieUtils';

const SmoothieLink = ({ ingredientName }) => {
  const navigate = useNavigate();
  
  if (!hasSmoothie(ingredientName)) return null;

  const handleClick = (e) => {
    // ESTA LÍNEA ES LA QUE SOLUCIONA TODO
    e.stopPropagation(); 
    e.preventDefault();
    
    navigate('/smoothies', { state: { searchIngredient: ingredientName } });
  };

  return (
    <button 
      onClick={handleClick}
      className="group p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 transition-all hover:bg-black/80 hover:scale-105 z-50 pointer-events-auto"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="M18 8L16.5 20C16.5 21.1 15.6 22 14.5 22H9.5C8.4 22 7.5 21.1 7.5 20L6 8" />
        <path d="M5 8H19" />
        <path d="M12 8V4M10 4H14" />
      </svg>
    </button>
  );
};

export default SmoothieLink;