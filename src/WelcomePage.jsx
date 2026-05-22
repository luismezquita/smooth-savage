import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const goals = [
    { label: 'Energía', icon: '⚡' },
    { label: 'Enfoque', icon: '🧠' },
    { label: 'Músculo', icon: '💪' },
    { label: 'Inmunidad', icon: '🛡️' },
    { label: 'Detox', icon: '🌿' },
    { label: 'Piel', icon: '✨' },
    { label: 'Digestión', icon: '🔥' },
    { label: 'Sueño', icon: '🌙' },
    { label: 'Antioxidante', icon: '🍇' },
    { label: 'Corazón', icon: '❤️' },
    { label: 'Memoria', icon: '🔮' }
  ];

  return (
    <div className="welcome-container">
      <div className="hero-header">
        {/* Tu solución potente y limpia */}
        <h1 className="slogan">
          Smooth<br />
          <span className="highlight">Savage</span>
        </h1>
        
        <div className="goals-grid">
          {goals.map((goal, idx) => (
            <div key={idx} className="goal-chip-fixed">
              <span>{goal.icon}</span> {goal.label}
            </div>
          ))}
        </div>
      </div>

      <div className="cards-container">
        {/* Card 1: Fresh */}
        <div className="card card-fresh" onClick={() => navigate('/fresh')}>
          <div className="card-image">
            <img src="/images/fresh/cranberry.webp" alt="Fresh" />
            <div className="text-protection-overlay"></div>
          </div>
          <div className="card-content">
            <div className="text-group">
              <h3>Fresh</h3>
              <p className="description-two-lines">
                Naturaleza en su<br />máxima expresión
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Savage */}
        <div className="card card-savage" onClick={() => navigate('/savage')}>
          <div className="card-image">
            <img src="/images/savage/chaga_mushroom.webp" alt="Savage" />
            <div className="text-protection-overlay"></div>
          </div>
          <div className="card-content">
            <div className="text-group">
              <h3>Savage</h3>
              <p className="description-two-lines">
                Potencia extrema<br />desde la tierra
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Smoothies */}
        <div className="card card-smoothies" onClick={() => navigate('/smoothies')}>
          <div className="card-image">
            <img src="/images/smoothies/brain_and_focus_hero.webp" alt="Smoothies" />
            <div className="text-protection-overlay"></div>
          </div>
          <div className="card-content">
            <div className="text-group">
              <h3>Smoothies</h3>
              <p className="description-two-lines">
                Combinaciones salvajes<br />y deliciosas
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="welcome-footer-space"></div>
    </div>
  );
};

export default WelcomePage;