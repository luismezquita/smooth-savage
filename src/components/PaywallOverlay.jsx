import React from 'react';
import { Lock } from 'lucide-react';
import { useT } from '../i18n/LanguageContext';

export default function PaywallOverlay({ onClose }) {
    const t = useT();

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center pb-10 px-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
                onClick={e => e.stopPropagation()}
            >
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-orange-500" />
                </div>
                <h2 className="text-2xl font-black mb-2 text-gray-900 dark:text-white">
                    {t('paywall.title')}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                    {t('paywall.body')}
                </p>
                <div className="space-y-3">
                    <button
                        disabled
                        className="w-full bg-orange-500/70 text-white font-black py-4 px-3 rounded-2xl text-base leading-tight cursor-not-allowed"
                    >
                        {t('paywall.cta')}
                    </button>
                    <p className="text-xs text-gray-400">{t('paywall.note')}</p>
                </div>
            </div>
        </div>
    );
}
