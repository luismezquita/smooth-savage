import React from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, CupSoda, MountainSnow } from 'lucide-react';
import { StrawberryIcon } from './StrawberryIcon';
import { useT } from '../i18n/LanguageContext';

const scrollToTop = () => window.scrollTo(0, 0);

export default function BottomNav() {
    const t = useT();

    const navItems = [
        { id: 'fresh',     path: '/',          label: t('nav.fresh'),     Icon: StrawberryIcon },
        { id: 'savage',    path: '/savage',     label: t('nav.savage'),    Icon: MountainSnow },
        { id: 'smoothies', path: '/smoothies',  label: t('nav.smoothies'), Icon: CupSoda },
        { id: 'favorites', path: '/favorites',  label: t('nav.favorites'), Icon: Heart },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bottom-nav backdrop-blur-md border-t border-gray-100/10 dark:border-gray-800 pb-safe z-50">
            <nav className="flex justify-around items-center h-16 px-4">
                {navItems.map(({ id, path, label, Icon }) => (
                    <NavLink
                        key={id}
                        to={path}
                        onClick={scrollToTop}
                        className={({ isActive }) =>
                            `nav-item flex flex-col items-center gap-1 ${isActive ? 'active' : ''} hover:text-[#ffcc00] opacity-90 hover:opacity-100`
                        }
                    >
                        <div className="icon-container">
                            <Icon className="w-6 h-6" strokeWidth={2} />
                        </div>
                        <span className="text-xs font-medium">{label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
