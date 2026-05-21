import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

export default function Layout({ children }) {
    const location = useLocation();
    const isWelcomePage = location.pathname === '/';

    return (
        <div className="min-h-screen pb-16 md:pb-0 flex flex-col overflow-x-hidden w-full max-w-[100vw]">
            {!isWelcomePage && <Navbar />}
            <main className="flex-grow">
                {children}
            </main>
            {!isWelcomePage && <BottomNav />}
        </div>
    );
}
