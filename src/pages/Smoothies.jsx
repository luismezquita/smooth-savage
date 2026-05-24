import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
    const { query, showAll, setShowAll } = useOutletContext();

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
        </>
    );
}