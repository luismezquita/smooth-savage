import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBenefitStyle } from '../utils/benefitColors';
import { useLanguage } from '../i18n/LanguageContext';
import itemNamesI18n from '../data/item_names_i18n';
import itemTeasersI18n from '../data/item_teasers_i18n';
import benefitLabelsI18n from '../data/benefit_labels_i18n';

export default function SuperfoodCard({ superfood, index }) {
    const { language } = useLanguage();
    const displayName = (language !== 'en' && itemNamesI18n[language]?.[superfood.id]) || superfood.name;
    const displayTeaser = (language !== 'en' && itemTeasersI18n[language]?.[superfood.id]) || superfood.teaser;
    const displayBenefit = (language !== 'en' && benefitLabelsI18n[language]?.[superfood.benefit]) || superfood.benefit;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link to={`/superfood/${superfood.id}`} className="block group h-full">
                <div className="savage-card bg-white dark:bg-fruit-dark border border-gray-100 dark:border-gray-800 rounded-3xl md:overflow-hidden shadow-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 transform group-hover:-translate-y-2 flex flex-col h-full relative">
<div className="relative w-full overflow-hidden rounded-t-3xl aspect-square">
                        <div className="absolute inset-0 bg-black/5 md:bg-black/20 group-hover:bg-transparent transition-colors z-10 rounded-t-3xl md:rounded-none" />
                        <img
                            src={superfood.image}
                            alt={superfood.name}
                            className="block w-full aspect-square object-cover transform group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                            onError={e => { e.currentTarget.src = '/images/savage/cacao.webp'; }}
                        />
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                        <div className="mb-2">
                            <h3 className="text-xl font-bold">{displayName}</h3>
                            <span className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${getBenefitStyle(superfood.benefit)}`}>
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
