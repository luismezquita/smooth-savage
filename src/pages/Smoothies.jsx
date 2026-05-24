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
    const location = useLocation();

    // 1. ESTADO: Solo inicializamos con el state si realmente existe
    const [query, setQuery] = useState(location.state?.searchIngredientId || '');
    const [showAll, setShowAll] = useState(() => sessionStorage.getItem(SHOW_ALL_KEY) === 'true');

    // 2. EFECTO: Si navegamos desde el icono, limpiamos cualquier rastro
    useEffect(() => {
        if (!location.state?.searchIngredientId) {
            setQuery('');
            setShowAll(false);
        }
    }, [location.pathname]);

    const filtered = query.trim()
        ? smoothies.filter(s => {
            const q = normalize(query).toLowerCase();
            const ingredients = (language !== 'en' && smoothiesTranslations[language]?.[s.id]?.ingredients) || s.ingredients;
            const name = (language !== 'en' && smoothiesTranslations[language]?.[s.id]?.name) || s.name;
            
            const isMatch = (text) => {
                const tokens = normalize(text).toLowerCase().split(/[\s,]+/);
                const qClean = q.replace(/s$/, '');
                return tokens.some(token => token.replace(/s$/, '') === qClean);
            };

            return isMatch(name) || ingredients.some(isMatch);
        })
        : smoothies;

    const displayed = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT);
    const hasMore = !showAll && filtered.length > INITIAL_LIMIT;

    return (
        <div className="min-h-[100dvh] w-full bg-fruit-dark pb-24 overflow-x-hidden">
            
            {/* HERO: Solo visible si NO hay query (llegada por icono) */}
            {!query && (
                <div className="flex flex-col h-[60dvh]">
                    <div className="w-full flex-1 overflow-hidden">
                        <img src="/images/smoothies/smooth_savage.jpg" alt="Savage Smoothies" className="w-full h-full object-cover object-[50%_70%]" />
                    </div>
                    <div className="w-full px-4 py-6 text-center bg-fruit-dark">
                        <p className="font-black italic text-4xl" style={{ color: '#F5E6C8' }}>{t('smoothies.slogan1')}</p>
                    </div>
                </div>
            )}

            <div className={`px-4 py-8 max-w-7xl mx-auto ${query ? 'pt-24' : ''}`}>
                <div className="mb-8">
                    {/* Título dinámico */}
                    <h2 className="text-3xl font-bold mb-4 text-white">
                        {query ? t('smoothies.searchResults', { n: filtered.length, query }) : t('smoothies.allHeading')}
                    </h2>
                    
                    <div className="relative w-full max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={e => { setQuery(e.target.value); setShowAll(true); }}
                            placeholder={t('smoothies.searchPlaceholder')}
                            className="w-full pl-12 pr-10 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                        {query && (
                            <button onClick={() => { setQuery(''); setShowAll(false); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {displayed.map((smoothie, i) => (
                        <div key={smoothie.id}>
                            <SmoothieCard smoothie={smoothie} index={i} locked={i >= 8} />
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && <p className="text-center text-gray-400 mt-12">{t('smoothies.noResults')}</p>}
            </div>
        </div>
    );
}