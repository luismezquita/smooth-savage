import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './i18n/LanguageContext';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const mainCards = [
    { key: 'smoothies', path: '/smoothies', img: '/images/smoothies/brain_and_focus_hero.webp', className: 'card-smoothies' },
    { key: 'fresh', path: '/fresh', img: '/images/fresh/cranberry.webp', className: 'card-fresh' },
    { key: 'savage', path: '/savage', img: '/images/savage/chaga_mushroom.webp', className: 'card-savage' }
  ];

  return (
    <div className="welcome-container">
      <div className="hero-header">
        <h1 className="slogan">
          Smooth<br />
          <span className="highlight">Savage</span>
        </h1>
      </div>

      <div className="cards-container">
        {mainCards.map((card) => (
          <div key={card.key} className={`card ${card.className}`} onClick={() => navigate(card.path)}>
            <div className="card-image">
              <img src={card.img} alt={t(`home.cards.${card.key}.title`)} />
              <div className="text-protection-overlay"></div>
            </div>
            <div className="card-content">
              <div className="text-group">
                <h3>{t(`home.cards.${card.key}.title`)}</h3>
                <p className="description-two-lines">
                  {t(`home.cards.${card.key}.desc`).split('\n').map((line, i) => (
                    <React.Fragment key={i}>{line}<br /></React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="welcome-footer-space"></div>
    </div>
  );
};

export default WelcomePage;