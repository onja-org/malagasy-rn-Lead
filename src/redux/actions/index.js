// // import all of the constants from contants folder
import {getData, storeData} from '../../utils/storage';
import {
  SET_CATEGORIES,
  SET_PHRASES,
  SET_LANGUAGE_NAME,
  SET_CURRENT_CATEGORY,
  SET_USER_PHRASES,
  NEW_KEY_PHRASES,
  SET_SEEN_PHRASES,
  SEEN_PHRASES_KEY,
} from '../constants';

// categories actions
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

// phrases action
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

export function setUserPhrases(phrases) {
  return {
    type: SET_USER_PHRASES,
    payload: phrases,
  };
}

export function setSeenPhrases(phrases) {
  return {
    type: SET_SEEN_PHRASES,
    payload: phrases,
  };
}

// add seen phrases

export function addSeenPhrases(phrase) {
  return async dispatch => {
    const storedPhrases = await getData(SEEN_PHRASES_KEY);
    const dataToStore = storedPhrases ? [...storedPhrases, phrase] : [phrase];
    await storeData(SEEN_PHRASES_KEY, dataToStore);
    dispatch(setSeenPhrases(dataToStore));
    return Promise.resolve();
  };
}

// update seen phrases
export function updateSeenPhrases(phrase) {
  return async dispatch => {
    const storedPhrases = await getData(SEEN_PHRASES_KEY);
    const filteredSeenPhrases =
      phrase && storedPhrases.filter(phr => phr.id !== phrase.id);
    await storeData(SEEN_PHRASES_KEY, filteredSeenPhrases);
    dispatch(setSeenPhrases(filteredSeenPhrases));
    return null;
  };
}
// add new phrases
export function addNewPhrases(phrase) {
  return async dispatch => {
    const storedPhrases = await getData(NEW_KEY_PHRASES);
    const dataToStore = storedPhrases ? [...storedPhrases, phrase] : [phrase];
    await storeData(NEW_KEY_PHRASES, dataToStore);
    dispatch(setUserPhrases(dataToStore));

    return Promise.resolve();
  };
}

// get data from asyncstorage

export const syncStorageToRedux = () => {
  return async dispatch => {
    const storedPhrases = await getData(NEW_KEY_PHRASES);
    if (storedPhrases) {
      dispatch(setUserPhrases(storedPhrases));
    }
    const storedSeenPhrases = await getData(SEEN_PHRASES_KEY);
    if (setSeenPhrases) {
      dispatch(setSeenPhrases(storedSeenPhrases));
    }
    return Promise.resolve();
  };
};
