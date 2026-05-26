import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, X, ArrowLeft } from 'lucide-react';
import { smoothies } from '../data/smoothies';
import SmoothieCard from '../components/SmoothieCard';
import { useT, useLanguage } from '../i18n/LanguageContext';
import { normalize } from '../utils/benefitColors';
import smoothiesTranslations from '../data/smoothies_translations';
import { isSmoothiePremium } from '../utils/premiumAccess';
import { fruits } from '../data/fruits';
import { savageFoods } from '../data/superfoods';
import itemNamesI18n from '../data/item_names_i18n';

const canonical = (value) =>
  normalize(value || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const singularizeToken = (token) => {
  if (!token || token.length <= 3) return token;
  if (/[aeiou]ces$/i.test(token) && token.length > 4) return `${token.slice(0, -3)}z`;
  if (token.endsWith('ies') && token.length > 4) return `${token.slice(0, -3)}y`;
  if (/(oes|ses|xes|zes|ches|shes)$/i.test(token) && token.length > 4) return token.slice(0, -2);
  if (token.endsWith('s') && !token.endsWith('ss')) return token.slice(0, -1);
  return token;
};

const canonicalLooseSingular = (value) =>
  canonical(value)
    .split(' ')
    .map(singularizeToken)
    .join(' ')
    .trim();

const tokenize = (value) =>
  canonical(value)
    .split(' ')
    .filter(Boolean)
    .map(singularizeToken);

export default function SearchSmoothies() {
  const t = useT();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [ingredientId, setIngredientId] = useState(() => searchParams.get('ingredientId') || '');
  const [query, setQuery] = useState(() => searchParams.get('ingredient') || '');
  const [baseQuery, setBaseQuery] = useState(() => searchParams.get('baseIngredient') || '');

  // Sincronizar query si cambia el param de URL (viene desde SmoothieLink)
  useEffect(() => {
    const idParam = searchParams.get('ingredientId') || '';
    const param = searchParams.get('ingredient') || '';
    const baseParam = searchParams.get('baseIngredient') || '';
    setIngredientId(idParam);
    setQuery(param);
    setBaseQuery(baseParam);
  }, [searchParams]);

  // FILTRADO SÍNCRONO con useMemo
  const filtered = useMemo(() => {
    if (!query.trim()) return smoothies;

    const item = ingredientId
      ? [...fruits, ...savageFoods].find((entry) => entry.id === ingredientId)
      : null;

    const translatedById = ingredientId ? itemNamesI18n[language]?.[ingredientId] : '';
    const exactMode = Boolean(ingredientId);

    if (exactMode) {
      // En modo detalle (vaso), priorizamos el ingrediente canónico por ID/base
      // para evitar colisiones semánticas entre traducciones de distintos ingredientes.
      const exactCandidates = new Set(
        [baseQuery, item?.name]
          .filter(Boolean)
          .flatMap((raw) => {
            const strict = canonical(raw);
            const loose = canonicalLooseSingular(raw);
            return [strict, loose].filter(Boolean);
          })
      );

      if (exactCandidates.size === 0) return [];

      return smoothies.filter((s) => {
        return s.ingredients.some((ing) => {
          const strict = canonical(ing);
          const loose = canonicalLooseSingular(ing);
          return exactCandidates.has(strict) || exactCandidates.has(loose);
        });
      });
    }

    const searchPhrase = canonical(query);
    const queryTokens = tokenize(query);

    const isLooseMatch = (text) => {
      const strict = canonical(text);
      if (!strict) return false;
      if (strict.includes(searchPhrase)) return true;
      if (queryTokens.length === 0) return false;
      const textTokens = tokenize(text);
      return queryTokens.every((qToken) => textTokens.includes(qToken));
    };

    return smoothies.filter(s => {
      const ingredients = (language !== 'en' && smoothiesTranslations[language]?.[s.id]?.ingredients) || s.ingredients;
      const name = (language !== 'en' && smoothiesTranslations[language]?.[s.id]?.name) || s.name;
      const translatedFields = [name, ...ingredients];
      const englishFields = [s.name, ...s.ingredients];

      return (
        translatedFields.some(isLooseMatch) ||
        englishFields.some(isLooseMatch)
      );
    });
  }, [query, baseQuery, ingredientId, language]);

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
              <SmoothieCard key={smoothie.id} smoothie={smoothie} index={i} locked={isSmoothiePremium(smoothie.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
