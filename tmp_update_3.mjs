import fs from 'fs';

const targetSmoothies = {
    "Ashwagandha Calm": { category: "Functional Smoothies", img: "ashwagandha-calm.webp" },
    "Tropical Calm": { category: "Functional Smoothies", img: "tropical-calm.webp" },
    "Cherry Reishi Dream": { category: "Functional Smoothies", img: "cherry-reishi-dream.webp" }
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
