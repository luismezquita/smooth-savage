// Smoothie content translations — 6 languages × 89 smoothies
// Fields: name, title, teaser, description, benefits, steps, ingredients

import es from './smoothies_es.json';
import fr from './smoothies_fr.json';
import zh from './smoothies_zh.json';
import ja from './smoothies_ja.json';
import ko from './smoothies_ko.json';
import ar from './smoothies_ar.json';

// Index by language → smoothie id → fields
function index(arr) {
    return arr.reduce((acc, s) => { acc[s.id] = s; return acc; }, {});
}

const smoothiesTranslations = {
    es: index(es),
    fr: index(fr),
    zh: index(zh),
    ja: index(ja),
    ko: index(ko),
    ar: index(ar),
};

export default smoothiesTranslations;
