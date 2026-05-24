import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, X, ArrowLeft } from 'lucide-react';
import { smoothies } from '../data/smoothies';
import SmoothieCard from '../components/SmoothieCard';
import { useT, useLanguage } from '../i18n/LanguageContext';
import { normalize } from '../utils/benefitColors';
import smoothiesTranslations from '../data/smoothies_translations';

export default function SearchSmoothies() {
  const t = useT();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('ingredient') || '');

  // Sincronizar query si cambia el param de URL (viene desde SmoothieLink)
  useEffect(() => {
    const param = searchParams.get('ingredient') || '';
    setQuery(param);
  }, [searchParams]);

  // FILTRADO SÍNCRONO con useMemo — instantáneo, sin async
  const filtered = useMemo(() => {
    if (!query.trim()) return smoothies;
    const q = normalize(query).toLowerCase().trim();
    const qClean = q.replace(/s$/, '');
    const queryTokens = qClean.split(/\s+/).filter(Boolean);
    return smoothies.filter(s => {
      const ingredients = (language !== 'en' && smoothiesTranslations[language]?.[s.id]?.ingredients) || s.ingredients;
      const name = (language !== 'en' && smoothiesTranslations[language]?.[s.id]?.name) || s.name;
      const isMatch = (text) => {
        const normalizedText = normalize(text).toLowerCase();
        const normalizedTextClean = normalizedText.replace(/s\b/g, '');
        const tokens = normalizedText.split(/[\s,]+/).filter(Boolean);

        return (
          normalizedText.includes(qClean) ||
          normalizedTextClean.includes(qClean) ||
          queryTokens.every(queryToken =>
            tokens.some(token => token.replace(/s$/, '') === queryToken)
          )
        );
      };
      return isMatch(name) || ingredients.some(isMatch);
    });
  }, [query, language]);

  return (
    <div className="min-h-[100dvh] w-full bg-fruit-dark pb-24 overflow-x-hidden">

      {/* Header con back button */}
      <div className="sticky top-16 z-10 bg-fruit-dark/95 backdrop-blur-sm border-b border-white/5 px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('smoothies.searchPlaceholder')}
              autoFocus
              className="w-full pl-12 pr-10 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-white">
          {query
            ? `${filtered.length} smoothie${filtered.length !== 1 ? 's' : ''} · ${query}`
            : t('smoothies.allHeading')
          }
        </h2>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 mt-12">{t('smoothies.noResults')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {filtered.map((smoothie, i) => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} index={i} locked={i >= 8} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
