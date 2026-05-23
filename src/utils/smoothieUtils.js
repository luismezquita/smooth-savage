import { smoothies } from '../data/smoothies';

/**
 * Detecta de forma segura si un ingrediente pertenece a algún smoothie.
 * Protegido contra datos no definidos o arrays vacíos.
 */
export const hasSmoothie = (ingredientName) => {
  if (!ingredientName || !smoothies || !Array.isArray(smoothies)) return false;
  
  const search = ingredientName.toLowerCase().trim();
  
  return smoothies.some(smoothie => 
    smoothie.ingredients && 
    Array.isArray(smoothie.ingredients) && 
    smoothie.ingredients.some(ing => {
      if (!ing) return false;
      const smoothieIng = ing.toLowerCase().trim();
      return smoothieIng.includes(search) || search.includes(smoothieIng);
    })
  );
};

export const findSmoothiesByIngredient = (ingredientName) => {
  if (!ingredientName || !smoothies || !Array.isArray(smoothies)) return [];

  const search = ingredientName.toLowerCase().trim();
  
  return smoothies.filter(smoothie => 
    smoothie.ingredients && 
    Array.isArray(smoothie.ingredients) && 
    smoothie.ingredients.some(ing => {
      if (!ing) return false;
      const smoothieIng = ing.toLowerCase().trim();
      return smoothieIng.includes(search) || search.includes(smoothieIng);
    })
  );
};