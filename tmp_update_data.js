const fs = require('fs');
const path = require('path');

const superfoodsPath = path.join(__dirname, 'src/data/superfoods.js');
let superfoodsContent = fs.readFileSync(superfoodsPath, 'utf8');

const fruitsPath = path.join(__dirname, 'src/data/fruits.js');
let fruitsContent = fs.readFileSync(fruitsPath, 'utf8');

// The exported arrays are plain text in JS files (export const ... = [...]).
// We can use regex to extract and remove ginger and turmeric from superfoods.
// But it's easier to just use string manipulation or eval (since it's a JS array).
// Let's use simple match for ginger and turmeric.

// We will find the objects by their ID.
// Wait, doing this with regex or string replacement is tricky for nested bracing.
// Since it's a valid JS export, we can evaluate it.

const extractAndUpdate = () => {
    // Read the files, strip exports, eval to get objects
    let sArrayStr = superfoodsContent.replace('export const superfoods = ', '').replace(/;\s*$/, '');
    let sArray = eval(sArrayStr);
    
    let fArrayStr = fruitsContent.replace('export const fruits = ', '').replace(/;\s*$/, '');
    let fArray = eval(fArrayStr);
    
    const idsToMove = ['ginger', 'turmeric'];
    const itemsToMove = sArray.filter(item => idsToMove.includes(item.id));
    
    // Update their images
    itemsToMove.forEach(item => {
        item.image = item.image.replace('/images/superfoods/', '/images/fresh/');
        // remove "type": "superfood"
        delete item.type;
        delete item.status;
    });
    
    // Remove from superfoods
    const newSuperfoods = sArray.filter(item => !idsToMove.includes(item.id));
    
    // Add to fruits and update all images to fresh
    fArray.forEach(item => {
        if(item.image.includes('/images/fruits/')) {
            item.image = item.image.replace('/images/fruits/', '/images/fresh/');
        }
    });
    // Add relocated ones
    const newFruits = [...fArray, ...itemsToMove];
    
    // Write back
    fs.writeFileSync(superfoodsPath, 'export const superfoods = ' + JSON.stringify(newSuperfoods, null, 4) + ';\n');
    fs.writeFileSync(fruitsPath, 'export const fruits = ' + JSON.stringify(newFruits, null, 4) + ';\n');
    
    // Now update Home.jsx and Search.jsx
    const homePath = path.join(__dirname, 'src/pages/Home.jsx');
    let homeCode = fs.readFileSync(homePath, 'utf8');
    homeCode = homeCode.replace(/category=fruits/g, 'category=fresh');
    homeCode = homeCode.replace(/View All Fruits/g, 'View All Fresh');
    fs.writeFileSync(homePath, homeCode);
    
    const searchPath = path.join(__dirname, 'src/pages/Search.jsx');
    let searchCode = fs.readFileSync(searchPath, 'utf8');
    searchCode = searchCode.replace(/=== 'fruits'/g, "=== 'fresh'");
    searchCode = searchCode.replace(/>Fruits<\/h2>/g, '>Fresh</h2>');
    fs.writeFileSync(searchPath, searchCode);
    
    console.log("Successfully updated all references and data.");
};

extractAndUpdate();
