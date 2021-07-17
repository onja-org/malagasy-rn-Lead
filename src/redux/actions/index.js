import {
  getData,
  storeData,
  NEW_KEY_PHRASES,
  SEEN_PHRASES_KEY,
} from '../../utils/storage';

import {
  SET_PHRASES,
  SET_CATEGORIES,
  SET_USER_PHRASES,
  SET_SEEN_PHRASES,
  SET_LANGUAGE_NAME,
  SET_LEARNT_PHRASES,
  LEARNT_KEY_PHRASES,
  SET_CURRENT_CATEGORY,
  SWITCH_LANGUAGES,
  SET_THEME_MODE,
  SWITCH_THEME_MODE,
} from '../constants';

import {getAllCategories} from '../../data/dataUtils';
export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    payload: categories,
  };
}

export function setCurrentCategory(categoryId) {
  return {
    type: SET_CURRENT_CATEGORY,
    payload: categoryId,
  };
}

export function setPhrases(phrases) {
  return {
    type: SET_PHRASES,
    payload: phrases,
  };
}

export function setLanguageName(language) {
  return {
    type: SET_LANGUAGE_NAME,
    payload: language,
  };
}

export function setSeenPhrases(phrases) {
  return {
    type: SET_SEEN_PHRASES,
    payload: phrases,
  };
}

export function setLearntPhrases(learntPhrases) {
  return {
    type: SET_LEARNT_PHRASES,
    payload: learntPhrases,
  };
}

export function setUserPhrases(phrases) {
  return {
    type: SET_USER_PHRASES,
    payload: phrases,
  };
}

export const switchLanguages = () => {
  return {
    type: SWITCH_LANGUAGES,
  };
};

export function setThemeMode(theme) {
  return {
    type: SET_THEME_MODE,
    payload: theme,
  };
}

export function switchThemeMode() {
  return {
    type: SWITCH_THEME_MODE,
  };
}

export function asyncGetAllCategories() {
  return async dispatch => {
    const categories = await getAllCategories();
    dispatch(setCategories(categories));
    return Promise.resolve();
  };
}

export function addSeenPhrases(phrase) {
  return async dispatch => {
    const storedPhrases = await getData(SEEN_PHRASES_KEY);
    const dataToStore = storedPhrases ? [...storedPhrases, phrase] : [phrase];
    await storeData(SEEN_PHRASES_KEY, dataToStore);
    dispatch(setSeenPhrases(dataToStore));
    return Promise.resolve();
  };
}

export function addLearntPhrase(phrase) {
  return async dispatch => {
    const storedPhrases = await getData(LEARNT_KEY_PHRASES);
    const dataToStore = storedPhrases ? [...storedPhrases, phrase] : [phrase];
    await storeData(LEARNT_KEY_PHRASES, dataToStore);
    dispatch(setLearntPhrases(dataToStore));
    return Promise.resolve();
  };
}

export function updateSeenPhrases(phrase) {
  return async dispatch => {
    const storedPhrases = await getData(SEEN_PHRASES_KEY);
    const filteredSeenPhrases =
      phrase && storedPhrases.filter(phr => phr.id !== phrase.id);
    await storeData(SEEN_PHRASES_KEY, filteredSeenPhrases);
    dispatch(setSeenPhrases(filteredSeenPhrases));
    return Promise.resolve();
  };
}

export function removeLearntPhrase(wrongPhrase) {
  return async dispatch => {
    const storedPhrases = await getData(LEARNT_KEY_PHRASES);
    const newLearntPhrases = storedPhrases.filter(
      phr => phr.id !== wrongPhrase.id,
    );
    await storeData(LEARNT_KEY_PHRASES, newLearntPhrases);
    dispatch(setLearntPhrases(newLearntPhrases));
    return Promise.resolve();
  };
}

export function addNewPhrases(phrase) {
  return async dispatch => {
    const storedPhrases = await getData(NEW_KEY_PHRASES);
    const dataToStore = storedPhrases ? [...storedPhrases, phrase] : [phrase];
    await storeData(NEW_KEY_PHRASES, dataToStore);
    dispatch(setUserPhrases(dataToStore));

    return Promise.resolve();
  };
}

export const syncStorageToRedux = () => {
  return async dispatch => {
    const storedLearntPhrases = await getData(LEARNT_KEY_PHRASES);
    if (storedLearntPhrases) {
      dispatch(setLearntPhrases(storedLearntPhrases));
    }

    const storedPhrases = await getData(NEW_KEY_PHRASES);
    if (storedPhrases) {
      dispatch(setUserPhrases(storedPhrases));
    }

    const storedSeenPhrases = await getData(SEEN_PHRASES_KEY);
    if (storedSeenPhrases) {
      dispatch(setSeenPhrases(storedSeenPhrases));
    }

    return Promise.resolve();
  };
};
