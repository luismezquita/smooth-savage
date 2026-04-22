import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Droplets, ArrowRight, Search, X } from 'lucide-react';
import { smoothies } from '../data/smoothies';
import SmoothieCard from '../components/SmoothieCard';

const INITIAL_LIMIT = 10;

export default function Smoothies() {
    const [query, setQuery] = useState('');
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filtered = query.trim()
        ? smoothies.filter(s =>
            s.ingredients?.some(ing =>
                ing.toLowerCase().includes(query.toLowerCase())
            )
        )
        : smoothies;

    const displayed = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT);
    const hasMore = !showAll && filtered.length > INITIAL_LIMIT;

    const handleQueryChange = (val) => {
        setQuery(val);
        setShowAll(false);
    };

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

            {/* Ingredient search bar */}
            <div className="max-w-xl mx-auto mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        value={query}
                        onChange={e => handleQueryChange(e.target.value)}
                        placeholder="Search by ingredient..."
                        className="w-full pl-12 pr-10 py-3 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                    {query && (
                        <button
                            onClick={() => handleQueryChange('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                {query && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                        {filtered.length} smoothie{filtered.length !== 1 ? 's' : ''} with "{query}"
                    </p>
                )}
            </div>

            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">All Smoothies</h2>
                    <p className="text-gray-500 dark:text-gray-400">Explore our delicious blends</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
                {displayed.map((smoothie, i) => (
                    <SmoothieCard key={smoothie.id} smoothie={smoothie} index={i} />
                ))}
            </div>

            {filtered.length === 0 && (
                <p className="text-center text-gray-400 mt-12">No smoothies found with that ingredient.</p>
            )}

            {hasMore && (
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => setShowAll(true)}
                        className="group flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                    >
                        View All Smoothies <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                    </button>
                </div>
            )}
        </div>
    );
}