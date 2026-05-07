import React, { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { smoothies } from '../data/smoothies';
import smoothiesTranslations from '../data/smoothies_translations';
import SmoothieCard from '../components/SmoothieCard';
import { useLanguage } from '../i18n/LanguageContext';

const Search = () => {
    const { t, language } = useLanguage();
    const [query, setQuery] = useState('');
    const inputRef = React.useRef(null);
    const q = query.trim().toLowerCase();

    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (inputRef.current) inputRef.current.focus();
    }, []);

    const results = q
        ? smoothies.filter(s => {
            const tr = language !== 'en' ? smoothiesTranslations[language]?.[s.id] : null;
            const name = (tr?.name || s.name || '').toLowerCase();
            const ingredients = tr?.ingredients || s.ingredients || [];
            return name.includes(q) || ingredients.some(ing => ing.toLowerCase().includes(q));
        })
        : smoothies;

    return (
        <div className="max-w-6xl mx-auto px-4 pb-24 min-h-screen font-sans">
            <div className="relative my-8">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-fruit-green w-5 h-5" />
                <input
                    ref={inputRef}
                    type="text"
                    className="w-full pl-12 pr-10 py-5 rounded-3xl bg-white dark:bg-gray-800 shadow-xl border-none text-lg focus:outline-none focus:ring-2 focus:ring-fruit-green"
                    placeholder={t('search.placeholder')}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                {query && (
                    <button
                        onClick={() => setQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {q && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                    {results.length > 0
                        ? (results.length === 1
                            ? t('smoothies.searchResults', { n: results.length, query })
                            : t('smoothies.searchResultsPlural', { n: results.length, query }))
                        : t('search.noResults')}
                </p>
            )}

            {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
                    {results.map((s, i) => (
                        <SmoothieCard key={s.id} smoothie={s} index={i} />
                    ))}
                </div>
            ) : (
                q && (
                    <div className="text-center py-20 opacity-30 text-lg">{t('search.noResults')}</div>
                )
            )}
        </div>
    );
};

export default Search;
