import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { benefitCategories, getItemsForBenefit } from '../data/benefits';
import FruitCard from '../components/FruitCard';
import SuperfoodCard from '../components/SuperfoodCard';
import SmoothieCard from '../components/SmoothieCard';
import { useT, useLanguage } from '../i18n/LanguageContext';
import benefitCategoriesI18n from '../data/benefit_categories_i18n';

export default function BenefitDetail() {
    const t = useT();
    const { language } = useLanguage();
    const { id } = useParams();
    const category = benefitCategories.find(c => c.id === id);
    const catTitle = (language !== 'en' && benefitCategoriesI18n[language]?.[id]?.title) || category?.title || '';
    const catTagline = (language !== 'en' && benefitCategoriesI18n[language]?.[id]?.tagline) || category?.tagline || '';

    const FRESH_CAP = 8;
    const SAVAGE_CAP = 8;
    const SMOOTHIE_CAP = 8;

    const { fruits: allFruits, superfoods: allSuperfoods, smoothies: allSmoothies } = useMemo(() => getItemsForBenefit(id), [id]);
    const fruits = allFruits.slice(0, FRESH_CAP);
    const superfoods = allSuperfoods.slice(0, SAVAGE_CAP);
    const smoothies = allSmoothies.slice(0, SMOOTHIE_CAP);

    if (!category) {
        return <div className="pt-32 text-center text-3xl font-bold text-gray-900 dark:text-white">Benefit category not found.</div>;
    }

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <Link to="/benefits" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8 transition-colors font-medium">
                <ArrowLeft className="w-5 h-5" /> {t('benefitDetail.back')}
            </Link>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-[2.5rem] p-8 md:p-12 mb-16 bg-gradient-to-br ${category.color} text-white shadow-2xl relative overflow-hidden`}
            >
                <div className="text-7xl mb-6 relative z-10 drop-shadow-lg">{category.icon}</div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 relative z-10 tracking-tight">
                    {catTitle}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl relative z-10 font-medium">
                    {catTagline}. {t('benefitDetail.itemSuffix')}
                </p>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />
            </motion.div>

            {fruits.length > 0 && (
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{t('benefitDetail.freshSection')}</h2>
                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-1 px-3 rounded-full text-sm font-bold">{allFruits.length > FRESH_CAP ? t('benefitDetail.topN', { n: FRESH_CAP }) : t('benefitDetail.itemsCount', { n: fruits.length })}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
                        {fruits.map((fruit, index) => (
                            <FruitCard key={fruit.id} fruit={fruit} index={index} />
                        ))}
                    </div>
                </div>
            )}

            {superfoods.length > 0 && (
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{t('benefitDetail.savageSection')}</h2>
                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-1 px-3 rounded-full text-sm font-bold">{allSuperfoods.length > SAVAGE_CAP ? t('benefitDetail.topN', { n: SAVAGE_CAP }) : t('benefitDetail.itemsCount', { n: superfoods.length })}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
                        {superfoods.map((sf, index) => (
                            <SuperfoodCard key={sf.id} superfood={sf} index={index} />
                        ))}
                    </div>
                </div>
            )}

            {smoothies.length > 0 && (
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{t('benefitDetail.smoothiesSection')}</h2>
                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-1 px-3 rounded-full text-sm font-bold">{allSmoothies.length > SMOOTHIE_CAP ? t('benefitDetail.topN', { n: SMOOTHIE_CAP }) : t('benefitDetail.itemsCount', { n: smoothies.length })}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
                        {smoothies.map((smoothie, index) => (
                            <SmoothieCard key={smoothie.id} smoothie={smoothie} index={index} />
                        ))}
                    </div>
                </div>
            )}
            
            {fruits.length === 0 && superfoods.length === 0 && smoothies.length === 0 && (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-800 text-gray-500">
                    <p className="text-xl">{t('benefitDetail.empty')}</p>
                </div>
            )}
        </div>
    );
}
