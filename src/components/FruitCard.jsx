import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { getBenefitStyle } from '../utils/benefitColors';
import { useLanguage } from '../i18n/LanguageContext';
import itemNamesI18n from '../data/item_names_i18n';
import itemTeasersI18n from '../data/item_teasers_i18n';
import benefitLabelsI18n from '../data/benefit_labels_i18n';
import { usePremium } from '../hooks/usePremium';
import PaywallOverlay from './PaywallOverlay';
import SmoothieLink from './SmoothieLink';

export default function FruitCard({ fruit, index, locked = false }) {
    const { isPremium } = usePremium();
    const isLocked = locked && !isPremium;
    const [showPaywall, setShowPaywall] = useState(false);
    const { language } = useLanguage();
    
    const displayName = (language !== 'en' && itemNamesI18n[language]?.[fruit.id]) || fruit.name;
    const displayTeaser = (language !== 'en' && itemTeasersI18n[language]?.[fruit.id]) || fruit.teaser;
    const displayBenefit = (language !== 'en' && benefitLabelsI18n[language]?.[fruit.benefit]) || fruit.benefit;

    const cardInner = (
        <div className="bg-white dark:bg-fruit-dark border border-gray-100 dark:border-gray-800 rounded-3xl md:overflow-hidden shadow-sm transition-all duration-300 flex flex-col h-full relative">
            <div className="relative w-full aspect-square overflow-hidden rounded-t-3xl">
                {isLocked ? (
                    <div className="absolute inset-0 z-40 bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="bg-white/20 p-3 rounded-full backdrop-blur-md">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                    </div>
                ) : (
                    <div className="absolute top-3 right-3 z-40">
                        <SmoothieLink ingredientName={fruit.name} />
                    </div>
                )}
                <img src={fruit.image} alt={displayName} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-bold">{displayName}</h3>
                <span className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${getBenefitStyle(fruit.benefit)}`}>
                    {displayBenefit}
                </span>
                {!isLocked && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mt-2">{displayTeaser}</p>
                )}
            </div>
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
            {showPaywall && <PaywallOverlay onClose={() => setShowPaywall(false)} />}
            {isLocked ? (
                <div onClick={() => setShowPaywall(true)} className="cursor-pointer h-full">{cardInner}</div>
            ) : (
                <Link to={`/fruit/${fruit.id}`} className="block h-full">{cardInner}</Link>
            )}
        </motion.div>
    );
}