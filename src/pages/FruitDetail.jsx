import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Info, Target, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { fruits } from '../data/fruits';
import { useT, useLanguage } from '../i18n/LanguageContext';
import itemTipsI18n from '../data/item_tips_i18n';
import itemNamesI18n from '../data/item_names_i18n';
import itemTeasersI18n from '../data/item_teasers_i18n';
import benefitLabelsI18n from '../data/benefit_labels_i18n';
import nutrientsI18n from '../data/nutrients_i18n';
import { getMainBenefits } from '../i18n/mainBenefits_i18n';
import SmoothieLink from '../components/SmoothieLink';

export default function FruitDetail() {
    const t = useT();
    const { language } = useLanguage();
    const { id } = useParams();
    const navigate = useNavigate();
    const fruit = fruits.find(f => f.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!fruit) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-2xl font-bold">Fruit not found</h2>
                <button onClick={() => navigate('/')} className="mt-4 text-fruit-green underline">Go Home</button>
            </div>
        );
    }

    const [benefitsData, setBenefitsData] = useState({});
    useEffect(() => {
        if (language !== 'en') {
            getMainBenefits(language).then(setBenefitsData);
        } else {
            setBenefitsData({});
        }
    }, [language]);

    const displayName = (language !== 'en' && itemNamesI18n[language]?.[fruit.id]) || fruit.name;
    const displayTeaser = (language !== 'en' && itemTeasersI18n[language]?.[fruit.id]) || fruit.teaser;
    const displayBenefit = (language !== 'en' && benefitLabelsI18n[language]?.[fruit.benefit]) || fruit.benefit;
    const displayMainBenefits = (language !== 'en' && benefitsData[fruit.id]) || fruit.mainBenefits;

    return (
        <div className="pb-16 bg-fruit-light/60 dark:bg-fruit-dark/50 min-h-[calc(100vh-64px)]">
            {/* Hero Image Section */}
            <div className="relative h-72 md:h-96 w-full">
                
                {/* Contenedor Superior: Botón Volver y Vaso */}
                <div className="absolute top-6 left-6 right-6 z-30 flex justify-between items-start">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 bg-black/20 backdrop-blur-sm rounded-full border border-white/10 transition-all duration-300 cursor-pointer group hover:bg-black/90 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        aria-label="Volver"
                    >
                        <ArrowLeft className="w-6 h-6 text-white/80 group-hover:text-white transition-all duration-300" />
                    </button>
                    <SmoothieLink ingredientName={fruit.name} />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent z-10" />
                <img src={fruit.image} alt={fruit.name} className="w-full h-full object-cover" />

                <div className="absolute bottom-6 left-6 right-6 z-20 text-white max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {fruit.benefit && (
                                <span className="px-3 py-1 text-xs font-bold rounded-full bg-purple-500/80 backdrop-blur border border-white/20 text-white uppercase tracking-wider">
                                    {displayBenefit}
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-2">{displayName}</h1>
                        <p className="text-lg md:text-xl text-gray-200 font-medium">{displayTeaser}</p>
                    </motion.div>
                </div>
            </div>

            {/* Resto del contenido */}
            {fruit.id === 'durian' && (
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                    <div className="flex items-start gap-3 rounded-2xl px-5 py-4 border border-yellow-500/40" style={{ background: 'rgba(234,179,8,0.1)' }}>
                        <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#EAB308' }} />
                        <div>
                            <p className="font-bold text-sm mb-0.5" style={{ color: '#EAB308' }}>{t('info.durianTitle') || 'Durian Warning'}</p>
                            <p className="text-sm leading-relaxed" style={{ color: '#F5E6C8' }}>{t('info.durianText') || 'Do not consume Durian with alcohol.'}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        {fruit.mainBenefits && (
                            <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Target className="text-purple-500" />
                                    {t('detail.mainBenefits')}
                                </h2>
                                <div className="space-y-6">
                                    {displayMainBenefits.map((benefit, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-xl h-fit">
                                                <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">{benefit.title}</h3>
                                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}
                        {fruit.tips && (
                            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-purple-50 dark:bg-purple-900/10 rounded-3xl p-6 md:p-8 border border-purple-100 dark:border-purple-900/30">
                                <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-purple-800 dark:text-purple-400">
                                    <Sparkles className="w-5 h-5" />
                                    {t('detail.dailyTip')}
                                </h2>
                                <p className="text-purple-900 dark:text-purple-200/80 leading-relaxed">
                                    {(language !== 'en' && itemTipsI18n[language]?.[fruit.id]) || fruit.tips}
                                </p>
                            </motion.section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}