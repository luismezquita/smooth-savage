import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const LANGUAGES = [
    { code: 'en', label: 'English',   native: 'English',    flag: '🇬🇧', dir: 'ltr' },
    { code: 'zh', label: 'Chinese',   native: '中文',        flag: '🇨🇳', dir: 'ltr' },
    { code: 'ja', label: 'Japanese',  native: '日本語',      flag: '🇯🇵', dir: 'ltr' },
    { code: 'ko', label: 'Korean',    native: '한국어',      flag: '🇰🇷', dir: 'ltr' },
    { code: 'es', label: 'Spanish',   native: 'Español',    flag: '🇪🇸', dir: 'ltr' },
    { code: 'ar', label: 'Arabic',    native: 'العربية',    flag: '🇸🇦', dir: 'rtl' },
];

export function useLanguage() {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('ss_language') || 'en';
    });

    const changeLanguage = (code) => {
        localStorage.setItem('ss_language', code);
        setLanguage(code);
        document.documentElement.lang = code;
        // RTL support will be activated when translations are added
    };

    useEffect(() => {
        document.documentElement.lang = language;
    }, []);

    return { language, changeLanguage, languages: LANGUAGES };
}

export default function LanguagePicker({ isOpen, onClose, language, changeLanguage }) {
    if (!isOpen) return null;

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                style={{ zIndex: 9998 }}
                onClick={onClose}
            />

            {/* Bottom Sheet */}
            <div className="fixed bottom-0 left-0 right-0 animate-slide-up" style={{ zIndex: 9999 }}>
                <div className="bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl px-6 pt-5 pb-10 max-w-lg mx-auto">

                    {/* Handle bar */}
                    <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-5" />

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Language</h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Language List */}
                    <div className="space-y-2">
                        {LANGUAGES.map((lang) => {
                            const isSelected = language === lang.code;
                            return (
                                <button
                                    key={lang.code}
                                    onClick={() => { changeLanguage(lang.code); onClose(); }}
                                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                                        isSelected
                                            ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-500'
                                            : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600'
                                    }`}
                                >
                                    <span className="text-3xl">{lang.flag}</span>
                                    <div className="flex flex-col items-start">
                                        <span className={`font-semibold text-base ${isSelected ? 'text-green-700 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                                            {lang.native}
                                        </span>
                                        <span className="text-xs text-gray-400">{lang.label}</span>
                                    </div>
                                    {isSelected && (
                                        <div className="ml-auto w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}
