import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (itemKey, items) => {
  try {
    const jsonValue = JSON.stringify(items);
    return await AsyncStorage.setItem(itemKey, jsonValue);
  } catch (e) {
    alert(e);
  }
};
export const getData = async itemKey => {
  try {
    const jsonValue = await AsyncStorage.getItem(itemKey);
    return JSON.parse(jsonValue);
  } catch (e) {
    console.error(e);
  }
};
