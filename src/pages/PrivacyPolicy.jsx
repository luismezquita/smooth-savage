import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, DatabaseZap, BarChart2, Heart, WifiOff, Share2, Baby, Mail } from 'lucide-react';

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
    return (
        <div className="min-h-screen pb-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto pt-10">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <h1 className="text-3xl font-black mb-2" style={{ color: '#F5E6C8' }}>Privacy Policy</h1>
                <p className="text-sm font-black mb-1" dir="ltr" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <span style={{ color: '#F5E6C8' }}>Smooth</span>
                    <span style={{ color: '#F97316' }}> Savage</span>
                </p>
                <p className="text-xs opacity-50 uppercase tracking-widest" style={{ color: '#F5E6C8' }}>Effective date: May 2026</p>
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
                    <h2 className="text-base font-black" style={{ color: '#F97316' }}>Overview</h2>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#F5E6C8' }}>
                    Smooth Savage is a mobile app designed to help you discover fresh foods, superfoods, and smoothie recipes. We built it with privacy in mind — the app does not collect, store, or transmit any personal information.
                </p>
            </motion.div>

            <div className="flex flex-col gap-4">
                <Item icon={DatabaseZap} title="No personal data collected" delay={0.1}>
                    No name, email, phone, location, or any other personal information is collected. The app functions entirely without an account or login.
                </Item>

                <Item icon={BarChart2} title="No tracking or analytics" delay={0.15}>
                    Smooth Savage does not use analytics tools, advertising trackers, or usage monitoring of any kind. We have no knowledge of how you use the app.
                </Item>

                <Item icon={Heart} title="Favorites stored locally only" delay={0.2}>
                    Items you mark as favorites are stored exclusively on your device using local storage. This data never leaves your device and is never shared.
                </Item>

                <Item icon={WifiOff} title="Offline-first app" delay={0.25}>
                    Smooth Savage is designed to work without an internet connection. Content is cached on your device for offline use, keeping your data private.
                </Item>

                <Item icon={Share2} title="No third-party sharing" delay={0.3}>
                    We do not sell, trade, or share any data with third parties — because we don't collect any data to begin with.
                </Item>

                <Item icon={Baby} title="Children's privacy" delay={0.35}>
                    This app does not knowingly collect data from children under 13. Since no data is collected from any user, children can use the app safely.
                </Item>

                <Item icon={Mail} title="Contact" delay={0.4}>
                    For questions about this privacy policy, contact us at{' '}
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
