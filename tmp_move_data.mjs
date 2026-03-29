import fs from 'fs';

try {
    let sfContent = fs.readFileSync('src/data/superfoods.js', 'utf-8');
    const sfMatch = sfContent.match(/export const superfoods = (\[[\s\S]*?\]);\n/);
    if (!sfMatch) throw new Error("Could not match superfoods array");
    let superfoods = eval(sfMatch[1]);
    superfoods = superfoods.filter(s => s.id !== "amla" && s.id !== "acerola");
    sfContent = sfContent.replace(/export const superfoods = \[[\s\S]*?\];\n/, `export const superfoods = ${JSON.stringify(superfoods, null, 4)};\n`);
    fs.writeFileSync('src/data/superfoods.js', sfContent);

    let fContent = fs.readFileSync('src/data/fruits.js', 'utf-8');
    const fMatch = fContent.match(/export const fruits = (\[[\s\S]*?\]);\n/);
    if (!fMatch) throw new Error("Could not match fruits array");
    let fruits = eval(fMatch[1]);
    fruits.forEach(f => {
        if (f.id === "amla_fruit" || f.id === "amla") f.image = "/images/fruits/amla.png";
        if (f.id === "acerola_fruit" || f.id === "acerola") f.image = "/images/fruits/acerola.png";
    });
    fContent = fContent.replace(/export const fruits = \[[\s\S]*?\];\n/, `export const fruits = ${JSON.stringify(fruits, null, 4)};\n`);
    fs.writeFileSync('src/data/fruits.js', fContent);
    console.log("Success!");
} catch (e) {
    console.error(e);
    process.exit(1);
}
