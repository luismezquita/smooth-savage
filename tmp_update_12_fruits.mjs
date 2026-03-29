import fs from 'fs';

let content = fs.readFileSync('src/data/fruits.js', 'utf-8');

const replacements = [
    { id: "acerola_fruit", img: "acerola.webp" },
    { id: "amla_fruit", img: "amla.webp" },
    { id: "apricot", img: "apricot.webp" },
    { id: "bilberry", img: "bilberry.webp" },
    { id: "cranberry", img: "cranberry.webp" },
    { id: "kumquat", img: "kumquat.webp" },
    { id: "lime", img: "lime.webp" },
    { id: "loquat", img: "loquat.webp" },
    { id: "mangosteen", img: "mangosteen.webp" },
    { id: "mulberry", img: "mulberry.webp" },
    { id: "nectarine", img: "nectarine.webp" },
    { id: "ugly_fruit", img: "ugli_fruit.webp" }
];

replacements.forEach(r => {
    const regex = new RegExp(`(id:\\s*"${r.id}"[\\s\\S]*?image:\\s*)"[^"]+"`, 'g');
    content = content.replace(regex, `$1"/images/fruits/${r.img}"`);
});

fs.writeFileSync('src/data/fruits.js', content);
console.log("Updated cleanly via string replacement.");
