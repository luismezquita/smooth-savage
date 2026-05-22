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
    const translateNutrient = (n) => (language !== 'en' && nutrientsI18n[language]?.[n]) || n;
    const displayMainBenefits = (language !== 'en' && benefitsData[fruit.id]) || fruit.mainBenefits;

    return (
        <div className="pb-16 bg-fruit-light/60 dark:bg-fruit-dark/50 min-h-[calc(100vh-64px)]">
            {/* Hero Image Section */}
            <div className="relative h-72 md:h-96 w-full">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 z-30 p-3 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent z-10" />
                <img src={fruit.image} alt={fruit.name} className="w-full h-full object-cover" />

                <div className="absolute bottom-6 left-6 right-6 z-20 text-white max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex flex-wrap gap-2 mb-3">
                            {fruit.benefit && (
                                <span className={`px-3 py-1 text-xs font-bold rounded-full bg-${fruit.color}-500/80 backdrop-blur border text-white uppercase tracking-wider`}>
                                    {displayBenefit}
                                </span>
                            )}
                            {fruit.benefits && fruit.benefits.map(b => (
                                <span key={b} className={`px-3 py-1 text-xs font-bold rounded-full bg-${fruit.color}-500/80 backdrop-blur border text-white uppercase tracking-wider`}>
                                    {b}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-2">{displayName}</h1>
                        <p className="text-lg md:text-xl text-gray-200 font-medium">{displayTeaser}</p>
                    </motion.div>
                </div>
            </div>

            {fruit.id === 'durian' && (
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                    <div className="flex items-start gap-3 rounded-2xl px-5 py-4 border border-yellow-500/40" style={{ background: 'rgba(234,179,8,0.1)' }}>
                        <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#EAB308' }} />
                        <div>
                            <p className="font-bold text-sm mb-0.5" style={{ color: '#EAB308' }}>{t('info.durianTitle') || 'Durian Warning'}</p>
                            <p className="text-sm leading-relaxed" style={{ color: '#F5E6C8' }}>{t('info.durianText') || 'Do not consume Durian with alcohol. This combination can cause serious adverse reactions including nausea, palpitations and severe discomfort.'}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid md:grid-cols-3 gap-8">

                    <div className="md:col-span-2 space-y-8">
                        {/* Main Benefits */}
                        {fruit.mainBenefits && (
                            <motion.section
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700"
                            >
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Target className={`text-${fruit.color}-500`} />
                                    {t('detail.mainBenefits')}
                                </h2>
                                <div className="space-y-6">
                                    {displayMainBenefits.map((benefit, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className={`mt-1 bg-${fruit.color}-100 dark:bg-${fruit.color}-900/30 p-2 rounded-xl h-fit`}>
                                                <CheckCircle2 className={`w-5 h-5 text-${fruit.color}-600 dark:text-${fruit.color}-400`} />
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

                        {/* Daily Tip */}
                        {fruit.tips && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className={`bg-${fruit.color}-50 dark:bg-${fruit.color}-900/10 rounded-3xl p-6 md:p-8 border border-${fruit.color}-100 dark:border-${fruit.color}-900/30`}
                            >
                                <h2 className={`text-xl font-bold mb-3 flex items-center gap-2 text-${fruit.color}-800 dark:text-${fruit.color}-400`}>
                                    <Sparkles className="w-5 h-5" />
                                    {t('detail.dailyTip')}
                                </h2>
                                <p className={`text-${fruit.color}-900 dark:text-${fruit.color}-200/80 leading-relaxed`}>
                                    {(language !== 'en' && itemTipsI18n[language]?.[fruit.id]) || fruit.tips}
                                </p>
                            </motion.section>
                        )}
                    </div>

                    <div className="space-y-6">
                        {/* Key Nutrients Sidebar */}
                        <motion.section
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                        >
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-gray-400" />
                                {t('detail.keyNutrients')}
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {fruit.nutrients && fruit.nutrients.map((n, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium">
                                        {n}
                                    </span>
                                ))}
                            </div>
                        </motion.section>


                    </div>

                </div>
            </div>
        </div>
    );
}
