import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { benefitCategories } from '../data/benefits';

export default function Benefits() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                    Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-fruit-green to-emerald-500">Benefits</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Discover the profound healing powers of nature. Select a premium health goal to find precisely which fresh and savage foods support your wellness journey.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {benefitCategories.map((category, index) => (
                    <Link key={category.id} to={`/benefits/${category.id}`}>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 + 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`h-full min-h-[220px] rounded-3xl p-6 bg-gradient-to-br ${category.color} text-white shadow-xl hover:shadow-2xl transition-all hover:scale-[1.03] group relative overflow-hidden flex flex-col justify-end border border-white/10`}
                        >
                            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all duration-500 ease-out" />
                            <div className="absolute top-6 left-6 text-4xl mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110 origin-bottom-left">{category.icon}</div>
                            <div className="mt-auto">
                                <h3 className="text-2xl font-bold mb-1 relative z-10 leading-tight">{category.title}</h3>
                                <p className="text-white/80 text-sm font-medium relative z-10 max-w-[90%]">{category.tagline}</p>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
