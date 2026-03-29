import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, ArrowRight } from 'lucide-react';
import { superfoods } from '../data/superfoods';
import SuperfoodCard from '../components/SuperfoodCard';

export default function Superfoods() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const featuredSuperfoods = superfoods.slice(0, 8);

    return (
        <div className="min-h-screen pt-8 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center max-w-2xl mx-auto"
            >
                <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl mb-4 text-green-600 dark:text-green-400">
                    <Target className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-4">Superfoods</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Nature's most nutrient-dense ingredients. Explore powerful foods that naturally protect your health and boost vitality.
                </p>
            </motion.div>

            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Essential Superfoods</h2>
                    <p className="text-gray-500 dark:text-gray-400">A curated selection of the best superfoods</p>
                </div>
                <Link to="/search?category=superfoods" className="hidden md:flex items-center gap-2 text-fruit-green font-semibold hover:gap-3 transition-all">
                    View All <ArrowRight className="w-5 h-5" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
                {featuredSuperfoods.map((food, i) => (
                    <SuperfoodCard key={food.id} superfood={food} index={i} />
                ))}
            </div>

            <Link to="/search?category=superfoods" className="md:hidden mt-8 w-full flex justify-center items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 py-4 rounded-xl font-semibold active:scale-95 transition-transform">
                View All Superfoods <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
    );
}
