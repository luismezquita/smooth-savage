import React from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Sparkles, CupSoda } from 'lucide-react';
import { StrawberryIcon } from './StrawberryIcon';

const iconMap = {
    'fresa-icon': StrawberryIcon,
    'spark-icon': Sparkles,
    'vaso-icon': CupSoda,
    'heart-icon': Heart
};

const navItems = [
    { id: 'fresh', path: '/', label: 'Fresh', icon: 'fresa-icon' },
    { id: 'superfoods', path: '/superfoods', label: 'Superfoods', icon: 'spark-icon' },
    { id: 'smoothies', path: '/smoothies', label: 'Smoothies', icon: 'vaso-icon' },
    { id: 'favorites', path: '/favorites', label: 'Favorites', icon: 'heart-icon' }
];

export default function BottomNav() {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bottom-nav backdrop-blur-md border-t border-gray-100/10 dark:border-gray-800 pb-safe z-50">
            <nav className="flex justify-around items-center h-16 px-4">
                {navItems.map(({ id, path, label, icon }) => {
                    const IconComponent = iconMap[icon];
                    return (
                        <NavLink key={id} to={path} className={({ isActive }) => `nav-item flex flex-col items-center gap-1 ${isActive ? 'active' : ''} hover:text-[#ffcc00] opacity-90 hover:opacity-100`}>
                            <div className="icon-container">
                                <IconComponent className="w-6 h-6" strokeWidth={2} />
                            </div>
                            <span className="text-[10px] font-medium">{label}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
}
