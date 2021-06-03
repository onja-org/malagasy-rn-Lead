import AsyncStorage from '@react-native-community/async-storage';

export const SEEN_PHRASES_KEY = 'SEEN_PHRASES_KEY';
export const NEW_KEY_PHRASES = '@NewPhrases';

// store data in asyncstorage
export const storeData = async (itemKey, items) => {
  try {
    const jsonValue = JSON.stringify(items);
    return await AsyncStorage.setItem(itemKey, jsonValue);
  } catch (error) {
    return error;
  }
};

// read data from asyncstorage
export const getData = async itemKey => {
  try {
    const jsonValue = await AsyncStorage.getItem(itemKey);
    return JSON.parse(jsonValue);
  } catch (error) {
    return error;
  }
};
