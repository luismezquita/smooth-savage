import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { savageFoods } from '../data/superfoods';
import SuperfoodCard from '../components/SuperfoodCard';
import { useT, useLanguage } from '../i18n/LanguageContext';
import itemNamesI18n from '../data/item_names_i18n';
import { normalize } from '../utils/benefitColors';
import { isSavagePremium } from '../utils/premiumAccess';

const INITIAL_LIMIT = 8;
const SCROLL_KEY = 'savageListScrollPos';
const SHOW_ALL_KEY = 'savageListShowAll';

export default function Savage() {
    const t = useT();
    const { language } = useLanguage();
    const [showAll, setShowAll] = useState(() => sessionStorage.getItem(SHOW_ALL_KEY) === 'true');
    const [query, setQuery] = useState('');
    const heroRef = useRef(null);
    const [searchVisible, setSearchVisible] = useState(false);

    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setSearchVisible(!entry.isIntersecting),
            { threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

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
        ? savageFoods.filter(f => normalize(itemNamesI18n[language]?.[f.id] || f.name).includes(normalize(query)))
        : savageFoods;

    const displaySavage = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT);
    const hasMore = !showAll && filtered.length > INITIAL_LIMIT;

    const handleQueryChange = (val) => {
        setQuery(val);
        setShowAll(false);
    };

    return (
        <div className="min-h-screen pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

            {/* Hero with title overlay */}
            <div ref={heroRef} className="savage-hero-glow w-screen relative left-1/2 -translate-x-1/2 mb-10 overflow-hidden" style={{ height: 'calc(100dvh - 60px)' }}>
                <img src="/images/savage/cover_hero.jpg" className="w-full h-full object-cover object-center" alt="" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(30,0,60,0.7) 0%, transparent 40%)' }} />
                <div className="absolute top-0 left-0 right-0 pt-8 text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-black mb-2 text-white">{t('savage.title')}</h1>
                    <p className="text-base text-gray-200">{t('savage.subtitle')}</p>
                </div>
            </div>

            {/* Search bar — visible only after hero leaves viewport */}
            <div className={`max-w-xl mx-auto mb-8 ${searchVisible ? '' : 'hidden'}`}>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" style={{ color: '#F97316' }} />
                    <input
                        type="text"
                        value={query}
                        onChange={e => handleQueryChange(e.target.value)}
                        placeholder={t('savage.searchPlaceholder')}
                        className="savage-search w-full pl-12 pr-10 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                        style={{ background: '#FFF8F0', border: '2px solid #F97316', color: '#111827' }}
                    />
                    {query && (
                        <button onClick={() => handleQueryChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                {query && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                        {filtered.length !== 1
                            ? t('savage.searchResultsPlural', { n: filtered.length, query })
                            : t('savage.searchResults', { n: filtered.length, query })}
                    </p>
                )}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-14 max-w-xl mx-auto mb-12">
                {displaySavage.map((food, i) => (
                    <div
                        key={food.id || i}
                        onClickCapture={() => {
                            sessionStorage.setItem(SCROLL_KEY, window.scrollY);
                            sessionStorage.setItem(SHOW_ALL_KEY, showAll);
                        }}
                    >
                        <SuperfoodCard superfood={food} index={i} locked={isSavagePremium(food.id)} />
                    </div>
                ))}
                {filtered.length === 0 && (
                    <p className="text-center text-gray-400 py-8">{t('savage.noResults', { query })}</p>
                )}
            </div>

            {hasMore && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => setShowAll(true)}
                        className="group flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                    >
                        {t('savage.viewAll')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                    </button>
                </div>
            )}
        </div>
    );
}
