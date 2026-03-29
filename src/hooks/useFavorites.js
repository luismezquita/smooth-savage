import { useState, useEffect, useCallback } from 'react';

const FAV_EVENT = 'vitafrut-fav-update';

export function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('vitafrut-favorites');
            if (saved) return JSON.parse(saved);
        }
        return [];
    });

    useEffect(() => {
        const syncState = () => {
            const saved = localStorage.getItem('vitafrut-favorites');
            if (saved) setFavorites(JSON.parse(saved));
        };
        window.addEventListener(FAV_EVENT, syncState);
        return () => window.removeEventListener(FAV_EVENT, syncState);
    }, []);

    const toggleFavorite = useCallback((item) => {
        setFavorites(prev => {
            const exists = prev.find(fav => fav.id === item.id);
            const newState = exists 
                ? prev.filter(fav => fav.id !== item.id)
                : [...prev, item];
            
            localStorage.setItem('vitafrut-favorites', JSON.stringify(newState));
            window.dispatchEvent(new Event(FAV_EVENT));
            return newState;
        });
    }, []);

    const isFavorite = useCallback((id) => favorites.some(fav => fav.id === id), [favorites]);

    return { favorites, toggleFavorite, isFavorite };
}
