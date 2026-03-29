import fs from 'fs';

const imageDir = 'public/images/fruits';
const images = fs.readdirSync(imageDir).filter(f => f !== '.DS_Store');

const fruitsJs = fs.readFileSync('src/data/fruits.js', 'utf8');

const missing = [];
images.forEach(img => {
  if (!fruitsJs.includes(img)) {
    missing.push(img);
  }
});

console.log('Missing images:', missing);
