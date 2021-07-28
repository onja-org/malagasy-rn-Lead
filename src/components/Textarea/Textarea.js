// components/Task.js
import * as React from 'react';
import {SafeAreaView, TextInput} from 'react-native';
import {
  getStyle,
  textAreaPlaceholderColor,
  TEXTAREA_TEXT,
  TEXTAREA_CONTAINER,
  TEXTAREA_IN_INPUT_FORM,
} from '../../ThemeMode/ThemeMode';

export default function Textarea({
  phrase,
  themeMode,
  editable,
  onChange = () => null,
  placeholder,
}) {
  return (
    <SafeAreaView style={getStyle(TEXTAREA_CONTAINER, themeMode)}>
      <TextInput
        style={
          editable
            ? getStyle(TEXTAREA_IN_INPUT_FORM, themeMode)
            : getStyle(TEXTAREA_TEXT, themeMode)
        }
        value={phrase}
        editable={editable}
        onChangeText={onChange}
        multiline={true}
        placeholder={placeholder}
        placeholderTextColor={textAreaPlaceholderColor(themeMode)}
      />
    </SafeAreaView>
  );
}
