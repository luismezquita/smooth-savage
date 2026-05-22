import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { getBenefitStyle } from '../utils/benefitColors';
import { useLanguage } from '../i18n/LanguageContext';
import itemNamesI18n from '../data/item_names_i18n';
import itemTeasersI18n from '../data/item_teasers_i18n';
import benefitLabelsI18n from '../data/benefit_labels_i18n';
import { usePremium } from '../hooks/usePremium';
import PaywallOverlay from './PaywallOverlay';

export default function SuperfoodCard({ superfood, index, locked = false }) {
    const navigate = useNavigate();
    const { isPremium } = usePremium();
    const isLocked = locked && !isPremium;
    const [showPaywall, setShowPaywall] = useState(false);
    const { language } = useLanguage();
    const displayName = (language !== 'en' && itemNamesI18n[language]?.[superfood.id]) || superfood.name;
    const displayTeaser = (language !== 'en' && itemTeasersI18n[language]?.[superfood.id]) || superfood.teaser;
    const displayBenefit = (language !== 'en' && benefitLabelsI18n[language]?.[superfood.benefit]) || superfood.benefit;

    const cardInner = (
        <div className={`savage-card bg-white dark:bg-fruit-dark border border-gray-100 dark:border-gray-800 rounded-3xl md:overflow-hidden shadow-sm transition-all duration-300 flex flex-col h-full relative ${!isLocked ? 'hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transform group-hover:-translate-y-2' : ''}`}>
            <div className="relative w-full overflow-hidden rounded-t-3xl aspect-square">
                {!isLocked && <div className="absolute inset-0 bg-black/5 md:bg-black/20 group-hover:bg-transparent transition-colors z-10 rounded-t-3xl md:rounded-none" />}
                <img
                    src={superfood.image}
                    alt={superfood.name}
                    className={`block w-full aspect-square object-cover ${!isLocked ? 'transform group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-700' : 'opacity-70'}`}
                    loading="lazy"
                    onError={e => { e.currentTarget.src = '/images/savage/cacao.webp'; }}
                />
                {isLocked && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                    </div>
                )}
                {!isLocked && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate('/smoothies', { state: { filterIngredient: superfood.name } });
                        }}
                        className="absolute top-3 right-3 z-30 p-2.5 bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-white/40 dark:hover:bg-white/20 transition-colors flex items-center justify-center shadow-lg transform hover:scale-110"
                        title="Find Smoothies"
                    >
                        🥤
                    </button>
                )}
            </div>
            <div className="p-5 flex-grow flex flex-col">
                <div className="mb-2">
                    <h3 className="text-xl font-bold">{displayName}</h3>
                    {!isLocked && (
                        <span className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${getBenefitStyle(superfood.benefit)}`}>
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
                    <Link to={`/superfood/${superfood.id}`} className="block group h-full">
                        {cardInner}
                    </Link>
                )}
            </motion.div>
        </>
    );
}
