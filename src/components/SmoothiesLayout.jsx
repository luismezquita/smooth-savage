import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useT } from '../i18n/LanguageContext';

const SHOW_ALL_KEY = 'smoothiesListShowAll';

export default function SmoothiesLayout() {
    const t = useT();
    const location = useLocation();
    const [query, setQuery] = useState('');
    const [showAll, setShowAll] = useState(() => sessionStorage.getItem(SHOW_ALL_KEY) === 'true');

    // Captura el ingrediente enviado desde el vaso inteligente de Fresh o Savage o resetea el estado
    useEffect(() => {
        if (location.state?.searchIngredient) {
            setQuery(location.state.searchIngredient);
            setShowAll(false);
            window.history.replaceState({}, document.title);
        } else if (location.state?.resetSearch) {
            setQuery('');
            setShowAll(false);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Sección de cabecera y barra de búsqueda */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">{t('smoothies.title')}</h1>
                    <p className="text-gray-400 mt-1">{t('smoothies.subtitle')}</p>
                </div>

                <div className="relative max-w-md w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setShowAll(false);
                        }}
                        placeholder={t('smoothies.searchPlaceholder') || "Search ingredients or smoothies..."}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-3.5 text-sm font-medium focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    {query && (
                        <button
                            onClick={() => {
                                setQuery('');
                                setShowAll(false);
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Render the actual Smoothies grid via Outlet, passing the state */}
            <Outlet context={{ query, showAll, setShowAll }} />
        </div>
    );
}
