import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, X } from 'lucide-react';
import { smoothies } from '../data/smoothies';
import SmoothieCard from '../components/SmoothieCard';
import { useT, useLanguage } from '../i18n/LanguageContext';
import { normalize } from '../utils/benefitColors';
import smoothiesTranslations from '../data/smoothies_translations';

const INITIAL_LIMIT = 10;
const SCROLL_KEY = 'smoothiesListScrollPos';
const SHOW_ALL_KEY = 'smoothiesListShowAll';

export default function Smoothies() {
    const t = useT();
    const { language } = useLanguage();
    const [query, setQuery] = useState('');
    const [showAll, setShowAll] = useState(() => sessionStorage.getItem(SHOW_ALL_KEY) === 'true');
    const location = useLocation();

    // Captura el ingrediente enviado desde el vaso inteligente de Fresh o Savage
    useEffect(() => {
        if (location.state?.searchIngredient) {
            setQuery(location.state.searchIngredient);
            setShowAll(false);
            // Limpia el estado de la navegación para evitar que se quede fijo al recargar
            window.history.replaceState({}, document.title);
        } else if (location.state?.resetSearch) {
            setQuery('');
            setShowAll(false);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    useEffect(() => {
        const saved = sessionStorage.getItem(SCROLL_KEY);
        if (saved !== null) {
            const pos = parseInt(saved, 10);
            sessionStorage.removeItem(SCROLL_KEY);
            sessionStorage.removeItem(SHOW_ALL_KEY);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    window.scrollTo(0, pos);
                });
            });
        } else {
            window.scrollTo(0, 0);
        }
    }, []);

    const filtered = query.trim()
        ? smoothies.filter(s => {
            const ingredients = (language !== 'en' && smoothiesTranslations[language]?.[s.id]?.ingredients) || s.ingredients;
            const name = (language !== 'en' && smoothiesTranslations[language]?.[s.id]?.name) || s.name;
            const normalizedQuery = normalize(query);
            
            return normalize(name).includes(normalizedQuery) || 
                   ingredients.some(ing => normalize(ing).includes(normalizedQuery));
        })
        : smoothies;

    const hasMore = !showAll && filtered.length > INITIAL_LIMIT;
    const displayed = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT);

    return (
        <>
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
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t('smoothies.searchPlaceholder') || "Search ingredients or smoothies..."}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-3.5 text-sm font-medium focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        {query && (
                            <button 
                                onClick={() => setQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Grid de renderizado de batidos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {displayed.map((smoothie, i) => (
                        <div
                            key={smoothie.id}
                            onClickCapture={() => {
                                sessionStorage.setItem(SCROLL_KEY, window.scrollY);
                                sessionStorage.setItem(SHOW_ALL_KEY, showAll);
                            }}
                        >
                            <SmoothieCard smoothie={smoothie} index={i} locked={i >= 8} />
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <p className="text-center text-gray-400 mt-12">{t('smoothies.noResults')}</p>
                )}

                {hasMore && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={() => setShowAll(true)}
                            className="group flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                        >
                            {t('smoothies.viewAll')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}