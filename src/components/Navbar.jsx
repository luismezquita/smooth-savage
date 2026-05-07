import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun, Search, Zap, CupSoda, Heart, Globe } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { StrawberryIcon } from './StrawberryIcon';
import LanguagePicker from './LanguagePicker';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme();
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

    return (
        <nav className="sticky top-0 z-50 bg-fruit-light/90 dark:bg-fruit-dark/80 backdrop-blur-md border-b border-amber-300/70 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* LOGO */}
                    <NavLink to="/" onClick={handleFreshClick} className="flex items-center group">
                        <div className="flex items-center transform group-hover:scale-105 transition-transform duration-300">
                            <span className="text-2xl md:text-4xl flex items-center gap-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                <span className="font-black" style={{ color: '#16a34a', textShadow: '0 0 18px rgba(34,197,94,0.7), 0 0 6px rgba(34,197,94,0.4)' }}>smooth</span>
                                <span className="font-black text-gray-900 dark:text-white" style={{ letterSpacing: '0.03em' }}>savage</span>
                            </span>
                        </div>
                    </NavLink>

                    {/* DESKTOP NAV */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink
                            to="/"
                            onClick={handleFreshClick}
                            className={({ isActive }) => `flex items-center gap-1.5 font-medium transition-colors ${isActive ? 'text-fruit-green' : 'text-gray-600 dark:text-gray-300 hover:text-fruit-green'}`}
                        >
                            <StrawberryIcon className="w-4 h-4" strokeWidth={2} />
                            {t('nav.fresh')}
                        </NavLink>

                        <NavLink to="/savage" className="flex items-center gap-1.5 font-medium text-gray-600 dark:text-gray-300 hover:text-fruit-green">
                            <Zap className="w-4 h-4" /> {t('nav.savage')}
                        </NavLink>

                        <NavLink to="/smoothies" className="flex items-center gap-1.5 font-medium text-gray-600 dark:text-gray-300 hover:text-fruit-green">
                            <CupSoda className="w-4 h-4" /> {t('nav.smoothies')}
                        </NavLink>

                        <NavLink to="/favorites" className="flex items-center gap-1.5 font-medium text-gray-600 dark:text-gray-300 hover:text-fruit-green">
                            <Heart className="w-4 h-4" /> {t('nav.favorites')}
                        </NavLink>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            onClick={() => setLangOpen(true)}
                            className="p-2 rounded-full text-amber-800 dark:text-gray-300 hover:bg-amber-200/50 dark:hover:bg-gray-800 transition-colors"
                            aria-label={t('nav.language')}
                        >
                            <Globe className="w-5 h-5" />
                        </button>
                        <NavLink to="/search" className="p-2 rounded-full text-amber-800 dark:text-gray-300 hover:bg-amber-200/50 dark:hover:bg-gray-800 transition-colors">
                            <Search className="w-5 h-5" />
                        </NavLink>
                        <button onClick={toggleTheme} className="p-2 rounded-full text-amber-800 dark:text-yellow-300 hover:bg-amber-200/50 dark:hover:bg-gray-800 transition-colors outline-none focus:outline-none focus-visible:outline-none">
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
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
