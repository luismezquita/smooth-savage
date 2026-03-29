import fs from 'fs';

const targetSmoothies = {
    "Elderberry Shield": { category: "Immunity", img: "elderberry-shield.webp" },
    "Tropical Immunity": { category: "Immunity", img: "tropical-immunity.webp" },
    "Berry Immune": { category: "Immunity", img: "berry-immune.webp" },
    "Star Defense": { category: "Immunity", img: "star-defense.webp" },
    "Soursop Guardian": { category: "Immunity", img: "soursop-guardian.webp" },
    "Lucuma Power": { category: "Functional Smoothies", img: "lucuma-power.webp" },
    "Green Matcha Surge": { category: "Functional Smoothies", img: "green-matcha-surge.webp" },
    "Tropical Stamina": { category: "Functional Smoothies", img: "tropical-stamina.webp" },
    "Jackfruit Fuel": { category: "Functional Smoothies", img: "jackfruit-fuel.webp" },
    "Papaya Digestive": { category: "Functional Smoothies", img: "papaya-digestive.webp" },
    "Kiwi Cleanse": { category: "Functional Smoothies", img: "kiwi-cleanse.webp" },
    "Prickly Gut Reset": { category: "Functional Smoothies", img: "prickly-gut-reset.webp" }
};

try {
    let content = fs.readFileSync('src/data/smoothies.js', 'utf-8');
    const match = content.match(/export const smoothies = (\[[\s\S]*\]);\s*$/);
    if (!match) throw new Error("Could not parse array");
    
    let smoothiesArr = eval(match[1]);

    smoothiesArr.forEach(sm => {
        if (targetSmoothies[sm.name]) {
            sm.image = `/images/smoothies/${targetSmoothies[sm.name].img}`;
            sm.category = targetSmoothies[sm.name].category;
            sm.id = sm.name.toLowerCase().replace(/\s+/g, '-');
        }
    });

    fs.writeFileSync('src/data/smoothies.js', `export const smoothies = ${JSON.stringify(smoothiesArr, null, 4)};\n`);
    console.log("Updated smoothies data dependencies successfully.");
} catch (e) {
    console.error(e);
    process.exit(1);
}
