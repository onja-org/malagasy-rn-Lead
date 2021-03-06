const phrasesData = require('./phrases.json');
const categoriesData = require('./categories.json');
export const LANGUAGE_NAMES = {
  MG: 'mg',
  EN: 'en',
};

export const getAllCategories = async () => {
  return Promise.resolve(categoriesData.categories);
};

export const getPhrasesForCategoryId = catId => {
  const phrasesIds = getPhraseIdsForCategory(catId);
  const allPhrases = getAllPhrases();
  const selectedPhrases = allPhrases.filter(phrase =>
    phrasesIds.includes(phrase.id),
  );
  return selectedPhrases;
};

///// helper functions - do not use directly from the app
export const getAllCategoriesNames = lang => {
  return categoriesData.categories.map(cat => cat.name[lang]);
};

export const getAllCategoriesIds = () => {
  return categoriesData.categories.map(cat => cat.id);
};

export const getPhraseIdsForCategory = catId => {
  const category = categoriesData.categories.find(cat => cat.id === catId);
  return (category && category.phrasesIds) || null;
};

export const getAllPhrases = () => {
  return phrasesData.phrases;
};

export const findPhraseCategories = () => {
  return phrasesData.phrases;
};

export function findCategoryById() {
  throw 'not implemented!';
  // TODO implement
}
