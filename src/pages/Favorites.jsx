import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import FruitCard from '../components/FruitCard';
import SmoothieCard from '../components/SmoothieCard';
import SuperfoodCard from '../components/SuperfoodCard';
import { Link } from 'react-router-dom';
import { savageFoods } from '../data/superfoods';

const FILTERS = ['Fresh', 'Savage', 'Smoothies'];

export default function Favorites() {
    const { favorites } = useFavorites();
    const [active, setActive] = useState(new Set(FILTERS));

    const toggle = (label) => {
        setActive(prev => {
            const next = new Set(prev);
            next.has(label) ? next.delete(label) : next.add(label);
            return next;
        });
    };

    const categorize = (item) => {
        if (savageFoods.find(s => s.id === item.id)) return 'Savage';
        if (item.ingredients) return 'Smoothies';
        return 'Fresh';
    };

    const displayed = favorites.filter(item => active.has(categorize(item)));

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
                </div>
            </motion.div>

            <div className="flex gap-3 mb-8 flex-wrap">
                {FILTERS.map(label => (
                    <button
                        key={label}
                        onClick={() => toggle(label)}
                        className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${active.has(label) ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {favorites.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700"
                >
                    <Heart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                    <h2 className="text-xl font-bold mb-2">No favorites yet</h2>
                    <p className="text-gray-500 dark:text-gray-400">Save items you love to find them here.</p>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
                    {displayed.map((item, i) => {
                        if (savageFoods.find(s => s.id === item.id)) {
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
