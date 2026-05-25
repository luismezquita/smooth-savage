import { fruits } from '../data/fruits';
import { savageFoods } from '../data/superfoods';
import { smoothies } from '../data/smoothies';
import { benefitCategories } from '../data/benefits';

export const FREE_SMOOTHIES_COUNT = 8;
export const FREE_FRESH_COUNT = 16;
export const FREE_SAVAGE_COUNT = 7;
export const FREE_BENEFITS_COUNT = 2;

const indexById = (items) => new Map(items.map((item, index) => [item.id, index]));

const fruitIndex = indexById([...fruits].sort((a, b) => a.name.localeCompare(b.name)));
const savageIndex = indexById(savageFoods);
const smoothieIndex = indexById(smoothies);
const benefitIndex = indexById(benefitCategories);

export const getFruitIndex = (id) => fruitIndex.get(id) ?? -1;
export const getSavageIndex = (id) => savageIndex.get(id) ?? -1;
export const getSmoothieIndex = (id) => smoothieIndex.get(id) ?? -1;
export const getBenefitIndex = (id) => benefitIndex.get(id) ?? -1;

export const isFruitPremium = (id) => getFruitIndex(id) >= FREE_FRESH_COUNT;
export const isSavagePremium = (id) => getSavageIndex(id) >= FREE_SAVAGE_COUNT;
export const isSmoothiePremium = (id) => getSmoothieIndex(id) >= FREE_SMOOTHIES_COUNT;
export const isBenefitPremium = (id) => getBenefitIndex(id) >= FREE_BENEFITS_COUNT;
