import React from 'react';
import ListItem from '../ListItem/ListItem';
import {View, SafeAreaView} from 'react-native';
import {getStyle, LIST_CONTAINER_STYLE} from '../../ThemeMode/ThemeMode';

export default function List({
  data,
  text,
  lang,
  color,
  iconName,
  iconType,
  themeMode,
  makeAction,
  randomPhraseId,
  disableAllOptions,
}) {
  return (
    <SafeAreaView>
      <View style={getStyle(LIST_CONTAINER_STYLE, themeMode)}>
        <ListItem
          lang={lang}
          data={data}
          text={text}
          color={color}
          iconType={iconType}
          iconName={iconName}
          makeAction={makeAction}
          randomPhraseId={randomPhraseId}
          disableAllOptions={disableAllOptions}
          themeMode={themeMode}
        />
      </View>
    </SafeAreaView>
  );
}
