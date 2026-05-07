import React from 'react';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen pb-16 md:pb-0 flex flex-col overflow-x-hidden w-full max-w-[100vw]">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <BottomNav />
        </div>
    );
}
