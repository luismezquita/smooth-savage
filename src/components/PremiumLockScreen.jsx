import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import PaywallOverlay from './PaywallOverlay';

export default function PremiumLockScreen({ title = 'Premium content', onBack }) {
    const [showPaywall, setShowPaywall] = useState(false);

    return (
        <div className="min-h-[calc(100vh-64px)] px-4 py-16 flex items-center justify-center bg-fruit-light/60 dark:bg-fruit-dark/50">
            {showPaywall && <PaywallOverlay onClose={() => setShowPaywall(false)} />}
            <div className="max-w-sm w-full text-center bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-orange-500" />
                </div>
                <h1 className="text-2xl font-black mb-2 text-gray-900 dark:text-white">{title}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Unlock Premium to view the full profile, benefits, ingredients, and preparation notes.
                </p>
                <button
                    onClick={() => setShowPaywall(true)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl transition-all active:scale-95"
                >
                    Unlock Premium
                </button>
                {onBack && (
                    <button
                        onClick={onBack}
                        className="mt-4 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        Go back
                    </button>
                )}
            </div>
        </div>
    );
}
