// WelcomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

// Importa tus imágenes locales (ajusta las rutas según tu estructura)
import berriesImg from '../../assets/blackberries.webp';
import superfoodImg from '../../assets/chaga_mushroom.webp';
import smoothieImg from '../../assets/brain_and_focus_hero.webp'; // o la del smoothie rojo

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleCardClick = (section) => {
    navigate(`/${section}`);
  };

  return (
    <div className="welcome-container">
      <div className="hero-header">
        <div className="logo">
          <span className="smooth">Smooth</span>
          <span className="savage">Savage</span>
        </div>
        <h1 className="slogan">
          Fresh Foods.<br />
          <span className="highlight">Savage Results.</span>
        </h1>
      </div>

      <div className="cards-container">
        {/* Card 1: Fruits */}
        <div 
          className="card" 
          onClick={() => handleCardClick('fruits')}
        >
          <div className="card-image">
            <img src={berriesImg} alt="Frutas" />
            <div className="overlay"></div>
          </div>
          <div className="card-content">
            <div className="icon">🍓</div>
            <h3>Fruits</h3>
            <p>Naturaleza en su máxima expresión</p>
          </div>
        </div>

        {/* Card 2: Superfoods */}
        <div 
          className="card" 
          onClick={() => handleCardClick('superfoods')}
        >
          <div className="card-image">
            <img src={superfoodImg} alt="Superfoods" />
            <div className="overlay"></div>
          </div>
          <div className="card-content">
            <div className="icon">⚡</div>
            <h3>Superfoods</h3>
            <p>Potencia extrema desde la tierra</p>
          </div>
        </div>

        {/* Card 3: Smoothies */}
        <div 
          className="card" 
          onClick={() => handleCardClick('smoothies')}
        >
          <div className="card-image">
            <img src={smoothieImg} alt="Smoothies" />
            <div className="overlay"></div>
          </div>
          <div className="card-content">
            <div className="icon">🥤</div>
            <h3>Smoothies</h3>
            <p>Combinaciones salvajes y deliciosas</p>
          </div>
        </div>
      </div>

      <div className="bottom-hint">
        Elige tu camino
      </div>
    </div>
  );
};

export default WelcomePage;