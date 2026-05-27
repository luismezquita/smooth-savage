import React from 'react';
import { BookOpenText, CheckCircle2, Globe2, Lock, Sparkles, WifiOff } from 'lucide-react';
import { useLanguage, useT } from '../i18n/LanguageContext';
import { usePremium } from '../hooks/usePremium';

export default function PaywallOverlay({ onClose }) {
    const t = useT();
    const { language } = useLanguage();
    const { isPurchasing, premiumError, purchasePremium, restorePremium } = usePremium();
    const isArabic = language === 'ar';

    const features = [
        { icon: BookOpenText, title: t('paywall.featureRecipesTitle'), body: t('paywall.featureRecipesBody') },
        { icon: Sparkles, title: t('paywall.featureProfilesTitle'), body: t('paywall.featureProfilesBody') },
        { icon: Globe2, title: t('paywall.featureLanguagesTitle'), body: t('paywall.featureLanguagesBody') },
        { icon: WifiOff, title: t('paywall.featureOfflineTitle'), body: t('paywall.featureOfflineBody') },
    ];

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-5 sm:items-center sm:pb-0"
            style={{ background: 'rgba(8,0,24,0.82)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
        >
            <div
                className="relative max-h-[calc(100dvh-92px)] w-full max-w-md overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0d1324] p-6 text-center shadow-2xl sm:p-7"
                onClick={e => e.stopPropagation()}
                dir={isArabic ? 'rtl' : 'ltr'}
            >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-orange-500/20 to-transparent" />

                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/15 ring-1 ring-orange-400/30">
                    <Lock className="h-8 w-8 text-orange-400" />
                </div>

                <p className="relative mb-2 text-xs font-black uppercase tracking-[0.28em] text-orange-300">
                    {t('paywall.kicker')}
                </p>
                <h2 className="relative mb-3 text-3xl font-black leading-tight text-white">
                    {t('paywall.title')}
                </h2>
                <p className="relative mx-auto mb-5 max-w-xs text-sm leading-relaxed text-slate-300">
                    {t('paywall.body')}
                </p>

                <div className="relative mb-5 rounded-2xl border border-orange-300/20 bg-gradient-to-br from-orange-500/20 to-purple-500/15 px-4 py-4">
                    <p className="text-sm font-semibold text-slate-200">{t('paywall.priceIntro')}</p>
                    <p className="mt-1 text-4xl font-black text-white">$4.99</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-orange-200">{t('paywall.priceSub')}</p>
                </div>

                <div className="relative mb-5 space-y-3 text-left">
                    {features.map(({ icon: Icon, title, body }) => (
                        <div key={title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-left" dir={isArabic ? 'rtl' : 'ltr'}>
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-300">
                                <Icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-white">{title}</p>
                                <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{body}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="relative space-y-3">
                    <button
                        onClick={async () => {
                            const ok = await purchasePremium();
                            if (ok) onClose?.();
                        }}
                        disabled={isPurchasing}
                        className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-4 text-base font-black leading-tight text-white shadow-lg shadow-orange-950/30 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isPurchasing ? 'Processing…' : t('paywall.cta')}
                    </button>
                    <button
                        onClick={async () => {
                            const ok = await restorePremium();
                            if (ok) onClose?.();
                        }}
                        disabled={isPurchasing}
                        className="w-full rounded-2xl border border-white/20 bg-white/[0.05] px-4 py-3 text-sm font-bold text-slate-200 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        Restore purchase
                    </button>
                    {premiumError ? (
                        <p className="text-xs font-semibold text-rose-300">{premiumError}</p>
                    ) : null}
                    <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
                        <CheckCircle2 className="h-4 w-4 text-orange-300" />
                        <span>{t('paywall.note')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
