import React from 'react';
import ActionButton from '../ActionButton/ActionButton';
import {
  getStyle,
  LIST_TEXT_STYLE,
  SEPARATOR_LIST_ITEM,
} from '../../ThemeMode/ThemeMode';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {
  CORRECT_BUTTON,
  WRONG_BUTTON,
  LANGUAGE_DATA,
} from '../../translations/index';

export const Separator = ({themeMode}) => (
  <View style={getStyle(SEPARATOR_LIST_ITEM, themeMode)} />
);
const RenderDataItem = ({
  item,
  index,
  lang,
  text,
  color,
  iconName,
  iconType,
  themeMode,
  makeAction,
  randomPhraseId,
  disableAllOptions,
}) => {
  const showAnswerMode = disableAllOptions === true;
  const isCorrectAnswer = item.id === randomPhraseId;
  const isSelected = Boolean(item?.isSelected);
  const showAsCorrect = showAnswerMode && isCorrectAnswer;
  const shouldReveal = isSelected || showAsCorrect;
  const shouldDisplayAnswer = showAnswerMode && shouldReveal;

  const correctButtonText = LANGUAGE_DATA[CORRECT_BUTTON][lang];
  const wrongButtonText = LANGUAGE_DATA[WRONG_BUTTON][lang];

  const textToDisplay = !shouldDisplayAnswer
    ? text
    : showAsCorrect
    ? correctButtonText
    : wrongButtonText;

  const colorToDisplay = !shouldDisplayAnswer
    ? color
    : showAsCorrect
    ? '#06D440'
    : '#D4068E';

  const iconTypeToDisplay = !shouldDisplayAnswer
    ? iconType
    : showAsCorrect
    ? 'octicon'
    : '';

  const IconNameToDisplay = !shouldDisplayAnswer
    ? iconName
    : showAsCorrect
    ? 'check'
    : 'close';

  return (
    <TouchableOpacity
      disabled={disableAllOptions && disableAllOptions}
      style={styles.item}
      onPress={() => makeAction(item, index)}>
      <View>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={getStyle(LIST_TEXT_STYLE, themeMode)}>
          {lang ? item?.name?.[lang] : item.name}
        </Text>
      </View>
      <ActionButton
        text={textToDisplay}
        color={colorToDisplay}
        iconType={iconTypeToDisplay}
        iconName={IconNameToDisplay}
      />
    </TouchableOpacity>
  );
};

export default function ListItem({
  makeAction,
  lang,
  data,
  text,
  color,
  iconName,
  iconType,
  themeMode,
  randomPhraseId,
  disableAllOptions,
}) {
  return (
    <SafeAreaView>
      <SectionList
        sections={[{data: data}]}
        renderItem={({item, index}) => (
          <RenderDataItem
            item={item}
            lang={lang}
            text={text}
            color={color}
            index={index}
            iconName={iconName}
            iconType={iconType}
            themeMode={themeMode}
            makeAction={makeAction}
            randomPhraseId={randomPhraseId}
            disableAllOptions={disableAllOptions}
          />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Separator themeMode={themeMode} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlignVertical: 'center',
    paddingLeft: 16,
    paddingRight: 20,
    paddingVertical: 17,
  },
});
