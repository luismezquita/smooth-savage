import fs from 'fs';

try {
    let fContent = fs.readFileSync('src/data/fruits.js', 'utf-8');
    
    // Globally remove quotes from standard JavaScript object keys
    // This perfectly unifies the entire file, forcing Amla and Acerola 
    // to strictly match the 'apple' formatting without nested JSON styles.
    fContent = fContent.replace(/"([a-zA-Z0-9_]+)":/g, '$1:');
    
    fs.writeFileSync('src/data/fruits.js', fContent);
    console.log("Unified syntax in fruits.js");
} catch (e) {
    console.error(e);
    process.exit(1);
}
