import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import FruitCard from '../components/FruitCard';
import SmoothieCard from '../components/SmoothieCard';
import SuperfoodCard from '../components/SuperfoodCard';
import { Link } from 'react-router-dom';

export default function Favorites() {
    const { favorites } = useFavorites();

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
                    <h1 className="text-3xl md:text-4xl font-black">Your Favorites</h1>
                    <p className="text-gray-500 dark:text-gray-400">Saved fruits for quick access</p>
                </div>
            </motion.div>

            {favorites.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700"
                >
                    <Heart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                    <h2 className="text-xl font-bold mb-2">No favorites yet</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Start exploring fruits and save your favorites here!</p>
                    <Link to="/" className="inline-flex bg-fruit-green text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors">
                        Explore Fruits
                    </Link>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
                    {favorites.map((item, i) => {
                        if (item.type === 'superfood') {
                            return <SuperfoodCard key={`superfood-${item.id}`} superfood={item} index={i} />;
                        }
                        if (item.ingredients) {
                            return <SmoothieCard key={`smoothie-${item.id}`} smoothie={item} index={i} />;
                        }
                        return <FruitCard key={`fruit-${item.id}`} fruit={item} index={i} />;
                    })}
                </div>
            )}
        </div>
    );
}
