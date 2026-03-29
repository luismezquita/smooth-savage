import fs from 'fs';

const newFruits = [
    {
        id: "acerola_fruit",
        name: "Acerola",
        color: "red",
        image: "/images/fruits/acerola.webp",
        teaser: "The Tropical Vitamin C Guardian",
        benefits: ["immunity", "skin", "heart"],
        healthTags: ["Immunity", "Antioxidants"],
        nutrients: ["Vitamin C", "Vitamin A", "Antioxidants"],
        mainBenefits: [
            { title: "Immune Boost", description: "Outperforms oranges in Vitamin C content, providing an unmatched immune shield." },
            { title: "Cellular Health", description: "Packed with powerful antioxidants to combat cellular aging." },
            { title: "Skin Radiance", description: "Promotes collagen production for firm, glowing skin." }
        ],
        tips: "Ideal for fresh juices to maximize its heat-sensitive Vitamin C.",
        source: "Nutrition Fact Database"
    },
    {
        id: "amla_fruit",
        name: "Amla",
        color: "green",
        image: "/images/fruits/amla.webp",
        teaser: "The Ayurvedic Rejuvenator",
        benefits: ["digestion", "immunity", "hair health"],
        healthTags: ["Digestion", "Immunity"],
        nutrients: ["Vitamin C", "Tannins", "Iron"],
        mainBenefits: [
            { title: "Digestive Fire", description: "Balances stomach acid and enhances the absorption of essential nutrients." },
            { title: "Hair Vitality", description: "Strengthens follicles from the root and prevents premature greying." },
            { title: "Immune Armor", description: "Delivers an intense dose of longevity-boosting antioxidants." }
        ],
        tips: "Blend a small amount into extremely sweet smoothies to balance its tart astringency.",
        source: "Nutrition Fact Database"
    },
    {
        id: "aronia_berry",
        name: "Aronia Berry",
        color: "purple",
        image: "/images/fruits/aronia_berry.webp",
        teaser: "The Dark Purple Antioxidant King",
        benefits: ["anti-inflammatory", "heart", "immunity"],
        healthTags: ["Antioxidants", "Heart Health"],
        nutrients: ["Anthocyanins", "Vitamin C", "Fiber"],
        mainBenefits: [
            { title: "Vascular Health", description: "Improves blood circulation and deeply cleanses arterial walls." },
            { title: "Inflammation Defense", description: "Contains unparalleled levels of anthocyanins to immediately reduce systemic swelling." },
            { title: "Cellular Shield", description: "Protects cells from acute oxidative damage caused by daily stressors." }
        ],
        tips: "Often tart when raw, they taste best when naturally sweetened in baked goods.",
        source: "Nutrition Fact Database"
    },
    {
        id: "baobab",
        name: "Baobab",
        color: "yellow",
        image: "/images/fruits/baobab.webp",
        teaser: "The Prebiotic African Superfruit",
        benefits: ["digestion", "energy", "immunity"],
        healthTags: ["Digestion", "Energy"],
        nutrients: ["Vitamin C", "Calcium", "Fiber"],
        mainBenefits: [
            { title: "Gut Microbiome", description: "Exceptionally rich in soluble fiber, serving as an elite prebiotic for gut flora." },
            { title: "Sustained Energy", description: "Slow-releasing carbohydrates ensure an all-day, gentle energy lift." },
            { title: "Bone Density", description: "Provides a surprisingly high level of plant-based calcium for structural support." }
        ],
        tips: "The fruit naturally dries on the branch, rendering its pulp into a perfectly ready-to-use powder.",
        source: "Nutrition Fact Database"
    },
    {
        id: "bilberry",
        name: "Bilberry",
        color: "purple",
        image: "/images/fruits/bilberry.webp",
        teaser: "The Vision-Enhancing Forest Berry",
        benefits: ["eye health", "anti-inflammatory", "heart"],
        healthTags: ["Vision", "Antioxidants"],
        nutrients: ["Anthocyanins", "Vitamin C", "Manganese"],
        mainBenefits: [
            { title: "Sharp Vision", description: "Scientifically proven to improve night vision and combat macular degeneration." },
            { title: "Vascular Strength", description: "Strengthens capillaries and improves overall microcirculation." },
            { title: "Cognitive Protection", description: "Shields delicate brain tissues from age-related oxidative stress." }
        ],
        tips: "Enjoy them fresh; their color will temporarily stain your lips a deep, vibrant blue.",
        source: "Nutrition Fact Database"
    },
    {
        id: "breadfruit",
        name: "Breadfruit",
        color: "green",
        image: "/images/fruits/breadfruit.webp",
        teaser: "The Starchy Sustenance Wonder",
        benefits: ["energy", "digestion", "heart"],
        healthTags: ["Energy", "Heart Health"],
        nutrients: ["Complex Carbs", "Potassium", "Fiber"],
        mainBenefits: [
            { title: "Endless Endurance", description: "Provides a vast energy reserve via extremely clean, complex carbohydrates." },
            { title: "Cardio Balance", description: "Rich in potassium to effectively lower blood pressure immediately." },
            { title: "Bowel Health", description: "The profound fiber content ensures impeccable digestive regularity." }
        ],
        tips: "Roast or fry it like a potato; it smells and tastes remarkably like freshly baked bread.",
        source: "Nutrition Fact Database"
    },
    {
        id: "cempedak",
        name: "Cempedak",
        color: "yellow",
        image: "/images/fruits/cempedak.webp",
        teaser: "The Sweet Tropical Energy Bomb",
        benefits: ["energy", "digestion", "immunity"],
        healthTags: ["Energy", "Digestion"],
        nutrients: ["Vitamin A", "Vitamin C", "Fiber"],
        mainBenefits: [
            { title: "Vitality Boost", description: "Instantly recharges the body with dense, natural calories and simple sugars." },
            { title: "Vision Health", description: "Contains powerful carotenes necessary for flawless eye health." },
            { title: "Gut Cleansing", description: "Dietary fiber effectively sweeps the intestinal tract." }
        ],
        tips: "Similar to jackfruit but sweeter; perfectly crisp when coated in a light batter and fried.",
        source: "Nutrition Fact Database"
    },
    {
        id: "jambolan",
        name: "Jambolan",
        color: "purple",
        image: "/images/fruits/jambolan.webp",
        teaser: "The Blood Sugar Balancer",
        benefits: ["blood pressure", "digestion", "heart"],
        healthTags: ["Heart Health", "Digestion"],
        nutrients: ["Vitamin C", "Iron", "Antioxidants"],
        mainBenefits: [
            { title: "Sugar Control", description: "Contains compounds that naturally suppress sudden blood sugar spikes." },
            { title: "Gastric Relief", description: "Provides an astringent effect that rapidly soothes acute digestive distress." },
            { title: "Anemia Aid", description: "The high iron content promotes the rapid formation of active red blood cells." }
        ],
        tips: "Its sharp flavor leaves a dry sensation in the mouth, best enjoyed fully ripe.",
        source: "Nutrition Fact Database"
    },
    {
        id: "jujube",
        name: "Jujube",
        color: "red",
        image: "/images/fruits/jujube.webp",
        teaser: "The Ancient Calming Date",
        benefits: ["sleep", "digestion", "immunity"],
        healthTags: ["Sleep", "Immunity"],
        nutrients: ["Vitamin C", "Saponins", "Flavonoids"],
        mainBenefits: [
            { title: "Restorative Sleep", description: "Saponins trigger deep relaxation, curing insomnia naturally." },
            { title: "Gut Protection", description: "Coats the stomach lining to prevent and treat debilitating ulcers." },
            { title: "Immune Fortification", description: "High natural vitamin C keeps common pathogens permanently at bay." }
        ],
        tips: "They crisp like apples when fresh and sweeten like pure caramel when left to sun-dry.",
        source: "Nutrition Fact Database"
    },
    {
        id: "lucuma",
        name: "Lucuma",
        color: "yellow",
        image: "/images/fruits/lucuma.webp",
        teaser: "The Gold of the Incas",
        benefits: ["energy", "skin", "digestion"],
        healthTags: ["Energy", "Skin Health"],
        nutrients: ["Beta-Carotene", "Iron", "Zinc"],
        mainBenefits: [
            { title: "Sustained Energy", description: "A highly regarded low-glycemic sweetener that feeds your body steadily." },
            { title: "Tissue Repair", description: "High zinc content aggressively speeds up the physical wound healing process." },
            { title: "Youthful Skin", description: "Beta-carotene fights daily cellular degradation, leaving skin flawless." }
        ],
        tips: "Blend the sweet powder into milk; it tastes exactly like maple and sweet potato.",
        source: "Nutrition Fact Database"
    },
    {
        id: "pawpaw",
        name: "Pawpaw",
        color: "green",
        image: "/images/fruits/pawpaw.webp",
        teaser: "The Native American Custard",
        benefits: ["energy", "immunity", "digestion"],
        healthTags: ["Energy", "Immunity"],
        nutrients: ["Vitamin C", "Magnesium", "Potassium"],
        mainBenefits: [
            { title: "Protein Synthesis", description: "Higher protein profile than almost any other native fruit, aiding muscle repair." },
            { title: "Energy Synthesis", description: "Abundant magnesium orchestrates over 300 essential enzymatic energy reactions." },
            { title: "Immuno-Defense", description: "Antioxidants neutralize dangerous toxins in the bloodstream." }
        ],
        tips: "Scoop the creamy flesh out with a spoon; its flavor is a cross between banana, mango, and pineapple.",
        source: "Nutrition Fact Database"
    },
    {
        id: "sapodilla",
        name: "Sapodilla",
        color: "orange",
        image: "/images/fruits/sapodilla.webp",
        teaser: "The Brown Sugar Treat",
        benefits: ["energy", "digestion", "immunity"],
        healthTags: ["Energy", "Digestion"],
        nutrients: ["Tannins", "Vitamin C", "Copper"],
        mainBenefits: [
            { title: "Inflammation Reduction", description: "High tannin content acts as a powerful anti-inflammatory and antiviral agent." },
            { title: "Energy Invigoration", description: "A beautiful array of natural sugars immediately reverses physical exhaustion." },
            { title: "Bone Matrix", description: "Rich in copper which binds collagen into the skeletal system flawlessly." }
        ],
        tips: "Chilling it amplifies its unique malty, brown-sugar-like sweetness dramatically.",
        source: "Nutrition Fact Database"
    },
    {
        id: "soursop",
        name: "Soursop",
        color: "green",
        image: "/images/fruits/soursop.webp",
        teaser: "The Tropical Healer",
        benefits: ["immunity", "anti-inflammatory", "digestion"],
        healthTags: ["Immunity", "Antioxidants"],
        nutrients: ["Acetogenins", "Vitamin C", "Potassium"],
        mainBenefits: [
            { title: "Cellular Defense", description: "Contains potent acetogenins clinically shown to protect and defend cellular integrity." },
            { title: "Fever Reduction", description: "Traditionally revered for quickly lowering fevers and breaking acute illnesses." },
            { title: "Stomach Soother", description: "Its fibrous nature gently pulls toxins completely out of the intestinal tract." }
        ],
        tips: "Extract the juice or eat the creamy pulp, but strictly avoid consuming the toxic black seeds.",
        source: "Nutrition Fact Database"
    },
    {
        id: "walnuts",
        name: "Walnuts",
        color: "orange",
        image: "/images/fruits/walnuts.webp",
        teaser: "The Brain-Boosting Powerhouse",
        benefits: ["memory", "heart", "anti-inflammatory"],
        healthTags: ["Brain Health", "Heart Health"],
        nutrients: ["Omega-3", "Polyphenols", "Vitamin E"],
        mainBenefits: [
            { title: "Cognitive Dominance", description: "Omega-3 fatty acids actively build cell membranes in the brain, sharpening memory." },
            { title: "Arterial Defense", description: "Lowers hazardous LDL cholesterol seamlessly and stops plaque buildup." },
            { title: "Anti-Aging", description: "Extremely high in polyphenols, halting oxidative aging throughout the body." }
        ],
        tips: "Incredible as a botanical addition to any fresh fruit salad or morning smoothie bowl.",
        source: "Nutrition Fact Database"
    },
    {
        id: "yuzu",
        name: "Yuzu",
        color: "yellow",
        image: "/images/fruits/yuzu.webp",
        teaser: "The Aromatic Citrus Elixir",
        benefits: ["immunity", "skin", "digestion"],
        healthTags: ["Immunity", "Skin Health"],
        nutrients: ["Vitamin C", "Flavonoids", "Fiber"],
        mainBenefits: [
            { title: "Immune Activation", description: "Its incredible Vitamin C content jumpstarts white blood cell regeneration." },
            { title: "Skin Healing", description: "Actively promotes collagen formation, smoothing out fine lines effortlessly." },
            { title: "Mood Elevation", description: "The profound aromatic compounds are actively proven to lower systemic cortisol." }
        ],
        tips: "Grate the deeply fragrant peel into herbal teas or rich dressings for an unmatched citrus burst.",
        source: "Nutrition Fact Database"
    }
];

let content = fs.readFileSync('src/data/fruits.js', 'utf8');

const index = content.lastIndexOf('];');
if (index !== -1) {
    const jsonStr = JSON.stringify(newFruits, null, 4);
    // Extract inner content of the array string
    const innerJson = jsonStr.substring(jsonStr.indexOf('[') + 1, jsonStr.lastIndexOf(']')).trim();
    
    // Split the content at the last `];`
    const beforeEnd = content.substring(0, index).trimEnd();
    const tail = content.substring(index);
    
    // Reconstruct with comma
    const newContent = beforeEnd + ",\n" + innerJson + "\n" + tail;
    fs.writeFileSync('src/data/fruits.js', newContent, 'utf8');
    console.log("Successfully appended 15 new fruits.");
} else {
    console.log("Failed to find array end boundary in fruits.js");
}
