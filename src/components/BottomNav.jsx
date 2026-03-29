import React from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Sparkles, CupSoda } from 'lucide-react';
import { StrawberryIcon } from './StrawberryIcon';

export default function BottomNav() {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bottom-nav backdrop-blur-md border-t border-gray-100/10 dark:border-gray-800 pb-safe z-50">
            <nav className="flex justify-around items-center h-16 px-4">
                <NavLink to="/" className={({ isActive }) => `nav-item flex flex-col items-center gap-1 ${isActive ? 'active' : ''} hover:text-[#ffcc00] opacity-90 hover:opacity-100`}>
                    <div className="icon-container">
                        <StrawberryIcon className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <span className="text-[10px] font-medium">Fruits</span>
                </NavLink>
                <NavLink to="/superfoods" className={({ isActive }) => `nav-item flex flex-col items-center gap-1 ${isActive ? 'active' : ''} hover:text-[#ffcc00] opacity-90 hover:opacity-100`}>
                    <div className="icon-container">
                        <Sparkles className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <span className="text-[10px] font-medium">Superfoods</span>
                </NavLink>
                <NavLink to="/smoothies" className={({ isActive }) => `nav-item flex flex-col items-center gap-1 ${isActive ? 'active' : ''} hover:text-[#ffcc00] opacity-90 hover:opacity-100`}>
                    <div className="icon-container">
                        <CupSoda className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <span className="text-[10px] font-medium">Smoothies</span>
                </NavLink>
                <NavLink to="/favorites" className={({ isActive }) => `nav-item flex flex-col items-center gap-1 ${isActive ? 'active' : ''} hover:text-[#ffcc00] opacity-90 hover:opacity-100`}>
                    <div className="icon-container">
                        <Heart className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <span className="text-[10px] font-medium">Favorites</span>
                </NavLink>
            </nav>
        </div>
    );
}
