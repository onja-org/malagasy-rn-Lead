import {combineReducers} from 'redux';
// import all of constant case names for the swich
// in reducers
import {
  SET_PHRASES,
  SET_CATEGORIES,
  SET_USER_PHRASES,
  SET_SEEN_PHRASES,
  SET_LANGUAGE_NAME,
  SET_LEARNT_PHRASES,
  SET_CURRENT_CATEGORY,
  SWITCH_LANGUAGES,
  SET_THEME_MODE,
  SWITCH_THEME_MODE,
} from '../constants';

import {LANGUAGE_NAMES} from '../../data/dataUtils';

import {LIGHT_MODE, DARK_MODE} from '../../ThemeMode/ThemeMode';

// categories reducer
function categories(state = [], action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
}

// categories reducer
function currentCategoryId(state = '', action) {
  switch (action.type) {
    case SET_CURRENT_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}

// phrases reducer
function categoryPhrases(state = [], action) {
  switch (action.type) {
    case SET_PHRASES:
      return action.payload;
    default:
      return state;
  }
}

function nativeLanguage(state = '', action) {
  switch (action.type) {
    case SET_LANGUAGE_NAME:
      return action.payload;
    case SWITCH_LANGUAGES:
      return state === LANGUAGE_NAMES.EN
        ? LANGUAGE_NAMES.MG
        : LANGUAGE_NAMES.EN;
    default:
      return state;
  }
}

//set seen phrases
function seenPhrases(state = [], action) {
  switch (action.type) {
    case SET_SEEN_PHRASES:
      return action.payload;
    default:
      return state;
  }
}

// userPhrases reducer
function userPhrases(state = [], action) {
  switch (action.type) {
    case SET_USER_PHRASES:
      return action.payload;
    default:
      return state;
  }
}

function learntPhrases(state = [], action) {
  switch (action.type) {
    case SET_LEARNT_PHRASES:
      return action.payload;
    default:
      return state;
  }
}

const initialState = {
  theme: LIGHT_MODE,
};

function themeMode(state = initialState, action) {
  switch (action.type) {
    case SET_THEME_MODE:
      return action.payload;
    case SWITCH_THEME_MODE:
      return state === LIGHT_MODE ? DARK_MODE : LIGHT_MODE;
    default:
      return state;
  }
}

// combine all of the reducers together
export default combineReducers({
  themeMode,
  categories,
  userPhrases,
  seenPhrases,
  learntPhrases,
  nativeLanguage,
  categoryPhrases,
  currentCategoryId,
});
