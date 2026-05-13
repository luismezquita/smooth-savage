import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, DatabaseZap, BarChart2, Heart, WifiOff, Share2, Baby, Mail } from 'lucide-react';
import { useT } from '../i18n/LanguageContext';

const Item = ({ icon: Icon, title, children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="rounded-2xl p-6 border border-white/10"
        style={{ background: 'rgba(255,255,255,0.05)' }}
    >
        <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl" style={{ background: 'rgba(249,115,22,0.15)' }}>
                <Icon className="w-5 h-5" style={{ color: '#F97316' }} />
            </div>
            <h2 className="text-base font-black tracking-wide" style={{ color: '#F97316' }}>{title}</h2>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: '#F5E6C8' }}>{children}</p>
    </motion.div>
);

export default function PrivacyPolicy() {
    const t = useT();

    return (
        <div className="min-h-screen pb-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto pt-10">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <h1 className="text-3xl font-black mb-2" style={{ color: '#F5E6C8' }}>{t('privacy.title')}</h1>
                <p className="text-sm font-black mb-1" dir="ltr" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <span style={{ color: '#F5E6C8' }}>Smooth</span>
                    <span style={{ color: '#F97316' }}> Savage</span>
                </p>
                <p className="text-xs opacity-50 uppercase tracking-widest" style={{ color: '#F5E6C8' }}>{t('privacy.effectiveDate')}</p>
            </motion.div>

            {/* Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="rounded-2xl p-6 mb-5 border border-orange-500/30"
                style={{ background: 'rgba(249,115,22,0.08)' }}
            >
                <div className="flex items-center gap-3 mb-3">
                    <ShieldCheck className="w-6 h-6" style={{ color: '#F97316' }} />
                    <h2 className="text-base font-black" style={{ color: '#F97316' }}>{t('privacy.overviewTitle')}</h2>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#F5E6C8' }}>
                    {t('privacy.overviewText')}
                </p>
            </motion.div>

            <div className="flex flex-col gap-4">
                <Item icon={DatabaseZap} title={t('privacy.noDataTitle')} delay={0.1}>
                    {t('privacy.noDataText')}
                </Item>

                <Item icon={BarChart2} title={t('privacy.noTrackingTitle')} delay={0.15}>
                    {t('privacy.noTrackingText')}
                </Item>

                <Item icon={Heart} title={t('privacy.favoritesTitle')} delay={0.2}>
                    {t('privacy.favoritesText')}
                </Item>

                <Item icon={WifiOff} title={t('privacy.offlineTitle')} delay={0.25}>
                    {t('privacy.offlineText')}
                </Item>

                <Item icon={Share2} title={t('privacy.noSharingTitle')} delay={0.3}>
                    {t('privacy.noSharingText')}
                </Item>

                <Item icon={Baby} title={t('privacy.childrenTitle')} delay={0.35}>
                    {t('privacy.childrenText')}
                </Item>

                <Item icon={Mail} title={t('privacy.contactTitle')} delay={0.4}>
                    {t('privacy.contactText')}{' '}
                    <a
                        href="mailto:luismezquita@gmail.com"
                        className="underline underline-offset-2 font-semibold"
                        style={{ color: '#F97316' }}
                    >
                        luismezquita@gmail.com
                    </a>
                </Item>
            </div>
        </div>
    );
}
