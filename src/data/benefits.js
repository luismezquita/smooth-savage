import { fruits } from "./fruits";
import { savageFoods as superfoods } from "./superfoods";
import { smoothies } from "./smoothies";

export const benefitCategories = [
    { id: 'immunity', title: 'Natural Defenses', icon: '🛡️', tagline: 'Fortify your natural defenses', color: 'from-orange-400 to-red-500' },
    { id: 'energy', title: 'Energy & Vitality', icon: '⚡', tagline: 'Sustained power for your day', color: 'from-amber-400 to-orange-500' },
    { id: 'digestion', title: 'Digestive Balance', icon: '🌿', tagline: 'Soothe and balance your core', color: 'from-emerald-400 to-teal-500' },
    { id: 'stress', title: 'Calm & Balance', icon: '🧘', tagline: 'Find your center naturally', color: 'from-indigo-400 to-purple-500' },
    { id: 'body-balance', title: 'Body Balance', icon: '🔥', tagline: 'Support everyday body balance', color: 'from-rose-400 to-red-500' },
    { id: 'skin', title: 'Skin Glow & Beauty', icon: '✨', tagline: 'Radiate wellness from within', color: 'from-pink-400 to-rose-400' },
    { id: 'heart', title: 'Cardiovascular Wellness', icon: '❤️', tagline: 'Nourish your cardiovascular system', color: 'from-red-400 to-rose-600' },
    { id: 'clean-nutrition', title: 'Clean Nutrition', icon: '💧', tagline: 'Refresh your daily routine', color: 'from-cyan-400 to-blue-500' },
    { id: 'sleep', title: 'Rest & Renewal', icon: '🌙', tagline: 'Deep, restorative rest', color: 'from-violet-500 to-fuchsia-600' },
    { id: 'antioxidant', title: 'Antioxidant Support', icon: '🫐', tagline: 'Support cellular vitality', color: 'from-fuchsia-500 to-purple-600' },
    { id: 'brain', title: 'Focus & Clarity', icon: '🧠', tagline: 'Sharpen focus and cognitive power', color: 'from-blue-500 to-indigo-600' },
];

export const getItemsForBenefit = (benefitId) => {
    const categoryName = benefitCategories.find(c => c.id === benefitId)?.title || '';

    const finalFruits = fruits.filter(f => f.benefit === categoryName);
    const finalSuperfoods = superfoods.filter(s => s.benefit === categoryName);
    const finalSmoothies = smoothies.filter(s => s.benefit === categoryName);

    return { fruits: finalFruits, superfoods: finalSuperfoods, smoothies: finalSmoothies };
};
