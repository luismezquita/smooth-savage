export const normalize = (str) =>
    (str || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export const getBenefitStyle = (benefit) => {
    const key = benefit ? benefit.toLowerCase().trim() : '';

    if (key.includes('immunity')) return "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-sm border border-white/20";
    if (key.includes('energy')) return "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm border border-white/20";
    if (key.includes('digestion')) return "bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-sm border border-white/20";
    if (key.includes('stress')) return "bg-gradient-to-r from-indigo-400 to-purple-500 text-white shadow-sm border border-white/20";
    if (key.includes('anti-inflammatory')) return "bg-gradient-to-r from-rose-400 to-red-500 text-white shadow-sm border border-white/20";
    if (key.includes('skin')) return "bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-sm border border-white/20";
    if (key.includes('heart')) return "bg-gradient-to-r from-red-400 to-rose-600 text-white shadow-sm border border-white/20";
    if (key.includes('detox')) return "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-sm border border-white/20";
    if (key.includes('sleep')) return "bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white shadow-sm border border-white/20";
    if (key.includes('antioxidant')) return "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-sm border border-white/20";

    return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 shadow-sm";
};
