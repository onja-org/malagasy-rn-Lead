import {StyleSheet} from 'react-native';

export const getStyle = (stylekey, theme) => {
  const styles = StyleSheet.create({
    [CONTAINER_STYLE]: {
      height: '100%',
      paddingVertical: 23,
      paddingHorizontal: 35,
      backgroundColor: theme === LIGHT_MODE ? '#E5E5E5' : '#1F232C',
    },
    [SELECT_CATEGORY_HEADING]: {
      fontSize: 18,
      lineHeight: 22,
      fontWeight: '600',
      fontFamily: 'Inter',
      fontStyle: 'normal',
      color: theme === LIGHT_MODE ? '#111827' : '#fff',
    },
    [LIST_CONTAINER_STYLE]: {
      borderWidth: 1,
      maxHeight: 367,
      marginBottom: 15,
      borderColor: theme === LIGHT_MODE ? '#E5E5E5' : '#111827',
      backgroundColor: theme === LIGHT_MODE ? '#FFFFFF' : '#111827',
    },
    [LIST_TEXT_STYLE]: {
      color: theme === LIGHT_MODE ? '#111827' : '#FFFFFF',
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 16,
      lineHeight: 19,
      maxWidth: 320,
    },
    [SEPARATOR_LIST_ITEM]: {
      flex: 1,
      height: 1,
      backgroundColor: theme === LIGHT_MODE ? '#E5E5E5' : '#1F232C',
    },
    [TEXTAREA_CONTAINER]: {
      height: 100,
      borderWidth: 1,
      marginVertical: 0,
      alignItems: 'center',
      borderStyle: 'solid',
      marginHorizontal: 'auto',
      justifyContent: 'center',
      borderColor: theme === LIGHT_MODE ? '#E5E5E5' : '#1F232C',
      backgroundColor: theme === LIGHT_MODE ? '#fff' : '#111827',
    },
    [TEXTAREA_IN_INPUT_FORM]: {
      lineHeight: 24.3,
      color: theme === LIGHT_MODE ? '#111827' : '#fff',
    },
    [TEXTAREA_TEXT]: {
      maxWidth: 360,
      fontSize: 20,
      lineHeight: 24.3,
      marginHorizontal: 'auto',
      color: theme === LIGHT_MODE ? '#111827' : '#fff',
    },
  });
  return styles[stylekey];
};

export const getFillColor = theme =>
  theme === LIGHT_MODE ? '#FFFF' : '#111827';
export const textAreaPlaceholderColor = theme =>
  theme === LIGHT_MODE ? 'rgba(17, 24, 39, 0.5)' : '#fff';

export const DARK_MODE = 'dark';
export const LIGHT_MODE = 'light';
export const TEXTAREA_TEXT = 'text_area_text';
export const LIST_TEXT_STYLE = 'list_text_style';
export const CONTAINER_STYLE = 'container_style';
export const TEXTAREA_CONTAINER = 'text_area_container';
export const SEPARATOR_LIST_ITEM = 'separator_list_item';
export const LIST_CONTAINER_STYLE = 'list_container_style';
export const TEXTAREA_IN_INPUT_FORM = 'text_area_in_input_form';
export const SELECT_CATEGORY_HEADING = 'select_category_heading';
