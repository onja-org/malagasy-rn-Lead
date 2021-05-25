import AsyncStorage from '@react-native-community/async-storage';

// store data in asyncstorage
export const storeData = async (itemKey, items) => {
  try {
    const jsonValue = JSON.stringify(items);
    return await AsyncStorage.setItem(itemKey, jsonValue);
  } catch (error) {
    return error;
  }
};

// get data from asyncstorage
export const getData = async itemKey => {
  try {
    const jsonValue = await AsyncStorage.getItem(itemKey);
    return JSON.parse(jsonValue);
  } catch (error) {
    return error;
  }
};
