import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import { smoothies } from '../data/smoothies';
import { useFavorites } from '../hooks/useFavorites';
import { useT, useLanguage } from '../i18n/LanguageContext';
import smoothieI18n from '../data/smoothie_i18n';
import benefitLabelsI18n from '../data/benefit_labels_i18n';

export default function SmoothieDetail() {
    const t = useT();
    const { id } = useParams();
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorites();

    const smoothie = smoothies.find(s => s.id.toString() === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!smoothie) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-2xl font-bold">Smoothie not found</h2>
                <button onClick={() => navigate('/smoothies')} className="mt-4 text-fruit-green underline">Go to Smoothies</button>
            </div>
        );
    }

    const isFav = isFavorite(smoothie.id);
    const { language } = useLanguage();
    const displayName = (language !== 'en' && smoothieI18n[language]?.[smoothie.id]?.name) || smoothie.name;
    const displayTeaser = (language !== 'en' && smoothieI18n[language]?.[smoothie.id]?.teaser) || smoothie.teaser;
    const displayBenefit = (language !== 'en' && benefitLabelsI18n[language]?.[smoothie.benefit]) || smoothie.benefit;

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
                <button
                    onClick={() => toggleFavorite(smoothie)}
                    className={`absolute top-6 right-6 z-30 p-3 backdrop-blur-md rounded-full transition-colors ${isFav ? 'bg-red-500/90 text-white' : 'bg-white/20 dark:bg-black/20 text-white hover:bg-white/40'}`}
                >
                    <Heart className={`w-6 h-6 ${isFav ? 'fill-current' : ''}`} />
                </button>

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent z-10" />
                <img src={smoothie.img || smoothie.image} alt={smoothie.name} className="w-full h-full object-cover" />

                <div className="absolute bottom-6 left-6 right-6 z-20 text-white max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex flex-wrap gap-2 mb-3">
                            {smoothie.category && (
                                <span className={`px-3 py-1 text-xs font-bold rounded-full bg-${smoothie.color}-500/80 backdrop-blur border text-white uppercase tracking-wider`}>
                                    {smoothie.category}
                                </span>
                            )}
                            {smoothie.benefit && !smoothie.category && (
                                <span className={`px-3 py-1 text-xs font-bold rounded-full bg-${smoothie.color}-500/80 backdrop-blur border text-white uppercase tracking-wider`}>
                                    {displayBenefit}
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-2">{displayName}</h1>
                        <p className="text-lg md:text-xl text-gray-200 font-medium">{smoothie.description}</p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid md:grid-cols-3 gap-8">

                    <div className="md:col-span-2 space-y-8">
                        {/* Main Description & Benefits */}
                        <motion.section
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700"
                        >
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Target className={`text-${smoothie.color}-500`} />
                                {t('detail.healthBenefits')}
                            </h2>
                            <div className="flex gap-4">
                                <div className={`mt-1 bg-${smoothie.color}-100 dark:bg-${smoothie.color}-900/30 p-2 rounded-xl h-fit`}>
                                    <CheckCircle2 className={`w-5 h-5 text-${smoothie.color}-600 dark:text-${smoothie.color}-400`} />
                                </div>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{smoothie.benefits}</p>
                                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <span className="text-fruit-green">✨ {t('detail.synergies')}:</span> {smoothie.synergies}
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Ingredients */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className={`bg-${smoothie.color}-50 dark:bg-${smoothie.color}-900/10 rounded-3xl p-6 md:p-8 border border-${smoothie.color}-100 dark:border-${smoothie.color}-900/30`}
                        >
                            <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 text-${smoothie.color}-800 dark:text-${smoothie.color}-400`}>
                                <Sparkles className="w-5 h-5" />
                                {t('detail.ingredients')}
                            </h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {smoothie.ingredients.map((ing, i) => (
                                    <li key={i} className="flex items-center gap-2 text-md text-gray-800 dark:text-gray-200">
                                        <div className={`w-2 h-2 rounded-full bg-${smoothie.color}-500`} />
                                        <span className="font-semibold">{ing}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.section>
                    </div>

                    <div className="space-y-6">
                        {/* Preparation Steps Sidebar */}
                        <motion.section
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full"
                        >
                            <h2 className="text-xl font-black mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200 uppercase tracking-widest border-b pb-4 dark:border-gray-700">
                                {t('detail.preparation')}
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                                {smoothie.steps}
                            </p>
                        </motion.section>
                    </div>

                </div>
            </div>
        </div>
    );
}
