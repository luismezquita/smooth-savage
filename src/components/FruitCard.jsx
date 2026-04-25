import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { getBenefitStyle } from '../utils/benefitColors';

export default function FruitCard({ fruit, index }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFav = isFavorite(fruit.id);
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
                            className="block w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
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
                            <h3 className="text-xl font-bold">{fruit.name}</h3>
                            <span className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${getBenefitStyle(fruit.benefit)}`}>
                                {fruit.benefit}
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                            {fruit.teaser}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
