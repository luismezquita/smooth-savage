import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Droplets, ArrowRight } from 'lucide-react';
import { smoothies } from '../data/smoothies';
import SmoothieCard from '../components/SmoothieCard';

export default function Smoothies() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const featuredSmoothies = smoothies.slice(0, 4);

    return (
        <div className="min-h-screen pt-8 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center max-w-2xl mx-auto"
            >
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4 text-blue-600 dark:text-blue-400">
                    <Droplets className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-4">Functional Smoothies</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Delicious combinations designed to maximize nutrient absorption and deliver specific health benefits through ingredient synergy.
                </p>
            </motion.div>

            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Featured Smoothies</h2>
                    <p className="text-gray-500 dark:text-gray-400">Popular everyday blends</p>
                </div>
                <Link to="/search?category=smoothies" className="hidden md:flex items-center gap-2 text-fruit-green font-semibold hover:gap-3 transition-all">
                    View All <ArrowRight className="w-5 h-5" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
                {featuredSmoothies.map((smoothie, i) => (
                    <SmoothieCard key={smoothie.id} smoothie={smoothie} index={i} />
                ))}
            </div>

            <Link to="/search?category=smoothies" className="md:hidden mt-8 w-full flex justify-center items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 py-4 rounded-xl font-semibold active:scale-95 transition-transform">
                View All Smoothies <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
    );
}
