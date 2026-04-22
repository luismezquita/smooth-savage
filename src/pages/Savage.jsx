import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { savageFoods } from '../data/superfoods';
import SuperfoodCard from '../components/SuperfoodCard';

const INITIAL_LIMIT = 8;

export default function Savage() {
    const [showAll, setShowAll] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filtered = query.trim()
        ? savageFoods.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
        : savageFoods;

    const displaySavage = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT);
    const hasMore = !showAll && filtered.length > INITIAL_LIMIT;

    const handleQueryChange = (val) => {
        setQuery(val);
        setShowAll(false);
    };

    return (
        <div className="min-h-screen pt-8 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

            {/* Header */}
            <div className="mb-10 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-black mb-4">Savage Foods</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    49 superfoods. All of them savage.
                </p>
            </div>

            {/* Hero image */}
            <div className="w-screen relative left-1/2 -translate-x-1/2 mb-10 aspect-square overflow-hidden">
                <img
                    src="/images/savage/savage_cover.webp"
                    alt="Savage Foods"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Search bar */}
            <div className="max-w-xl mx-auto mb-8">
                <div className="relative">
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
                {query && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                        {filtered.length} superfood{filtered.length !== 1 ? 's' : ''} with "{query}"
                    </p>
                )}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-14 max-w-xl mx-auto mb-12">
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
                        View All Savage Foods <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                    </button>
                </div>
            )}
        </div>
    );
}
