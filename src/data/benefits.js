import { fruits } from "./fruits";
import { superfoods } from "./superfoods";

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

const itemToCategoryMap = {
    // Immunity Boost
    "blood_orange": "immunity", "camu-camu": "immunity", "cranberry": "immunity", "elderberry": "immunity", "grapefruit": "immunity", "guava": "immunity", "kiwi": "immunity", "kumquat": "immunity", "lemon": "immunity", "lemons": "immunity", "lime": "immunity", "lychee": "immunity", "orange": "immunity", "oranges": "immunity", "pomelo": "immunity", "starfruit": "immunity", "ugly_fruit": "immunity", "bell-pepper": "immunity", "broccoli": "immunity", "kakadu-plum": "immunity", "sea-moss": "immunity",
    // Energy & Vitality
    "bananas": "energy", "blue_java_banana": "energy", "coconut": "energy", "durian": "energy", "jacckfruit": "energy", "jackfruit": "energy", "mango": "energy", "plantain": "energy", "rambutan": "energy", "chia-seeds": "energy", "cordyceps": "energy", "hemp-hearts": "energy", "maca-root": "energy", "sweet-potato": "energy",
    // Digestion & Gut Health
    "apple": "digestion", "apples": "digestion", "blacksapote": "digestion", "fig": "digestion", "papaya": "digestion", "pear": "digestion", "pineapple": "digestion", "plum": "digestion", "prickly_pear": "digestion", "quince": "digestion", "tamarind": "digestion", "aloe-vera": "digestion", "asparagus": "digestion", "celery": "digestion", "fennel": "digestion", "flaxseeds": "digestion", "greek-yogurt": "digestion", "zucchini": "digestion",
    // Stress Relief & Calm
    "longan": "stress", "passionfruit": "stress", "ashwagandha": "stress", "reishi": "stress",
    // Anti-Inflammatory
    "cape_goosberry": "anti-inflammatory", "mangosteen": "anti-inflammatory", "mulberry": "anti-inflammatory", "ginger": "anti-inflammatory", "olive-oil": "anti-inflammatory", "turmeric": "anti-inflammatory",
    // Skin Glow & Beauty
    "apricot": "skin", "cantaloupe": "skin", "nectarines": "skin", "peach": "skin", "avocado": "skin", "cucumber": "skin", "pumpkin": "skin",
    // Heart Health
    "custard_apple": "heart", "grapes": "heart", "loquat": "heart", "pomegranate": "heart", "beetroot": "heart",
    // Detox & Cleansing
    "honeydew": "detox", "watermelon": "detox", "arugula": "detox", "bok-choy": "detox", "brussels-sprouts": "detox", "carrot": "detox", "cauliflower": "detox", "chlorella": "detox", "cilantro": "detox", "collard-greens": "detox", "dandelion-greens": "detox", "kale": "detox", "kohlrabi": "detox", "parsley": "detox", "purslane": "detox", "red-cabbage": "detox", "spinach": "detox", "spirulina": "detox", "swiss-chard": "detox", "water-cress": "detox", "wheatgrass": "detox",
    // Sleep & Recovery
    "cherries": "sleep",
    // Antioxidant Power
    "acai_berries": "antioxidant", "acai-berries": "antioxidant", "blackberries": "antioxidant", "blackcurrant": "antioxidant", "blueberries": "antioxidant", "dragonfruit": "antioxidant", "persimon": "antioxidant", "physalis": "antioxidant", "plumcot": "antioxidant", "raspberries": "antioxidant", "red_currant": "antioxidant", "strawberries": "antioxidant", "chaga-mushroom": "antioxidant", "goji-berries": "antioxidant", "lions-mane": "antioxidant", "matcha": "antioxidant", "moringa": "antioxidant", "moring": "antioxidant"
};

export const getItemsForBenefit = (benefitId) => {
    const finalFruits = fruits.filter(f => {
        let key1 = f.id;
        let key2 = f.name.toLowerCase().replace(/ /g, '_');
        let mapped = itemToCategoryMap[key1] || itemToCategoryMap[key2];
        if (!mapped) mapped = 'antioxidant'; 
        return mapped === benefitId;
    });

    const finalSuperfoods = superfoods.filter(s => {
        let key1 = s.id;
        let key2 = s.name.toLowerCase().replace(/ /g, '-');
        let mapped = itemToCategoryMap[key1] || itemToCategoryMap[key2];
        if (!mapped) mapped = 'antioxidant';
        return mapped === benefitId;
    });

    return { fruits: finalFruits, superfoods: finalSuperfoods };
};
