import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, Search, X } from 'lucide-react';
import { savageFoods } from '../data/superfoods';
import SuperfoodCard from '../components/SuperfoodCard';
import tips from '../data/tips.json';

const INITIAL_LIMIT = 8;

export default function Savage() {
    const [showAll, setShowAll] = useState(false);
    const [query, setQuery] = useState('');
    const [dailyTip, setDailyTip] = useState(null);

    const filtered = query.trim()
        ? savageFoods.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
        : savageFoods;

    const displaySavage = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT);
    const hasMore = !showAll && filtered.length > INITIAL_LIMIT;

    const handleQueryChange = (val) => {
        setQuery(val);
        setShowAll(false);
    };

    useEffect(() => {
        if (tips && tips.length > 0) {
            setDailyTip(tips[Math.floor(Math.random() * tips.length)]);
        }
    }, []);

    return (
        /* BACKGROUND & GLOWS */
        <div className="relative min-h-screen bg-white dark:bg-transparent pb-32 overflow-hidden">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-5%] left-[-10%] w-[90%] h-[60%] bg-purple-600/20 dark:bg-purple-900/40 blur-[140px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-10%] w-[70%] h-[50%] bg-green-600/10 dark:bg-green-600/20 blur-[120px] rounded-full" />
            </div>

            {/* HERO SECTION: FULL-WIDTH COVER */}
            <div className="relative z-10 w-full h-[55vh] min-h-[320px] mb-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                <img
                    src="/images/savage/savage_cover.webp"
                    className="w-full h-full object-cover"
                    alt="Savage Foods"
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-8 text-white text-center">
                    <p className="text-[10px] font-bold tracking-[0.5em] text-purple-300 uppercase mb-3">HIGH POTENCY BOOSTERS</p>
                    <h1 className="text-4xl font-black leading-[1.1] tracking-tighter">
                        Unleash Your <br /> <span className="text-purple-400">Savage Power</span>
                    </h1>
                </div>
            </div>

            {/* DAILY TIP */}
            {dailyTip && (
                <div className="relative z-10 px-4 mb-10 max-w-md mx-auto">
                    <div className="bg-purple-50/30 dark:bg-purple-900/10 p-4 rounded-2xl border border-purple-100/40 backdrop-blur-md text-center">
                        <p className="text-[14px] italic text-gray-600 dark:text-gray-300">
                            <Zap className="inline w-3.5 h-3.5 mb-0.5 mr-1 text-purple-500" />
                            "{dailyTip.text}" — <span className="font-bold text-purple-500 not-italic">{dailyTip.fruit}</span>
                        </p>
                    </div>
                </div>
            )}

            {/* CONTENT SECTION: GRID */}
            <section className="relative z-10 py-12 border-t border-gray-100 dark:border-gray-800/50 max-w-xl mx-auto px-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2 uppercase tracking-tighter">
                        <span>⚡</span> Savage Foods
                    </h2>
                </div>

                <div className="relative mb-10">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        value={query}
                        onChange={e => handleQueryChange(e.target.value)}
                        placeholder="Search Savage Foods..."
                        className="w-full pl-12 pr-10 py-3 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                    {query && (
                        <button onClick={() => handleQueryChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-14 mb-12">
                    {displaySavage.map((food, i) => (
                        <SuperfoodCard key={food.id || i} superfood={food} index={i} />
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
                            View All Savage Items <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}