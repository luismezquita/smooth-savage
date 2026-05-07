// Dynamic loader — imports the benefits JSON for the active language.
// Falls back to Spanish if the requested language file doesn't exist yet.
//
// Usage:
//   import { getMainBenefits } from '../i18n/mainBenefits_i18n';
//   const benefits = await getMainBenefits(language);   // language: 'es' | 'fr' | 'zh' | ...
//   const itemBenefits = benefits[itemId] ?? [];

const modules = import.meta.glob('./benefits_*.json', { import: 'default' });

export async function getMainBenefits(lang = 'es') {
  const key = `./benefits_${lang}.json`;
  const loader = modules[key] ?? modules['./benefits_es.json'];
  return loader ? loader() : {};
}
