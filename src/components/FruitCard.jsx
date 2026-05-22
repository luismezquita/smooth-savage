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

export default function FruitCard({ fruit, index, locked = false }) {
    const { isPremium } = usePremium();
    const isLocked = locked && !isPremium;
    const [showPaywall, setShowPaywall] = useState(false);
    const { language } = useLanguage();
    
    const displayName = (language !== 'en' && itemNamesI18n[language]?.[fruit.id]) || fruit.name;
    const displayTeaser = (language !== 'en' && itemTeasersI18n[language]?.[fruit.id]) || fruit.teaser;
    const displayBenefit = (language !== 'en' && benefitLabelsI18n[language]?.[fruit.benefit]) || fruit.benefit;

    const cardInner = (
        <div className={`bg-white dark:bg-fruit-dark border border-gray-100 dark:border-gray-800 rounded-3xl md:overflow-hidden shadow-sm transition-all duration-300 flex flex-col h-full ${!isLocked ? 'hover:shadow-xl transform group-hover:-translate-y-2' : ''}`}>
            <div className="relative w-full aspect-square overflow-hidden rounded-t-3xl">
                {!isLocked && <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />}
                <img
                    src={fruit.image}
                    alt={fruit.name}
                    className={`block w-full aspect-square object-cover ${!isLocked ? 'transform group-hover:scale-105 transition-transform duration-700' : 'opacity-70'}`}
                    style={fruit.imagePosition ? { objectPosition: fruit.imagePosition } : undefined}
                    loading="lazy"
                />
                {isLocked && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                    </div>
                )}
            </div>
            <div className="p-5 flex-grow flex flex-col">
                <div className="mb-2">
                    <h3 className="text-xl font-bold">{displayName}</h3>
                    {!isLocked && (
                        <span className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${getBenefitStyle(fruit.benefit)}`}>
                            {displayBenefit}
                        </span>
                    )}
                </div>
                {!isLocked && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                        {displayTeaser}
                    </p>
                )}
            </div>
        </div>
    );

    return (
        <>
            {showPaywall && <PaywallOverlay onClose={() => setShowPaywall(false)} />}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
            >
                {isLocked ? (
                    <div onClick={() => setShowPaywall(true)} className="cursor-pointer h-full">
                        {cardInner}
                    </div>
                ) : (
                    <Link to={`/fruit/${fruit.id}`} className="block group h-full">
                        {cardInner}
                    </Link>
                )}
            </motion.div>
        </>
    );
}