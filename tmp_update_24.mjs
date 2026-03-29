import fs from 'fs';

const newImages = [
    "tropical_immunity.webp",
    "berry_immune.webp",
    "star_defense.webp",
    "soursop_guardian.webp",
    "lucuma_power.webp",
    "green_matcha_surge.webp",
    "tropical_stamina.webp",
    "jackfruit_fuel.webp",
    "papaya_digestive.webp",
    "kiwi_cleanse.webp",
    "prickly_gut_reset.webp",
    "apple_ginger_soothe.webp",
    "ashwagandha_calm.webp",
    "tropical_calm.webp",
    "cherry_reishi_dream.webp",
    "golden_anti_inflammatory.webp",
    "cherry_beet_recovery.webp",
    "mangosteen_relief.webp",
    "acai_beauty_bowl.webp",
    "sea_buckthorn_glow.webp",
    "maqui_radiance.webp",
    "heart_protector.webp",
    "beet_berry_heart.webp",
    "deep_detox.webp"
];

try {
    let content = fs.readFileSync('src/data/smoothies.js', 'utf-8');
    const match = content.match(/export const smoothies = (\[[\s\S]*\]);\s*$/);
    if (!match) throw new Error("Could not parse array");
    
    let smoothiesArr = eval(match[1]);

    // Create a normalized mapping to easily find target smoothies
    // E.g. "tropical_immunity" -> "tropicalimmunity"
    const imageMap = {};
    newImages.forEach(img => {
        const baseName = img.replace('.webp', '');
        const normalized = baseName.replace(/_/g, '').toLowerCase();
        imageMap[normalized] = img;
    });

    let updatedCount = 0;

    smoothiesArr.forEach(sm => {
        const normalizedName = sm.name.replace(/[-\s_]/g, '').toLowerCase();
        
        if (imageMap[normalizedName]) {
            sm.image = `/images/smoothies/${imageMap[normalizedName]}`;
            updatedCount++;
        }
    });

    fs.writeFileSync('src/data/smoothies.js', `export const smoothies = ${JSON.stringify(smoothiesArr, null, 4)};\n`);
    console.log(`Successfully updated ${updatedCount} smoothie images.`);
} catch (e) {
    console.error(e);
    process.exit(1);
}
