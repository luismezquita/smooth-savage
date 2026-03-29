import fs from 'fs';

const SMOOTHIES_FILE = 'src/data/smoothies.js';
let content = fs.readFileSync(SMOOTHIES_FILE, 'utf-8');

// Extract the array using regex
const arrayMatch = content.match(/export const smoothies = (\[[\s\S]*\]);/);
if (!arrayMatch) {
    console.error("Could not parse smoothies array");
    process.exit(1);
}

const smoothies = eval(arrayMatch[1]);

const images = [
    { name: "Ultimate Immunity Hero", file: "ultimate_immunity hero.webp", tags: ["Immunity Boost", "Vitamin C"] },
    { name: "Vitamin C Nuclear Bomb", file: "vitaminc_nuclear_bomb.webp", tags: ["Immunity Boost", "Vitamin C"] },
    { name: "Adaptogen Calm Hero", file: "adaptogen_calm_hero.webp", tags: ["Stress Relief", "Calm"] },
    { name: "Brain & Focus Hero", file: "brain_&_focus_hero.webp", tags: ["Brain Health", "Focus"] },
    { name: "Energy & Stamina Hero", file: "energy_stamina_hero.webp", tags: ["Energy & Vitality", "Stamina"] },
    { name: "Gut Healing Hero", file: "gut_healing_hero.webp", tags: ["Digestion", "Gut Health"] },
    { name: "Anti-Inflammatory Hero", file: "anti_inflammatory_hero.webp", tags: ["Anti-Inflammatory", "Joints"] },
    { name: "Beauty & Glow Hero", file: "beauty_and_glow_hero.webp", tags: ["Skin Glow", "Anti-Aging"] },
    { name: "Deep Sleep & Recovery Hero", file: "deep_sleep_and _recovery_hero.webp", tags: ["Sleep", "Recovery"] },
    { name: "Antioxidant God Mode", file: "anti_oxidant_god_mode.webp", tags: ["Antioxidants", "Detox", "Heart Health"] }
];

function findBestImage(smoothie) {
    // 1. Exact match
    const exactMatch = images.find(img => img.name === smoothie.name);
    if (exactMatch) return `/images/smoothies/${exactMatch.file}`;

    // 2. Category match
    const categoryMatch = images.find(img => img.tags.some(tag => tag.toLowerCase().includes(smoothie.category.toLowerCase()) || smoothie.category.toLowerCase().includes(tag.toLowerCase())));
    if (categoryMatch) return `/images/smoothies/${categoryMatch.file}`;

    // 3. Health tags match
    for (let tag of smoothie.healthTags) {
        const tagMatch = images.find(img => img.tags.some(it => it.toLowerCase().includes(tag.toLowerCase())));
        if (tagMatch) return `/images/smoothies/${tagMatch.file}`;
    }

    // 4. Fallback to antioxidant god mode or energy
    return `/images/smoothies/anti_oxidant_god_mode.webp`;
}

smoothies.forEach(s => {
    s.image = findBestImage(s);
});

const newArrayStr = JSON.stringify(smoothies, null, 4);
content = content.replace(/export const smoothies = \[[\s\S]*\];/, `export const smoothies = ${newArrayStr};`);

fs.writeFileSync(SMOOTHIES_FILE, content);
console.log("Successfully mapped all 35 smoothies to the 10 available premium images.");
