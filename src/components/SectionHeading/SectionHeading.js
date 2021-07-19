import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {getStyle, SELECT_CATEGORY_HEADING} from '../../ThemeMode/ThemeMode';

export default function SectionHeading({text, themeMode}) {
  return (
    <SafeAreaView>
      <Text h2 style={getStyle(SELECT_CATEGORY_HEADING, themeMode)}>
        {text}
      </Text>
    </SafeAreaView>
  );
}
