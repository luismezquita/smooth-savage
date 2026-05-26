import React from 'react';
import { Link } from 'react-router-dom';
import { smoothies } from '../data/smoothies';
import { normalize } from '../utils/benefitColors';

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

export default function SmoothieLink({ ingredientId, baseName, translatedName }) {
    if (!baseName || !translatedName) return null;

    const baseQuery = canonical(baseName);
    const baseQueryLoose = canonicalLooseSingular(baseName);

    // Mostrar vaso solo cuando existe una coincidencia real de ingrediente
    const hasSmoothie = smoothies.some(s => {
        return s.ingredients.some((ing) => {
            const c = canonical(ing);
            const cl = canonicalLooseSingular(ing);
            return c === baseQuery || cl === baseQueryLoose;
        });
    });

    // Si el ingrediente no está en ninguna receta, el vaso no se pinta
    if (!hasSmoothie) return null;

    const params = new URLSearchParams({
        ingredientId: ingredientId || '',
        ingredient: translatedName,
        baseIngredient: baseName,
    });

    // Si existe, dibujamos el vaso y enviamos el nombre visible junto con la llave base
    return (
        <Link
            to={`/search-smoothies?${params.toString()}`}
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
