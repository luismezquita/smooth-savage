import fs from 'fs';

// 1. Fix fruits.js
let fruitsStr = fs.readFileSync('src/data/fruits.js', 'utf8');
// This is a quick regex to wipe out the source lines (since they're static properties)
fruitsStr = fruitsStr.replace(/,\s*source:\s*"[^"]+"/g, '');
fruitsStr = fruitsStr.replace(/,\s*"source":\s*"[^"]+"/g, '');

// Also ensure Langsat image is correctly named. Let's see if there's .webp or .jpg in the actual string
fruitsStr = fruitsStr.replace(/\/images\/fruits\/langsat\.webp/g, '/images/fruits/langsat.jpg'); // or .png, whatever the user said we assume .jpg

fs.writeFileSync('src/data/fruits.js', fruitsStr, 'utf8');

// 2. Fix superfoods.js and add Cacao Powder
let superStr = fs.readFileSync('src/data/superfoods.js', 'utf8');
superStr = superStr.replace(/,\s*"source":\s*"[^"]+"/g, '');

// Does Cacao exist?
if (!superStr.includes('cacao_powder')) {
    const cacaoObj = `    },
    {
        "id": "cacao_powder",
        "name": "Cacao Powder",
        "color": "amber",
        "image": "/images/superfoods/cacao.jpg",
        "teaser": "The Raw Chocolate Mood Booster",
        "benefits": [
            "energy",
            "heart",
            "anti-inflammatory"
        ],
        "nutrients": [
            "Magnesium",
            "Theobromine",
            "Iron",
            "Flavonoids"
        ],
        "mainBenefits": [
            {
                "title": "Heart Protector",
                "description": "Rich in flavonoids that massively improve blood flow and lower resting blood pressure."
            },
            {
                "title": "Natural Mood Elevator",
                "description": "Contains profound mood-boosting compounds like anandamide, the 'bliss molecule'."
            },
            {
                "title": "Deep Sustained Energy",
                "description": "Packed with theobromine which provides gentle, long-lasting energy without caffeine jitters."
            }
        ],
        "tips": "Perfect mixed into warm almond milk or heavily blended with frozen bananas.",
        "type": "superfood",
        "status": "active"
    }
];`;
    // Find last `    }\n];` and replace
    const lastBracket = superStr.lastIndexOf('    }\n];');
    if (lastBracket !== -1) {
        superStr = superStr.substring(0, lastBracket) + cacaoObj;
    }
}

fs.writeFileSync('src/data/superfoods.js', superStr, 'utf8');

console.log('Fixed fruits.js and superfoods.js');
