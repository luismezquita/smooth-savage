import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, CupSoda } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

import { getBenefitStyle } from '../utils/benefitColors';

export default function SmoothieCard({ smoothie, index = 0 }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFav = isFavorite(smoothie.id);

    // Dynamic Premium Fallback Logic
    const imagePath = smoothie.img && smoothie.img.endsWith('.webp')
        ? smoothie.img
        : '/images/smoothies/elderberry-shield.webp';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link to={`/smoothie/${smoothie.id}`} className="block group h-full">
                <div className="bg-white dark:bg-fruit-dark rounded-3xl md:overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border-0 flex flex-col h-full">
                    <div className="relative h-[30vh] md:h-72 w-full md:overflow-hidden rounded-t-3xl md:rounded-none bg-gray-50/50 dark:bg-gray-800/20 md:bg-transparent">
                        <div className="absolute inset-0 bg-black/5 md:bg-black/10 group-hover:bg-transparent transition-colors z-10 rounded-t-3xl md:rounded-none" />
                        <img
                            src={imagePath}
                            alt={smoothie.name}
                            className="block w-full h-full object-contain md:object-cover transform group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-700 p-4 md:p-0"
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
                                {smoothie.name}
                                {smoothie.isHero && (
                                    <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                                        Hero
                                    </span>
                                )}
                            </h3>
                            <span className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${getBenefitStyle(smoothie.benefit)}`}>
                                {smoothie.benefit}
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                            {smoothie.teaser}
                        </p>
                        <div className="flex flex-wrap gap-2 text-sm font-bold text-fruit-green italic mt-3">
                            {smoothie.ingredients?.join(" • ")}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
