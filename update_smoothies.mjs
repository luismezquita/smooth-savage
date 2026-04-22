import fs from 'fs';
import { fileURLToPath } from 'url';

const file = fs.readFileSync('src/data/smoothies.js', 'utf8');

// I will just use regex to extract names, and see their ingredients.
const smoothies = [];
const regex = /"name":\s*"([^"]+)",[\s\S]*?"ingredients":\s*\[(.*?)\]/g;
let match;
while ((match = regex.exec(file)) !== null) {
  smoothies.push({name: match[1], ingredients: match[2].trim()});
}

const targets = [
  "The Empress Glow", "Omega-7 Radiance", "White Pearl Zen", "Tremella Dew", "Saffron Sun",
  "The Great Wall", "Black Seed Cure", "Golden Shield", "Camu-Camu Titan", "Antiviral Star",
  "Anti Viral Star", "Himalayan Resin", "Viking Focus", "Androgenic Peak", "The Five-Flavor Runner",
  "Mesozoic Fiber", "Shatavari Shakti", "Electric Violet", "Telomere Tonic", "Shatavari Bloom",
  "Goji Zen", "Deep Sea Mineral", "The Fluid Flush", "Heavy Metal Cleanse", "Digestive Star", "Alkaline King",
  "Camu Camu Titan"
];

const found = smoothies.filter(s => targets.includes(s.name) || targets.includes(s.name.replace(/-/g, ' ')));
console.log(JSON.stringify(found, null, 2));

