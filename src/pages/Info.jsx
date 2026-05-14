import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Leaf, Mail, Lock, Droplets, AlertTriangle } from 'lucide-react';

import { useT } from '../i18n/LanguageContext';

const Section = ({ icon: Icon, title, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 border border-white/10"
        style={{ background: 'rgba(255,255,255,0.05)' }}
    >
        <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl" style={{ background: 'rgba(249,115,22,0.15)' }}>
                <Icon className="w-5 h-5" style={{ color: '#F97316' }} />
            </div>
            <h2 className="text-lg font-black tracking-wide" style={{ color: '#F97316' }}>{title}</h2>
        </div>
        <div className="text-sm leading-relaxed" style={{ color: '#F5E6C8' }}>
            {children}
        </div>
    </motion.div>
);

export default function Info() {
    const t = useT();

    return (
        <div className="min-h-screen pb-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto pt-10" style={{ color: '#F5E6C8' }}>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <p className="text-4xl font-black mb-1" dir="ltr" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <span style={{ color: '#F5E6C8' }}>Smooth</span>
                    <span style={{ color: '#F97316' }}> Savage</span>
                </p>
                <p className="text-sm opacity-60 uppercase tracking-widest">{t('info.subtitle') || 'About this app'}</p>
            </motion.div>

            <div className="flex flex-col gap-5">
                {/* Medical disclaimer */}
                <Section icon={ShieldAlert} title={t('info.disclaimerTitle') || 'Medical Disclaimer'}>
                    {t('info.disclaimerText') ||
                        'La información sobre beneficios nutricionales de esta app ha sido recopilada de fuentes de internet e inteligencia artificial. No constituye consejo médico profesional. Consulta siempre con un profesional de la salud.'}
                </Section>

                {/* Preparation tip */}
                <Section icon={Droplets} title={t('info.prepTitle') || 'Preparation Tip'}>
                    {t('info.prepText') ||
                        'Smoothies are prepared with the liquid of your choice: water, plant-based milk, regular milk or oat drink. Adjust consistency to your preference.'}
                </Section>

                {/* Durian warning */}
                <Section icon={AlertTriangle} title={t('info.durianTitle') || 'Durian Warning'}>
                    {t('info.durianText') ||
                        'Do not consume Durian with alcohol. This combination can cause serious adverse reactions including nausea, palpitations and severe discomfort.'}
                </Section>

                {/* About the app */}
                <Section icon={Leaf} title={t('info.aboutTitle') || 'About the app'}>
                    <span>
                        {t('info.aboutText') ||
                            'Smooth Savage ha sido creada y coordinada por Fernando Mezquita de Offline Rules.'}{' '}
                        <a
                            href="https://smoothsavage.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2 font-semibold"
                            style={{ color: '#F97316' }}
                        >
                            smoothsavage.app
                        </a>
                    </span>
                </Section>

                {/* Contact */}
                <Section icon={Mail} title={t('info.contactTitle') || 'Contact'}>
                    <a
                        href="mailto:luismezquita@gmail.com"
                        className="underline underline-offset-2 font-semibold"
                        style={{ color: '#F97316' }}
                    >
                        luismezquita@gmail.com
                    </a>
                </Section>

                {/* Privacy Policy */}
                <Section icon={Lock} title={t('info.privacyTitle') || 'Privacy Policy'}>
                    <a
                        href="https://smooth-savage.vercel.app/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 font-semibold"
                        style={{ color: '#F97316' }}
                    >
                        {t('info.privacyLink') || 'View Privacy Policy'}
                    </a>
                </Section>
            </div>
        </div>
    );
}
