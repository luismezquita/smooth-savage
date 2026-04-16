import { fruits } from "./fruits";
import { superfoods } from "./superfoods";
import { smoothies } from "./smoothies";

export const benefitCategories = [
    { id: 'immunity', title: 'Immunity Boost', icon: '🛡️', tagline: 'Fortify your natural defenses', color: 'from-orange-400 to-red-500' },
    { id: 'energy', title: 'Energy & Vitality', icon: '⚡', tagline: 'Sustained power for your day', color: 'from-amber-400 to-orange-500' },
    { id: 'digestion', title: 'Digestion & Gut Health', icon: '🌿', tagline: 'Soothe and balance your core', color: 'from-emerald-400 to-teal-500' },
    { id: 'stress', title: 'Stress Relief & Calm', icon: '🧘', tagline: 'Find your center naturally', color: 'from-indigo-400 to-purple-500' },
    { id: 'anti-inflammatory', title: 'Anti-Inflammatory', icon: '🔥', tagline: 'Cool dietary inflammation', color: 'from-rose-400 to-red-500' },
    { id: 'skin', title: 'Skin Glow & Beauty', icon: '✨', tagline: 'Radiate health from within', color: 'from-pink-400 to-rose-400' },
    { id: 'heart', title: 'Heart Health', icon: '❤️', tagline: 'Nourish your cardiovascular system', color: 'from-red-400 to-rose-600' },
    { id: 'detox', title: 'Detox & Cleansing', icon: '💧', tagline: 'Flush toxins and reset', color: 'from-cyan-400 to-blue-500' },
    { id: 'sleep', title: 'Sleep & Recovery', icon: '🌙', tagline: 'Deep, restorative rest', color: 'from-violet-500 to-fuchsia-600' },
    { id: 'antioxidant', title: 'Antioxidant Power', icon: '🫐', tagline: 'Protect cells from aging', color: 'from-fuchsia-500 to-purple-600' },
];

export const getItemsForBenefit = (benefitId) => {
    const categoryName = benefitCategories.find(c => c.id === benefitId)?.title || '';

    const finalFruits = fruits.filter(f => f.benefit === categoryName);
    const finalSuperfoods = superfoods.filter(s => s.benefit === categoryName);
    const finalSmoothies = smoothies.filter(s => s.benefit === categoryName);

    return { fruits: finalFruits, superfoods: finalSuperfoods, smoothies: finalSmoothies };
};
