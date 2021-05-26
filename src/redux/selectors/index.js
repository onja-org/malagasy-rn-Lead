import {createSelector} from 'reselect';
export const userPhrases = state => state.userPhrases;
export const seenPhrases = state => state.seenPhrases;
export const randomPhrase = state => state.randomPhrase;
export const categoriesRoot = state => state.categories;
export const learntPhrases = state => state.learntPhrases;
export const nativeLanguageRoot = state => state.nativeLanguage;
export const categoryPhrasesRoot = state => state.categoryPhrases;
export const currentCategoryIdRoot = state => state.currentCategoryId;

export const currentCategory = createSelector(
  [currentCategoryIdRoot, categoriesRoot],
  (selectedCategoryId, allCategories) => {
    const selectedCategory = allCategories.find(
      cat => cat.id === selectedCategoryId,
    );
    return selectedCategory;
  },
);
export const currentCategoryPhrasesIds = createSelector(
  [currentCategory],
  selectedCategory => {
    return selectedCategory.phrasesIds;
  },
);

export const currentCategoryName = createSelector(
  [currentCategory, nativeLanguageRoot],
  (selectedCategory, language) => {
    const name = selectedCategory?.name?.[language];
    return name;
  },
);
