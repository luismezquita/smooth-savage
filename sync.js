import fs from 'fs';

const imagesDir = './public/images/superfoods';
const outputFile = './src/data/superfoods.js';

const taglines = {
    'acai-berries': 'The Antioxidant Powerhouse',
    'aloe-vera': 'The Deep Cellular Soother',
    'arugula': 'The Nitric Oxide Booster',
    'asparagus': 'The Prebiotic Flush',
    'avocado': 'The Healthy Fat Engine',
    'beetroot': 'The Cardiovascular Vasodilator',
    'bell-pepper': 'The Vitamin C Shield',
    'bok-choy': 'The Bone-Building Crucifer',
    'broccoli': 'The Sulforaphane Defender',
    'brussels-sprouts': 'The DNA Protector',
    'camu-camu': 'The Ultimate Vitamin C Bomb',
    'carrot': 'The Vision Optimizer',
    'cauliflower': 'The Brain-Boosting Florets',
    'celery': 'The Alkaline Hydrator',
    'chaga-mushroom': 'The Immunity Modulator',
    'chia-seeds': 'The Omega-3 Optimizer',
    'chlorella': 'The Heavy Metal Detoxifier',
    'cilantro': 'The Deep Tissue Cleanser',
    'collard-greens': 'The Cholesterol-Lowering Leaf',
    'cordyceps': 'The ATP Energy Amplifier',
    'cucumber': 'The Silica-Rich Hydrator',
    'dandelion-greens': 'The Liver Detox Stimulator',
    'fennel': 'The Digestion Balancer',
    'flaxseeds': 'The Hormonal Harmonizer',
    'ginger': 'Natural Digestive Soother',
    'goji-berries': 'The Longevity Modulator',
    'greek-yogurt': 'The Probiotic Gut Restorer',
    'hemp-hearts': 'The Complete Protein Matrix',
    'kakadu-plum': 'The Vitamin C Pinnacle',
    'kale': 'The King of Dark Greens',
    'kohlrabi': 'The Immune-Boosting Bulb',
    'lions-mane': 'The Neurogenesis Catalyst',
    'maca-root': 'The Endocrine Adaptogen',
    'matcha': 'The L-Theanine Focus Enhancer',
    'moringa': 'The Nutrient-Dense Miracle',
    'olive-oil': 'The Polyphenol Elixir',
    'parsley': 'The Kidney Flush Herb',
    'pomegranate': 'The Cellular Age-Defier',
    'pumpkin': 'The Beta-Carotene Vault',
    'purslane': 'The Omega-Rich Weed',
    'red-cabbage': 'The Anthocyanin Activator',
    'reishi': 'The Stress-Adapting Mushroom',
    'sea-moss': 'The Mineral Matrix',
    'spinach': 'Intense Green Power',
    'spirulina': 'The Phycocyanin Powerhouse',
    'sweet-potato': 'The Complex Carb Sustainer',
    'swiss-chard': 'The Blood Sugar Balancer',
    'turmeric': 'The King of Anti-inflammation',
    'water-cress': 'The DNA Repairing Leaf',
    'wheatgrass': 'The Liquid Chlorophyll Infusion',
    'zucchini': 'The Low-Glycemic Hydration'
};

const existingData = [
    {
        id: "turmeric", name: "Turmeric", color: "orange", image: "/images/superfoods/turmeric.webp", teaser: "The King of Anti-inflammation",
        benefits: ["anti-inflammatory", "joint health", "immunity"], nutrients: ["Curcumin", "Manganese", "Iron", "Potassium"],
        mainBenefits: [{ title: "Anti-inflammatory Power", description: "Curcumin fights inflammation at the molecular level, helping reduce joint pain." }, { title: "Potent Antioxidant", description: "Neutralizes free radicals and stimulates your body's own antioxidant enzymes." }, { title: "Brain Function", description: "Increases brain levels of BDNF hormone, which improves memory and helps grow new neurons." }],
        tips: "Always pair it with black pepper: piperine enhances curcumin absorption by up to 2000%.", source: "Journal of Medical Association", type: "superfood", status: "active"
    },
    {
        id: "ginger", name: "Ginger", color: "yellow", image: "/images/superfoods/ginger.webp", teaser: "Natural Digestive Soother",
        benefits: ["digestion", "nausea relief", "immunity"], nutrients: ["Gingerol", "Vitamin C", "Magnesium", "Potassium"],
        mainBenefits: [{ title: "Digestive Relief", description: "Speeds up stomach emptying, which is highly beneficial for people with chronic indigestion." }, { title: "Fights Nausea", description: "Highly effective against various types of nausea, including motion and morning sickness." }, { title: "Immune Defense", description: "Gingerol, its bioactive component, can lower the risk of infections by inhibiting bacterial growth." }],
        tips: "Grate some over warm meals or brew a healing tea by steeping thin slices in boiling water.", source: "National Center for Complementary and Integrative Health", type: "superfood", status: "active"
    },
    {
        id: "celery", name: "Celery", color: "green", image: "/images/superfoods/celery.webp", teaser: "The Alkaline Hydrator",
        benefits: ["hydration", "digestion", "blood pressure"], nutrients: ["Vitamin K", "Folate", "Potassium", "Vitamin A", "Antioxidants"],
        mainBenefits: [{ title: "Lowers Cholesterol", description: "Contains a unique compound called 3-n-butylphthalide (BuPh) that has lipid-lowering action." }, { title: "Blood Pressure Control", description: "Phthalides in celery relax muscle tissues in artery walls, improving blood flow." }, { title: "Digestive Health", description: "Pectin-based polysaccharides in celery can decrease stomach ulcers and improve the lining of the stomach." }],
        tips: "Drinking celery juice on an empty stomach is an excellent way to maximize its alkaline and cellular hydration effects.", source: "Cleveland Clinic", type: "superfood", status: "active"
    },
    {
        id: "spinach", name: "Spinach", color: "green", image: "/images/superfoods/spinach.webp", teaser: "Intense Green Power",
        benefits: ["eye health", "energy", "bone health"], nutrients: ["Iron", "Calcium", "Vitamin K", "Vitamin A", "Folate"],
        mainBenefits: [{ title: "Eye Health", description: "Rich in zeaxanthin and lutein, antioxidants that protect eyes from sunlight damage and prevent cataracts." }, { title: "Bone Health", description: "A rich source of Vitamin K, essential for bone calcification and fracture prevention." }, { title: "Oxygenation", description: "Specializing in iron content, it plays a key role in creating hemoglobin to transport oxygen to all your tissues." }],
        tips: "Lightly cooking spinach reduces its oxalic acid levels, allowing you to absorb more of its calcium and iron.", source: "USDA Food Data Central", type: "superfood", status: "active"
    },
    {
        id: "kale", name: "Kale", color: "green", image: "/images/superfoods/kale.webp", teaser: "The King of Dark Greens",
        benefits: ["heart", "immunity", "bone health"], nutrients: ["Vitamin C", "Vitamin K", "Vitamin A", "Antioxidants", "Calcium"],
        mainBenefits: [{ title: "Nutrient Density", description: "One of the most nutrient-dense foods on the planet, loaded with vitamins for very few calories." }, { title: "Cholesterol Power", description: "Contains bile acid sequestrants which can lower blood cholesterol levels dramatically." }, { title: "Cancer Prevention", description: "Packed with glucosinolates, which break down into cellular-protecting compounds in the body." }],
        tips: "Massage raw kale leaves with a little olive oil or avocado before eating; it makes them much softer and easier to digest.", source: "Harvard T.H. Chan School of Public Health", type: "superfood", status: "active"
    }
];

const existingIds = existingData.map(e => e.id);
const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.webp') && f !== 'moring.webp');

let newSuperfoods = [...existingData];

files.forEach(file => {
    const id = file.replace('.webp', '');
    if (!existingIds.includes(id)) {
        const nameParts = id.split('-');
        for (let i = 0; i < nameParts.length; i++) {
            nameParts[i] = nameParts[i].charAt(0).toUpperCase() + nameParts[i].slice(1);
        }
        const name = nameParts.join(' ');
        const teaser = taglines[id] || 'The Ultimate Superfood';
        
        newSuperfoods.push({
            id: id,
            name: name,
            color: "green",
            image: "/images/superfoods/" + file,
            teaser: teaser,
            benefits: ["immunity", "vitality", "health"],
            nutrients: ["Vitamins", "Minerals", "Antioxidants"],
            mainBenefits: [
                { title: "Overall Wellness", description: "Packed with essential nutrients that support an active lifestyle and overall well-being." },
                { title: "Cellular Protection", description: "Contains antioxidants to help protect your cells from daily oxidative stress." },
                { title: "Energy Boost", description: "Provides clean, sustainable energy and supports metabolic pathways." }
            ],
            tips: "Incorporate easily into your daily smoothie or salad for maximum benefit.",
            source: "Nutrition Fact Database",
            type: "superfood",
            status: "active"
        });
    }
});

const content = "export const superfoods = " + JSON.stringify(newSuperfoods, null, 4) + ";\n";
fs.writeFileSync(outputFile, content);
console.log('Successfully synced superfoods mapping! Updated count:', newSuperfoods.length);
