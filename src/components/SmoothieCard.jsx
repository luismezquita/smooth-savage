import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, CupSoda, Lock } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { getBenefitStyle } from '../utils/benefitColors';
import { useLanguage } from '../i18n/LanguageContext';
import smoothiesTranslations from '../data/smoothies_translations';
import benefitLabelsI18n from '../data/benefit_labels_i18n';
import { usePremium } from '../hooks/usePremium';
import PaywallOverlay from './PaywallOverlay';

export default function SmoothieCard({ smoothie, index = 0, locked = false }) {
    const { isPremium } = usePremium();
    const isLocked = locked && !isPremium;
    const [showPaywall, setShowPaywall] = useState(false);
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFav = isFavorite(smoothie.id);
    const { language } = useLanguage();
    const tr = language !== 'en' ? smoothiesTranslations[language]?.[smoothie.id] : null;
    const displayName = tr?.name || smoothie.name;
    const displayTeaser = tr?.teaser || smoothie.teaser;
    const displayIngredients = tr?.ingredients || smoothie.ingredients;
    const displayBenefit = (language !== 'en' && benefitLabelsI18n[language]?.[smoothie.benefit]) || smoothie.benefit;

    const imagePath = smoothie.img && smoothie.img.endsWith('.webp')
        ? smoothie.img
        : '/images/smoothies/elderberry-shield.webp';

    // Locked card: only image + name, no ingredients, no teaser, no favorite, no link
    if (isLocked) {
        return (
            <>
                {showPaywall && <PaywallOverlay onClose={() => setShowPaywall(false)} />}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onClick={() => setShowPaywall(true)}
                    className="cursor-pointer h-full"
                >
                    <div className="bg-white dark:bg-fruit-dark rounded-3xl md:overflow-hidden shadow-lg transition-all duration-300 border-0 flex flex-col h-full">
                        <div className="relative w-full aspect-square overflow-hidden rounded-t-3xl">
                            <img
                                src={imagePath}
                                alt={displayName}
                                className="block w-full h-full object-cover opacity-70"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                    <Lock className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col gap-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{displayName}</h3>
                        </div>
                    </div>
                </motion.div>
            </>
        );
    }

    // Free / premium card: full content
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link to={`/smoothie/${smoothie.id}`} className="block group h-full">
                <div className="bg-white dark:bg-fruit-dark rounded-3xl md:overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border-0 flex flex-col h-full">
                    <div className="relative w-full aspect-square overflow-hidden rounded-t-3xl">
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                        <img
                            src={imagePath}
                            alt={smoothie.name}
                            className="block w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                        />
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(smoothie);
                            }}
                            className={`absolute top-4 right-4 z-30 p-2 backdrop-blur-md rounded-full shadow-lg transition-colors cursor-pointer ${isFav ? 'bg-red-500/90 text-white' : 'bg-white/50 hover:bg-white text-gray-700'}`}
                        >
                            <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                        </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                        <div className="mb-2">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                {smoothie.icon === 'vaso' && <CupSoda className="w-5 h-5 text-fruit-green dark:text-fruit-light" />}
                                {displayName}
                                {smoothie.isHero && (
                                    <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                                        Hero
                                    </span>
                                )}
                            </h3>
                            <span className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${getBenefitStyle(smoothie.benefit)}`}>
                                {displayBenefit}
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                            {displayTeaser}
                        </p>
                        <div className="flex flex-wrap gap-2 text-sm font-bold text-fruit-green italic mt-3">
                            {displayIngredients?.join(" • ")}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
