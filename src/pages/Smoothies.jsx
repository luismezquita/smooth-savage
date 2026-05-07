import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, X } from 'lucide-react';
import { smoothies } from '../data/smoothies';
import SmoothieCard from '../components/SmoothieCard';
import { useT, useLanguage } from '../i18n/LanguageContext';
import smoothiesTranslations from '../data/smoothies_translations';

const INITIAL_LIMIT = 10;
const SCROLL_KEY = 'smoothiesListScrollPos';
const SHOW_ALL_KEY = 'smoothiesListShowAll';

export default function Smoothies() {
    const t = useT();
    const { language } = useLanguage();
    const [query, setQuery] = useState('');
    const [showAll, setShowAll] = useState(() => sessionStorage.getItem(SHOW_ALL_KEY) === 'true');

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
            return ingredients?.some(ing => ing.toLowerCase().includes(query.toLowerCase()));
        })
        : smoothies;

    const displayed = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT);
    const hasMore = !showAll && filtered.length > INITIAL_LIMIT;

    const handleQueryChange = (val) => {
        setQuery(val);
        setShowAll(false);
    };

    return (
        <div className="min-h-screen pt-8 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center max-w-2xl mx-auto"
            >
                <h1 className="text-4xl md:text-5xl font-black mb-4">{t('smoothies.title')}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    {t('smoothies.subtitle')}
                </p>
            </motion.div>

            {/* Hero image */}
            <div className="w-screen relative left-1/2 -translate-x-1/2 mb-10 aspect-square overflow-hidden">
                <img
                    src="/images/smoothies/mesozoic_fiber.webp"
                    alt="Savage Smoothies"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Ingredient search bar */}
            <div className="max-w-xl mx-auto mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        value={query}
                        onChange={e => handleQueryChange(e.target.value)}
                        placeholder={t('smoothies.searchPlaceholder')}
                        className="w-full pl-12 pr-10 py-3 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                    {query && (
                        <button
                            onClick={() => handleQueryChange('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                {query && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                        {filtered.length !== 1
                            ? t('smoothies.searchResultsPlural', { n: filtered.length, query })
                            : t('smoothies.searchResults', { n: filtered.length, query })}
                    </p>
                )}
            </div>

            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">{t('smoothies.allHeading')}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{t('smoothies.allSub')}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
                {displayed.map((smoothie, i) => (
                    <div
                        key={smoothie.id}
                        onClickCapture={() => {
                            sessionStorage.setItem(SCROLL_KEY, window.scrollY);
                            sessionStorage.setItem(SHOW_ALL_KEY, showAll);
                        }}
                    >
                        <SmoothieCard smoothie={smoothie} index={i} />
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
    );
}