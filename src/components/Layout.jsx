import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

export default function Layout({ children }) {
    const location = useLocation();

    // Detectamos si el usuario está en la pantalla de bienvenida
    const isWelcome = location.pathname === '/';

    return (
        <div className={`min-h-screen pb-16 md:pb-0 flex flex-col overflow-x-hidden w-full max-w-[100vw] ${isWelcome ? 'hide-navbar-logo' : ''}`}>
            {/* Inyectamos estilos temporales CSS exclusivamente cuando cargue la Welcome Page */}
            {isWelcome && (
                <style>{`
                    .hide-navbar-logo nav h1,
                    .hide-navbar-logo nav h2,
                    .hide-navbar-logo nav span:not(:has(svg)),
                    .hide-navbar-logo .logo,
                    .hide-navbar-logo .smooth,
                    .hide-navbar-logo .savage {
                        display: none !important;
                    }
                `}</style>
            )}
            <Navbar />
            <main className="flex-grow pt-16 md:pt-20">
                {children}
            </main>
            <BottomNav />
        </div>
    );
}
