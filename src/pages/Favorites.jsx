import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import SmoothieCard from '../components/SmoothieCard';
import { useT } from '../i18n/LanguageContext';

export default function Favorites() {
    const t = useT();
    const { favorites } = useFavorites();

    // Only smoothies have ingredients — filter just in case old data exists
    const smoothieFavorites = favorites.filter(item => item.ingredients);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pt-8 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 flex items-center gap-4"
            >
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-2xl text-red-500">
                    <Heart className="w-8 h-8 fill-current" />
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-black">{t('favorites.title')}</h1>
                </div>
            </motion.div>

            {smoothieFavorites.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700"
                >
                    <Heart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                    <h2 className="text-xl font-bold mb-2">{t('favorites.emptyTitle')}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{t('favorites.emptyDesc')}</p>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
                    {smoothieFavorites.map((smoothie, i) => (
                        <SmoothieCard key={smoothie.id} smoothie={smoothie} index={i} />
                    ))}
                </div>
            )}
        </div>
    );
}
