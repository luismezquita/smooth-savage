import React from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, Moon, Sun, Search, Sparkles, CupSoda, Heart } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { StrawberryIcon } from './StrawberryIcon';

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-fruit-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <NavLink to="/" className="flex items-center group">
                        <div className="flex items-center transform group-hover:scale-105 transition-transform duration-300">
                            <span className="text-2xl flex items-center gap-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                <span className="text-[#22C55E] font-bold">smooth</span>
                                <span className="text-[#1A1A1A] dark:text-white font-normal lowercase" style={{ letterSpacing: '0.05em' }}>savage</span>
                            </span>
                        </div>
                    </NavLink>

                    <div className="hidden md:flex items-center gap-8">
                        <NavLink to="/" className={({ isActive }) => `flex items-center gap-1.5 font-medium transition-colors ${isActive ? 'text-fruit-green' : 'text-gray-600 dark:text-gray-300 hover:text-fruit-green dark:hover:text-fruit-green'}`}>
                            <StrawberryIcon className="w-4 h-4" strokeWidth={2} />
                            Fruits
                        </NavLink>
                        <NavLink to="/superfoods" className={({ isActive }) => `flex items-center gap-1.5 font-medium transition-colors ${isActive ? 'text-fruit-green' : 'text-gray-600 dark:text-gray-300 hover:text-fruit-green dark:hover:text-fruit-green'}`}>
                            <Sparkles className="w-4 h-4" strokeWidth={2} />
                            Superfoods
                        </NavLink>
                        <NavLink to="/smoothies" className={({ isActive }) => `flex items-center gap-1.5 font-medium transition-colors ${isActive ? 'text-fruit-green' : 'text-gray-600 dark:text-gray-300 hover:text-fruit-green dark:hover:text-fruit-green'}`}>
                            <CupSoda className="w-4 h-4" strokeWidth={2} />
                            Smoothies
                        </NavLink>
                        <NavLink to="/favorites" className={({ isActive }) => `flex items-center gap-1.5 font-medium transition-colors ${isActive ? 'text-fruit-green' : 'text-gray-600 dark:text-gray-300 hover:text-fruit-green dark:hover:text-fruit-green'}`}>
                            <Heart className="w-4 h-4" strokeWidth={2} />
                            Favorites
                        </NavLink>
                    </div>

                    <div className="flex items-center gap-4">
                        <NavLink to="/search" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300">
                            <Search className="w-5 h-5" />
                        </NavLink>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                            aria-label="Toggle dark mode"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
