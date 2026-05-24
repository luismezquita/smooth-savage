import React from 'react';
import { Link } from 'react-router-dom';
import { smoothies } from '../data/smoothies';
import { useLanguage } from '../i18n/LanguageContext';
import { normalize } from '../utils/benefitColors';
import smoothiesTranslations from '../data/smoothies_translations';

export default function SmoothieLink({ baseName, translatedName }) {
    const { language } = useLanguage();

    if (!baseName || !translatedName) return null;

    // VALIDACIÓN INTELIGENTE: Búsqueda bidireccional y multilingüe
    const hasSmoothie = smoothies.some(s => {
        // 1. Array de ingredientes en el idioma actual (o en inglés si falla)
        const translatedIngredients = (language !== 'en' && smoothiesTranslations[language]?.[s.id]?.ingredients) || s.ingredients;
        
        // 2. Comprobación bidireccional en el idioma del usuario (Ej: Chino, Francés)
        const matchTranslated = translatedIngredients?.some(ing => {
            const normIng = normalize(ing);
            const normQuery = normalize(translatedName);
            return normIng.includes(normQuery) || normQuery.includes(normIng);
        });

        // 3. Comprobación bidireccional en inglés (Respaldo de seguridad)
        const matchEnglish = s.ingredients.some(ing => {
            const normIng = normalize(ing);
            const normBase = normalize(baseName);
            return normIng.includes(normBase) || normBase.includes(normIng);
        });

        return matchTranslated || matchEnglish;
    });

    // Si el ingrediente no está en ninguna receta, el vaso no se pinta
    if (!hasSmoothie) return null;

    // Si existe, dibujamos el vaso y enviamos el nombre traducido al buscador de Grok
    return (
        <Link
            to={`/search-smoothies?ingredient=${encodeURIComponent(translatedName)}`}
            className="block p-3 bg-black/80 backdrop-blur-sm rounded-full border border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 group hover:bg-black hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.22)]"
            title="Savage Smoothies"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round" className="text-white transition-all duration-300 drop-shadow-sm group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                <path d="M18 8L16.5 20C16.5 21.1 15.6 22 14.5 22H9.5C8.4 22 7.5 21.1 7.5 20L6 8" />
                <path d="M5 8H19" />
                <path d="M12 8V4M10 4H14" />
            </svg>
        </Link>
    );
}
