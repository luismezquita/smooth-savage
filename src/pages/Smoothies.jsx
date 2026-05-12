import React, { useState, useEffect } from 'react';
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
            return ingredients?.some(ing => normalize(ing).includes(normalize(query)));
        })
        : smoothies;

    const displayed = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT);
    const hasMore = !showAll && filtered.length > INITIAL_LIMIT;

    const handleQueryChange = (val) => {
        setQuery(val);
        setShowAll(false);
    };

    return (
        <>
            {/* Hero + slogan — full viewport cover */}
            <div className="flex flex-col" style={{ height: 'calc(100dvh - 60px)' }}>
                {/* Hero image — flexible, takes available space */}
                <div className="w-full flex-1 overflow-hidden">
                    <img
                        src="/images/smoothies/smooth_savage.jpg"
                        alt="Savage Smoothies"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                {/* Slogan — fixed at bottom of cover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    dir="ltr"
                    className="w-full px-4 py-6 text-center bg-fruit-dark flex flex-col items-center justify-center"
                >
                <p className="font-black italic tracking-wide leading-tight whitespace-nowrap" style={{ color: '#F5E6C8', fontSize: 'clamp(1.4rem, 7vw, 3rem)' }}>
                    {t('smoothies.slogan1')}
                </p>
                <p
                    className="font-black italic tracking-wide leading-tight whitespace-nowrap"
                    style={{
                        fontSize: 'clamp(1.4rem, 7vw, 3rem)',
                        backgroundImage: 'url(/images/fresh/savage_fill.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    {t('smoothies.slogan2')}
                </p>
                </motion.div>
            </div>

            {/* Padded content */}
            <div className="min-h-screen pt-8 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">{t('smoothies.allHeading')}</h2>
                        <p className="text-gray-500 dark:text-gray-400">{t('smoothies.allSub')}</p>
                    </div>
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
        </>
    );
}
