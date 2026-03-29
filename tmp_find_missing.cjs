const fs = require('fs');
const path = require('path');

const imagesDir = './public/images/fruits';
const dataFile = './src/data/fruits.js';

const allImages = fs.readdirSync(imagesDir).filter(f => f.match(/\.(webp|jpg|png|jpeg)$/));
const fileContent = fs.readFileSync(dataFile, 'utf-8');

const missing = allImages.filter(img => !fileContent.includes(img));
console.log(JSON.stringify(missing, null, 2));
