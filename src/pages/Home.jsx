import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence for smooth entry
import { HeartPulse, Leaf, ArrowDown } from 'lucide-react';
import { fruits } from '../data/fruits';
import FruitCard from '../components/FruitCard';
import tips from '../data/tips.json';

export default function Home() {
    // 1. New State to control how many items are visible
    const [visibleCount, setVisibleCount] = useState(12);
    const [dailyTip, setDailyTip] = useState(null);

    // 2. Logic to show the slice based on state
    const displayFruits = fruits.slice(0, visibleCount);
    const hasMore = visibleCount < fruits.length;

    useEffect(() => {
        if (tips && tips.length > 0) {
            const random = tips[Math.floor(Math.random() * tips.length)];
            setDailyTip(random);
        }
    }, []);

    const loadMore = () => {
        // This expands the list to show everything instantly
        setVisibleCount(fruits.length);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] pb-24">
            <section className="pt-4 px-4 mb-16">
                <div className="max-w-md mx-auto text-center">
                    {/* DAILY TIP */}
                    {dailyTip && (
                        <div className="mb-4 bg-green-50/30 dark:bg-green-900/10 p-4 rounded-2xl border border-green-100/40">
                            <p className="text-[14px] italic text-gray-600 dark:text-gray-300 leading-snug">
                                <Leaf className="inline w-3.5 h-3.5 mb-0.5 mr-1 text-[#22C55E]" />
                                "{dailyTip.text}" — <span className="font-bold text-[#22C55E] not-italic">{dailyTip.fruit}</span>
                            </p>
                        </div>
                    )}

                    {/* EXPLORE BUTTON */}
                    <div className="mb-6">
                        <button className="inline-flex items-center gap-2 bg-[#22C55E] text-white px-8 py-3 rounded-full font-black shadow-lg text-[10px] uppercase tracking-[0.2em]">
                            <HeartPulse className="w-4 h-4" />
                            Explore Benefits
                        </button>
                    </div>

                    {/* HERO IMAGE */}
                    <div className="w-full mb-8 overflow-hidden rounded-[45px] shadow-2xl">
                        <img
                            src="/images/smoothies/anti_oxidant_god_mode.webp"
                            className="w-full object-cover"
                            style={{ height: '35vh', minHeight: '260px', objectPosition: 'center 5%' }}
                        />
                    </div>

                    {/* TITLE */}
                    <div className="mt-12 px-2">
                        <p className="text-[10px] font-bold tracking-[0.5em] text-gray-400 uppercase mb-3">
                            ANTIOXIDANT GOD MODE
                        </p>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tighter">
                            Discover the <br />
                            <span className="text-[#22C55E]">Healing Power</span> <br />
                            of Nature
                        </h1>
                    </div>
                </div>
            </section>

            {/* FRESH FOODS SECTION */}
            <section className="py-12 border-t border-gray-100 dark:border-gray-900 max-w-xl mx-auto px-6">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-black dark:text-white flex items-center gap-2 uppercase tracking-tighter">
                        <span>🍓</span> FRESH
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-12 mb-12">
                    <AnimatePresence>
                        {displayFruits.map((fruit, i) => (
                            <FruitCard key={fruit.id} fruit={fruit} index={i} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* VIEW ALL: Now a Button that expands the list instead of changing pages */}
                {hasMore && (
                    <div className="flex justify-center">
                        <button
                            onClick={loadMore}
                            className="w-full text-center bg-gray-100 dark:bg-white/5 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest dark:text-gray-300 flex items-center justify-center gap-2"
                        >
                            View All Fresh Items
                            <ArrowDown className="w-3 h-3" />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}