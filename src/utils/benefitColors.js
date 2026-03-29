export const getBenefitStyle = (benefit) => {
    const defaultStyle = "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 shadow-sm";
    if (!benefit) return defaultStyle;

    const key = benefit.toLowerCase().trim();

    const styles = {
        hydration: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 shadow-sm",
        digestion: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 shadow-sm",
        heart: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 shadow-sm",
        immunity: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 shadow-sm",
        energy: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 shadow-sm",
        skin: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 shadow-sm",
        "anti-inflammatory": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 shadow-sm",
        memory: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm",
        sleep: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 shadow-sm",
        muscle: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 shadow-sm",
        "eye health": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 shadow-sm",
        "bone health": "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400 shadow-sm",
        "nausea relief": "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400 shadow-sm",
        "blood pressure": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 shadow-sm",
        vitality: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-400 shadow-sm",
        health: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 shadow-sm",
        "joint health": "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400 shadow-sm",
        adaptogen: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 shadow-sm",
        "stress relief": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 shadow-sm",
    };

    return styles[key] || "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 shadow-sm";
};
