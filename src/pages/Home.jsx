import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Leaf, ArrowRight, Search, X } from 'lucide-react';
import { fruits } from '../data/fruits';
import FruitCard from '../components/FruitCard';
import tips from '../data/tips.json';

const INITIAL_LIMIT = 20;

export default function Home() {
    // If returning via back button with a hash, restore the full list immediately
    const [showAll, setShowAll] = useState(() => !!window.location.hash);
    const [query, setQuery] = useState('');
    const [dailyTip, setDailyTip] = useState(null);

    const filtered = query.trim()
        ? fruits.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
        : fruits;

    const displayFruits = showAll
        ? [...filtered].sort((a, b) => a.name.localeCompare(b.name))
        : filtered.slice(0, INITIAL_LIMIT);
    const hasMore = !showAll && filtered.length > INITIAL_LIMIT;

    const handleQueryChange = (val) => {
        setQuery(val);
        setShowAll(false);
    };

    // Scroll to the anchored item after the list renders on back-navigation
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const el = document.getElementById(hash.slice(1));
            if (el) el.scrollIntoView({ block: 'center' });
        }
    }, []);

    useEffect(() => {
        if (tips && tips.length > 0) {
            setDailyTip(tips[Math.floor(Math.random() * tips.length)]);
        }
    }, []);

    return (
        /* 2. THE BACKGROUND FIX: Transparent background lets the theme glows shine through */
        <div className="relative min-h-screen bg-white dark:bg-transparent pb-32 overflow-hidden">
            
            {/* 3. THE SAVAGE GLOWS (Purple & Green Atmosphere) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-5%] left-[-10%] w-[90%] h-[60%] bg-purple-600/20 dark:bg-purple-900/40 blur-[140px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-10%] w-[70%] h-[50%] bg-orange-400/10 dark:bg-orange-500/20 blur-[120px] rounded-full" />
            </div>

            <section className="relative z-10 pt-4 px-4 mb-16">
                <div className="max-w-md mx-auto text-center">
                    {dailyTip && (
                        <div className="mb-4 bg-orange-50/40 dark:bg-orange-900/10 p-5 rounded-2xl border border-orange-100/50 backdrop-blur-md">
                            <p className="text-xl font-black text-gray-800 dark:text-white leading-snug">
                                <Leaf className="inline w-4 h-4 mb-0.5 mr-1.5 text-orange-500" />
                                "{dailyTip.text}"
                            </p>
                            <p className="mt-2 text-sm font-bold text-orange-500 uppercase tracking-widest not-italic">{dailyTip.fruit}</p>
                        </div>
                    )}

                    <div className="mb-6">
                        <Link to="/benefits" className="inline-flex items-center gap-2 bg-orange-500 text-gray-900 px-10 py-3 rounded-full font-black shadow-lg text-[13px] uppercase tracking-[0.2em] active:scale-95 transition-all whitespace-nowrap">
                            <HeartPulse className="w-4 h-4" /> Explore Benefits
                        </Link>
                    </div>

                    <div className="w-screen relative left-1/2 -translate-x-1/2 mb-8 aspect-square overflow-hidden">
                        <img src="/images/smoothies/black_seed_cure.webp" className="w-full h-full object-cover" alt="Fresh Foods Hero" />
                    </div>

                </div>
            </section>

            <section className="relative z-10 py-12 border-t border-gray-100 dark:border-gray-800/50 max-w-xl mx-auto px-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2 uppercase tracking-tighter">
                        <span>🍓</span> Fresh Foods
                    </h2>
                </div>

                <div className="relative mb-10">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        value={query}
                        onChange={e => handleQueryChange(e.target.value)}
                        placeholder="Search Fresh Foods..."
                        className="w-full pl-12 pr-10 py-3 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                    />
                    {query && (
                        <button onClick={() => handleQueryChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-14 mb-12">
                    {displayFruits.map((fruit, i) => (
                        <div
                            key={fruit.id || i}
                            id={fruit.id}
                            onClickCapture={() => window.history.replaceState(null, '', '#' + fruit.id)}
                        >
                            <FruitCard fruit={fruit} index={i} />
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <p className="text-center text-gray-400 py-8">No results for "{query}"</p>
                    )}
                </div>

                {hasMore && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => setShowAll(true)}
                            className="group flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                        >
                            View All Fresh Items <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}