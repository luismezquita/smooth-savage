import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Leaf, ArrowRight, Search, X } from 'lucide-react';
import { fruits } from '../data/fruits';
import FruitCard from '../components/FruitCard';
import tips from '../data/tips.json';

const INITIAL_LIMIT = 20;
const SCROLL_KEY = 'freshListScrollPos';
const SHOW_ALL_KEY = 'freshListShowAll';

export default function Home() {
    const [showAll, setShowAll] = useState(() => sessionStorage.getItem(SHOW_ALL_KEY) === 'true');
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

    // Restore scroll position after returning from a detail card
    useEffect(() => {
        const saved = sessionStorage.getItem(SCROLL_KEY);
        if (saved !== null) {
            const pos = parseInt(saved, 10);
            sessionStorage.removeItem(SCROLL_KEY);
            sessionStorage.removeItem(SHOW_ALL_KEY);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    window.scrollTo(0, pos);
                });
            });
        }
    }, []);

    useEffect(() => {
        if (tips && tips.length > 0) {
            setDailyTip(tips[Math.floor(Math.random() * tips.length)]);
        }
    }, []);

    return (
        <div className="relative min-h-screen pb-32">

            {/* DAILY TIP + EXPLORE BENEFITS — at top like original */}
            <section className="relative z-10 pt-4 px-4 mb-6">
                <div className="max-w-md mx-auto text-center">
                    {dailyTip && (
                        <div className="mb-5 bg-orange-50/60 dark:bg-orange-900/10 px-4 py-3 rounded-2xl border border-orange-200/60 dark:border-orange-100/20 backdrop-blur-md">
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-snug">
                                <Leaf className="inline w-3 h-3 mb-0.5 mr-1 text-orange-500" />
                                "{dailyTip.text}"
                            </p>
                            <p className="mt-1.5 text-xs font-bold text-orange-500 uppercase tracking-widest not-italic">{dailyTip.fruit}</p>
                        </div>
                    )}
                    <Link to="/benefits" className="inline-flex items-center gap-2 bg-orange-500 text-gray-900 px-10 py-3 rounded-full font-black shadow-lg text-[13px] uppercase tracking-[0.2em] active:scale-95 transition-all whitespace-nowrap">
                        <HeartPulse className="w-4 h-4" /> Explore Benefits
                    </Link>
                </div>
            </section>

            {/* HERO IMAGE: smoothie image like original */}
            <div className="w-screen relative left-1/2 -translate-x-1/2 mb-10 aspect-square overflow-hidden">
                <img src="/images/smoothies/black_seed_cure.webp" className="w-full h-full object-cover" alt="Fresh Foods Hero" />
            </div>

            {/* TITLE — below hero image, before the list */}
            <div className="pb-4 text-center max-w-2xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-black mb-2">Fresh Foods</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    103 exotic fruits & foods. Each one worth knowing.
                </p>
            </div>

            <section className="relative z-10 py-12 border-t border-amber-300/50 dark:border-gray-800/50 max-w-xl mx-auto px-6">
                <div className="relative mb-10">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" style={{ color: '#F97316' }} />
                    <input
                        type="text"
                        value={query}
                        onChange={e => handleQueryChange(e.target.value)}
                        placeholder="Search Fresh Foods..."
                        className="savage-search w-full pl-12 pr-10 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                        style={{ background: '#FFF8F0', border: '2px solid #F97316', color: '#111827' }}
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
                            onClickCapture={() => {
                                sessionStorage.setItem(SCROLL_KEY, window.scrollY);
                                sessionStorage.setItem(SHOW_ALL_KEY, showAll);
                            }}
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