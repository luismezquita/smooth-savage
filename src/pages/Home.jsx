import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, HeartPulse } from 'lucide-react';
import { fruits } from '../data/fruits';
import FruitCard from '../components/FruitCard';
import tips from '../data/tips.json';

export default function Home() {
    const featuredFruits = fruits.slice(0, 8);
    const [dailyTip, setDailyTip] = useState(null);

    useEffect(() => {
        const random = tips[Math.floor(Math.random() * tips.length)];
        setDailyTip(random);
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-orange-50 dark:from-green-900/20 dark:to-orange-900/20 pt-20 pb-32">
                <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-green-200/50 dark:bg-green-900/30 blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-orange-200/50 dark:bg-orange-900/30 blur-3xl opacity-50" />

                <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 text-[10px] uppercase font-bold tracking-widest text-fruit-green shadow-sm">
                        <Leaf className="w-3 h-3" />
                        Evidence-based nutrition
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Mobile Hero View (Tef) */}
                        <div className="md:hidden flex flex-col items-center justify-center mb-4 w-full">
                            <img 
                                src="/images/smoothies/anti_oxidant_god_mode.webp" 
                                alt="Antioxidant God Mode" 
                                className="!block !w-full !h-[35vh] !object-contain"
                                loading="eager" 
                            />
                            <h2 
                                className="font-bold text-white text-center mt-3 text-2xl md:text-3xl uppercase"
                                style={{ textShadow: "0 0 5px #800080" }}
                            >
                                ANTIOXIDANT GOD MODE
                            </h2>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black mt-4 md:mt-8 mb-4 tracking-tight text-gray-900 dark:text-white">
                            Discover the <span className="text-[#22C55E]">Healing Power</span><br className="hidden md:block" /> of Nature
                        </h1>
                        
                        {dailyTip && (
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                transition={{ duration: 1.5, delay: 0.4 }}
                                className="flex items-center justify-center gap-2 text-[0.95rem] text-[#1A1A1A] dark:text-gray-300 max-w-xl mx-auto mb-10 mt-2 px-4 shadow-sm"
                            >
                                <Leaf className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                                <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>"{dailyTip.text}" — <span className="font-bold text-[#22C55E] not-italic" style={{ fontFamily: "'Poppins', sans-serif" }}>{dailyTip.fruit}</span></span>
                            </motion.div>
                        )}

                        <Link to="/benefits" className="flex items-center gap-2 mx-auto w-fit bg-[#22C55E] hover:bg-[#1ea850] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-green-200 dark:shadow-none tracking-wide">
                            <HeartPulse className="w-5 h-5" />
                            Explore Benefits
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Featured Fruits Grid */}
            <section className="py-24 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Essential Fruits</h2>
                        <p className="text-gray-500 dark:text-gray-400">Popular everyday superfoods</p>
                    </div>
                    <Link to="/search?category=fruits" className="hidden md:flex items-center gap-2 text-fruit-green font-semibold hover:gap-3 transition-all">
                        View All <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
                    {featuredFruits.map((fruit, i) => (
                        <FruitCard key={fruit.id} fruit={fruit} index={i} />
                    ))}
                </div>

                <Link to="/search?category=fruits" className="md:hidden mt-8 w-full flex justify-center items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 py-4 rounded-xl font-semibold active:scale-95 transition-transform">
                    View All Fruits <ArrowRight className="w-5 h-5" />
                </Link>
            </section>
        </div>
    );
}

