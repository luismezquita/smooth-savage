import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations from './translations';

// ─── Context ──────────────────────────────────────────────────────────────────
const LanguageContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('ss_language') || 'en';
    });

    // Apply lang + RTL on mount and on change
    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    const changeLanguage = useCallback((code) => {
        localStorage.setItem('ss_language', code);
        setLanguage(code);
    }, []);

    // t(key) — dot-notation path e.g. 'nav.fresh', 'detail.dailyTip'
    // Supports {placeholder} interpolation: t('home.noResults', { query: 'apple' })
    const t = useCallback((key, vars = {}) => {
        const lang = translations[language] || translations.en;
        const fallback = translations.en;

        const resolve = (obj, path) => {
            return path.split('.').reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);
        };

        let str = resolve(lang, key) ?? resolve(fallback, key) ?? key;

        // Replace {placeholder} tokens
        Object.entries(vars).forEach(([k, v]) => {
            str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        });

        return str;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
    return ctx;
}

// Convenience alias
export function useT() {
    return useLanguage().t;
}
