import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { getBenefitStyle } from '../utils/benefitColors';
import { useLanguage } from '../i18n/LanguageContext';
import itemNamesI18n from '../data/item_names_i18n';
import itemTeasersI18n from '../data/item_teasers_i18n';
import benefitLabelsI18n from '../data/benefit_labels_i18n';

export default function FruitCard({ fruit, index }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const { language } = useLanguage();
    const isFav = isFavorite(fruit.id);
    const displayName = (language !== 'en' && itemNamesI18n[language]?.[fruit.id]) || fruit.name;
    const displayTeaser = (language !== 'en' && itemTeasersI18n[language]?.[fruit.id]) || fruit.teaser;
    const displayBenefit = (language !== 'en' && benefitLabelsI18n[language]?.[fruit.benefit]) || fruit.benefit;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link to={`/fruit/${fruit.id}`} className="block group h-full">
                <div className="bg-white dark:bg-fruit-dark border border-gray-100 dark:border-gray-800 rounded-3xl md:overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 flex flex-col h-full">
                    <div className="relative w-full aspect-square overflow-hidden rounded-t-3xl">
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                        <img
                            src={fruit.image}
                            alt={fruit.name}
                            className="block w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-700"
                            style={fruit.imagePosition ? { objectPosition: fruit.imagePosition } : undefined}
                            loading="lazy"
                        />
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(fruit);
                            }}
                            className={`absolute top-4 right-4 z-30 p-2 backdrop-blur-md rounded-full shadow-lg transition-colors cursor-pointer ${isFav ? 'bg-red-500/90 text-white' : 'bg-white/50 hover:bg-white text-gray-700'}`}
                        >
                            <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                        </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                        <div className="mb-2">
                            <h3 className="text-xl font-bold">{displayName}</h3>
                            <span className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${getBenefitStyle(fruit.benefit)}`}>
                                {displayBenefit}
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                            {displayTeaser}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
