import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom'; // Added hooks
import { Moon, Sun, Search, Zap, CupSoda, Heart } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { StrawberryIcon } from './StrawberryIcon';

const iconMap = {
    'fresa-icon': StrawberryIcon,
    'spark-icon': Zap,
    'vaso-icon': CupSoda,
    'heart-icon': Heart
};

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    // SAVAGE SCROLL LOGIC: 
    // If on Home, scroll to top. If elsewhere, go to Home.
    const handleFreshClick = (e) => {
        if (location.pathname === '/') {
            // If already on the home page, prevent navigation and force scroll
            e.preventDefault();
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            // Backup: Force-jump if smooth behavior fails
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-fruit-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* LOGO SECTION */}
                    <NavLink to="/" onClick={handleFreshClick} className="flex items-center group">
                        <div className="flex items-center transform group-hover:scale-105 transition-transform duration-300">
                            <span className="text-4xl flex items-center gap-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                <span className="font-black" style={{ color: '#16a34a', textShadow: '0 0 18px rgba(34,197,94,0.7), 0 0 6px rgba(34,197,94,0.4)' }}>smooth</span>
                                <span className="font-black text-gray-900 dark:text-white" style={{ letterSpacing: '0.03em' }}>savage</span>
                            </span>
                        </div>
                    </NavLink>

                    {/* DESKTOP NAV: Updated Fresh link with scroll logic */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink
                            to="/"
                            onClick={handleFreshClick}
                            className={({ isActive }) => `flex items-center gap-1.5 font-medium transition-colors ${isActive ? 'text-fruit-green' : 'text-gray-600 dark:text-gray-300 hover:text-fruit-green'}`}
                        >
                            <StrawberryIcon className="w-4 h-4" strokeWidth={2} />
                            Fresh
                        </NavLink>

                        <NavLink to="/savage" className="flex items-center gap-1.5 font-medium text-gray-600 dark:text-gray-300 hover:text-fruit-green">
                            <Zap className="w-4 h-4" /> Savage
                        </NavLink>

                        <NavLink to="/smoothies" className="flex items-center gap-1.5 font-medium text-gray-600 dark:text-gray-300 hover:text-fruit-green">
                            <CupSoda className="w-4 h-4" /> Smoothies
                        </NavLink>

                        <NavLink to="/favorites" className="flex items-center gap-1.5 font-medium text-gray-600 dark:text-gray-300 hover:text-fruit-green">
                            <Heart className="w-4 h-4" /> Favorites
                        </NavLink>
                    </div>

                    <div className="flex items-center gap-4">
                        <NavLink to="/search" className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100">
                            <Search className="w-5 h-5" />
                        </NavLink>
                        <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 outline-none focus:outline-none focus-visible:outline-none">
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}