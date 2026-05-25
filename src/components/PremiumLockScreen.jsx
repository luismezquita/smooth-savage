import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import PaywallOverlay from './PaywallOverlay';
import { useT } from '../i18n/LanguageContext';

export default function PremiumLockScreen({ title, onBack }) {
    const [showPaywall, setShowPaywall] = useState(false);
    const t = useT();

    return (
        <div className="min-h-[calc(100vh-64px)] px-4 py-16 flex items-center justify-center bg-fruit-light/60 dark:bg-fruit-dark/50">
            {showPaywall && <PaywallOverlay onClose={() => setShowPaywall(false)} />}
            <div className="max-w-sm w-full text-center bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-orange-500" />
                </div>
                <h1 className="text-2xl font-black mb-2 text-gray-900 dark:text-white">{title || t('premiumLock.title')}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {t('premiumLock.description')}
                </p>
                <button
                    onClick={() => setShowPaywall(true)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-3 rounded-2xl leading-tight transition-all active:scale-95"
                >
                    {t('premiumLock.unlock')}
                </button>
                {onBack && (
                    <button
                        onClick={onBack}
                        className="mt-4 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        {t('premiumLock.goBack')}
                    </button>
                )}
            </div>
        </div>
    );
}
