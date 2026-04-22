import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fruits } from '../data/fruits';
import { savageFoods as superfoods } from '../data/superfoods';
import { Search as SearchIcon, Lock } from 'lucide-react';
import FruitCard from '../components/FruitCard';
import SuperfoodCard from '../components/SuperfoodCard';
const Search = () => {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const q = query.toLowerCase();
    const inputRef = React.useRef(null);

    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const category = searchParams.get('category');
    const showFruits = !category || category === 'fresh';
    const showSuperfoods = !category || category === 'savage' || category === 'superfoods';

    // Filtros ultra-seguros: si algo falla, devuelve un array vacío pero no rompe la app
    const fruitResults = q ? (fruits || []).filter(f => f.name && f.name.toLowerCase().includes(q)) : (fruits || []);
    const superfoodResults = q ? (superfoods || []).filter(s => s.name && s.name.toLowerCase().includes(q)) : (superfoods || []);

    return (
        <div className="max-w-6xl mx-auto p-4 min-h-screen font-sans">
            <div className="relative my-8">
                <input
                    ref={inputRef}
                    type="text"
                    className="w-full pl-12 pr-4 py-5 rounded-3xl bg-white dark:bg-gray-800 shadow-xl border-none text-lg"
                    placeholder="Search Fresh Foods or Savage Foods..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-fruit-green" />
            </div>

            <div className="space-y-12">
                {/* FRUTAS - IMÁGENES GRANDES */}
                    {showFruits && fruitResults.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black mb-6 uppercase text-fruit-green">Fresh</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {fruitResults.map((f, i) => (
                                    <FruitCard key={f.id} fruit={f} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* SUPERFOODS - IMÁGENES GRANDES */}
                    {showSuperfoods && superfoodResults.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black mb-6 uppercase tracking-widest text-[#A855F7]">SAVAGE</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {superfoodResults.map((s, i) => (
                                    <SuperfoodCard key={s.id} superfood={s} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {(!showFruits || fruitResults.length === 0) && (!showSuperfoods || superfoodResults.length === 0) && (
                        <div className="text-center py-10 opacity-30">No results found</div>
                    )}
                </div>
        </div>
    );
};

export default Search;