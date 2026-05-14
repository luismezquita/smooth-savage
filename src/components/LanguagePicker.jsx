import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const LANGUAGES = [
    { code: 'en', label: 'English',   native: 'English',    flag: '🇬🇧', dir: 'ltr' },
    { code: 'zh', label: 'Chinese',   native: '中文',        flag: '🇨🇳', dir: 'ltr' },
    { code: 'ja', label: 'Japanese',  native: '日本語',      flag: '🇯🇵', dir: 'ltr' },
    { code: 'ko', label: 'Korean',    native: '한국어',      flag: '🇰🇷', dir: 'ltr' },
    { code: 'es', label: 'Spanish',   native: 'Español',    flag: '🇪🇸', dir: 'ltr' },
    { code: 'ar', label: 'Arabic',    native: 'العربية',    flag: '🇸🇦', dir: 'rtl' },
    { code: 'fr', label: 'French',    native: 'Français',   flag: '🇫🇷', dir: 'ltr' },
];

export default function LanguagePicker({ isOpen, onClose }) {
    const { language, changeLanguage, t } = useLanguage();
    const [closing, setClosing] = useState(false);
    const autoCloseRef = React.useRef(null);

    useEffect(() => {
        if (!isOpen) setClosing(false);
    }, [isOpen]);

    const handleClose = () => {
        if (autoCloseRef.current) {
            clearTimeout(autoCloseRef.current);
            autoCloseRef.current = null;
        }
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            onClose();
        }, 450);
    };

    const handleSelect = (code) => {
        changeLanguage(code);
        if (autoCloseRef.current) clearTimeout(autoCloseRef.current);
        autoCloseRef.current = setTimeout(() => handleClose(), 3500);
    };

    if (!isOpen && !closing) return null;

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 backdrop-blur-sm transition-all duration-280"
                style={{
                    zIndex: 9998,
                    backgroundColor: closing ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.4)',
                    transition: 'background-color 0.28s ease',
                }}
                onClick={handleClose}
            />

            {/* Bottom Sheet */}
            <div
                className="fixed bottom-0 left-0 right-0"
                style={{
                    zIndex: 9999,
                    transform: closing ? 'translateY(100%)' : 'translateY(0)',
                    transition: closing
                        ? 'transform 0.45s cubic-bezier(0.32, 0.72, 0, 1)'
                        : 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
                    animation: closing ? 'none' : 'slideUp 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
                }}
            >
                <style>{`
                    @keyframes slideUp {
                        from { transform: translateY(100%); }
                        to { transform: translateY(0); }
                    }
                `}</style>

                <div className="rounded-t-3xl shadow-2xl px-6 pt-5 pb-10 max-w-lg mx-auto" style={{ background: '#3D0070' }}>

                    {/* Handle bar */}
                    <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: 'rgba(245,230,200,0.3)' }} />

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold" style={{ color: '#F5E6C8' }}>{t('langPicker.title')}</h2>
                        <button
                            onClick={handleClose}
                            className="p-2 rounded-full transition-colors"
                            style={{ background: 'rgba(245,230,200,0.1)', color: '#F5E6C8' }}
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
                                    onClick={() => handleSelect(lang.code)}
                                    className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 border-2"
                                    style={{
                                        borderColor: isSelected ? '#F97316' : 'transparent',
                                        background: isSelected ? 'rgba(249,115,22,0.12)' : 'rgba(255,255,255,0.05)',
                                    }}
                                >
                                    <span className="text-3xl">{lang.flag}</span>
                                    <div className="flex flex-col items-start">
                                        <span className="font-semibold text-base" style={{ color: '#F5E6C8' }}>
                                            {lang.native}
                                        </span>
                                        <span className="text-xs" style={{ color: 'rgba(245,230,200,0.6)' }}>{lang.label}</span>
                                    </div>
                                    {isSelected && (
                                        <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#F97316' }}>
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Done button */}
                    <button
                        onClick={handleClose}
                        className="mt-5 w-full py-3.5 rounded-2xl font-bold text-base text-white transition-colors duration-200"
                        style={{ background: '#F97316' }}
                    >
                        {t('langPicker.done')}
                    </button>
                </div>
            </div>
        </>,
        document.body
    );
}
