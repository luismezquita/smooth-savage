import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { getBenefitStyle } from '../utils/benefitColors';

export default function SuperfoodCard({ superfood, index }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFav = isFavorite(superfood.id);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link to={`/superfood/${superfood.id}`} className="block group h-full">
                <div className="bg-white dark:bg-fruit-dark border border-gray-100 dark:border-gray-800 rounded-3xl md:overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 flex flex-col h-full">
                    <div className="relative h-[30vh] md:h-64 w-full md:overflow-hidden rounded-t-3xl md:rounded-none bg-gray-50/50 dark:bg-gray-800/20 md:bg-transparent">
                        <div className="absolute inset-0 bg-black/5 md:bg-black/20 group-hover:bg-transparent transition-colors z-10 rounded-t-3xl md:rounded-none" />
                        <img
                            src={superfood.image}
                            alt={superfood.name}
                            className="block w-full h-full object-contain md:object-cover transform group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-700 p-4 md:p-0"
                            loading="lazy"
                        />
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(superfood);
                            }}
                            className={`absolute top-4 right-4 z-30 p-2 backdrop-blur-md rounded-full shadow-lg transition-colors cursor-pointer ${isFav ? 'bg-red-500/90 text-white' : 'bg-white/50 hover:bg-white text-gray-700'}`}
                        >
                            <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                        </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                        <div className="flex items-center justify-between mb-2 gap-2">
                            <h3 className="text-xl font-bold">{superfood.name}</h3>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider whitespace-nowrap ${getBenefitStyle(superfood.benefits[0])}`}>
                                {superfood.benefits[0]}
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                            {superfood.teaser}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
