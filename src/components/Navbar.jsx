import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Info, Zap, CupSoda, Heart, Globe } from 'lucide-react';
import { StrawberryIcon } from './StrawberryIcon';
import LanguagePicker from './LanguagePicker';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [langOpen, setLangOpen] = useState(false);
    const { t } = useLanguage();

    const handleFreshClick = (e) => {
        if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    };

    const handleNavClick = (e, path) => {
        if (location.pathname === path) {
            e.preventDefault();
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            navigate(path, { replace: true, state: { resetSearch: Date.now() } });
        } else {
            window.scrollTo(0, 0);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full overflow-hidden bg-fruit-dark/90 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">

                    {/* LOGO */}
                    <NavLink to="/" onClick={handleFreshClick} className="flex items-center group min-w-0 max-w-[60%] overflow-hidden">
                        <div className="flex items-center transform group-hover:scale-105 transition-transform duration-300 min-w-0">
                            <span className="flex items-center gap-1 truncate" dir="ltr" style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(20px, 3.5vw, 36px)' }}>
                                <span className="font-black truncate" style={{ color: '#F5E6C8' }}>Smooth</span>
                                <span className="font-black truncate" style={{ color: '#F97316', letterSpacing: '0.03em' }}>Savage</span>
                            </span>
                        </div>
                    </NavLink>

                    {/* DESKTOP NAV */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink
                            to="/fresh"
                            onClick={(e) => handleNavClick(e, '/fresh')}
                            className={({ isActive }) => `flex items-center gap-1.5 font-medium transition-colors ${isActive ? 'text-fruit-green' : 'text-gray-300 hover:text-fruit-green'}`}
                        >
                            <StrawberryIcon className="w-4 h-4" strokeWidth={2} />
                            {t('nav.fresh')}
                        </NavLink>

                        <NavLink
                            to="/savage"
                            onClick={(e) => handleNavClick(e, '/savage')}
                            className="flex items-center gap-1.5 font-medium text-gray-300 hover:text-fruit-green"
                        >
                            <Zap className="w-4 h-4" /> {t('nav.savage')}
                        </NavLink>

                        <NavLink
                            to="/smoothies"
                            onClick={(e) => handleNavClick(e, '/smoothies')}
                            className="flex items-center gap-1.5 font-medium text-gray-300 hover:text-fruit-green"
                        >
                            <CupSoda className="w-4 h-4" /> {t('nav.smoothies')}
                        </NavLink>

                        <NavLink to="/favorites" className="flex items-center gap-1.5 font-medium text-gray-300 hover:text-fruit-green">
                            <Heart className="w-4 h-4" /> {t('nav.favorites')}
                        </NavLink>
                    </div>

                    <div className="flex-shrink-0 flex items-center gap-0.5 md:gap-4">
                        <button
                            onClick={() => setLangOpen(true)}
                            className="p-1.5 md:p-2 rounded-full text-gray-300 hover:bg-white/10 transition-colors"
                            aria-label={t('nav.language')}
                        >
                            <Globe className="w-6 h-6 md:w-7 md:h-7" />
                        </button>
                        <NavLink to="/info" className="p-1.5 md:p-2 rounded-full text-gray-300 hover:bg-white/10 transition-colors">
                            <Info className="w-6 h-6 md:w-7 md:h-7" />
                        </NavLink>
                    </div>

                    <LanguagePicker
                        isOpen={langOpen}
                        onClose={() => setLangOpen(false)}
                    />
                </div>
            </div>
        </nav>
    );
}
