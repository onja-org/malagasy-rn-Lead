import {shuffleArray} from '../utils/index';
import List from '../components/List/List';
import {LANGUAGE_NAMES} from '../data/dataUtils';
import ToolBar from '../components/ToolBar/ToolBar';
import Textarea from '../components/Textarea/Textarea';
import NextButton from '../components/NextButton/NextButton';
import ToolButton from '../components/ToolButton/ToolButton';
import React, {useState, useEffect, useCallback} from 'react';
import ModeIcon from '../components/ToolButton/assets/mode.svg';
import BackIcon from '../components/ToolButton/assets/back.svg';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';
import {
  getStyle,
  CONTAINER_STYLE,
  SELECT_CATEGORY_HEADING,
  getFillColor,
} from '../ThemeMode/ThemeMode';

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import {
  PHRASES_HEADING,
  PICK_SOLUTION_HEADING,
  PICK_BUTTON,
  NEXT_BUTTON,
  CATEGORY_HEADING,
  LANGUAGE_DATA,
  RESHUFFLE_BUTTON,
} from '../translations/index';

export default ({
  themeMode,
  categories,
  navigation,
  seenPhrases,
  learntPhrases,
  addSeenPhrases,
  categoryPhrases,
  addLearntPhrase,
  switchThemeMode,
  updateSeenPhrases,
  currentCategoryName,
  removeLearntPhrase,
  nativeLanguage,
  switchLanguages,
}) => {
  const [phrasesLeft, setPhrasesLeft] = useState([]);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [currentPhrase, setCurrentPhrase] = useState(null);
  const [originalPhrases, setOriginalPhrases] = useState([]);
  const [shouldReshuffle, setshouldReshuffle] = useState(false);
  const [disableAllOptions, setDisableAllOptions] = useState(false);

  useEffect(() => {
    setOriginalPhrases(categoryPhrases);
    setNewQuestionPhrase(categoryPhrases, categoryPhrases);
  }, [categoryPhrases]);

  const setAnswerOptionsCallback = (original, current) => {
    const originWithoutCurrent = original.filter(phr => phr.id !== current.id);
    const randomFromAll = shuffleArray(originWithoutCurrent).slice(0, 3);
    const randomWithCorrect = shuffleArray([...randomFromAll, current]);
    setAnswerOptions(randomWithCorrect);
  };

  const selectAnswerCallback = useCallback(
    item => {
      if (item.id === currentPhrase.id) {
        const correctPhraseInSeenPhrases = seenPhrases.find(
          phr => phr.id === item.id,
        );
        if (correctPhraseInSeenPhrases) {
          updateSeenPhrases(correctPhraseInSeenPhrases);
        }
        learntPhrases.every(phrase => phrase.id !== item.id) &&
          addLearntPhrase(item);
      } else {
        if (seenPhrases.every(phrase => phrase.id !== item.id)) {
          addSeenPhrases(item);
        }
        const wrongPhrasesInLearntPhrases = learntPhrases.find(
          phr => phr.id === item.id,
        );
        if (wrongPhrasesInLearntPhrases) {
          removeLearntPhrase(wrongPhrasesInLearntPhrases);
        }
      }
      setDisableAllOptions(true);
      const answerOptionsWithSelected = answerOptions.map(phrase => {
        return {...phrase, isSelected: phrase.id === item.id};
      });
      setAnswerOptions(answerOptionsWithSelected);
    },
    [
      currentPhrase,
      setDisableAllOptions,
      answerOptions,
      learntPhrases,
      seenPhrases,
    ],
  );

  const nextAnswerCallback = useCallback(() => {
    if (!Boolean(phrasesLeft.length)) {
      setshouldReshuffle(true);
      return;
    }
    setDisableAllOptions(false);
    const leftWithResetSelection = phrasesLeft.map(p => ({
      ...p,
      isSelected: false,
    }));

    setNewQuestionPhrase(originalPhrases, leftWithResetSelection);
  }, [phrasesLeft, originalPhrases]);

  const reshuffleCallback = useCallback(() => {
    setshouldReshuffle(false);
    setDisableAllOptions(false);
    setNewQuestionPhrase(originalPhrases, originalPhrases);
  }, [originalPhrases]);

  const setNewQuestionPhrase = (originalAll, leftOriginal) => {
    const phrasesLeftOriginal = shuffleArray(leftOriginal);
    const phrasesLeftCopy = [...phrasesLeftOriginal];
    const newPhrase = phrasesLeftCopy.shift();
    setPhrasesLeft(phrasesLeftCopy);
    setCurrentPhrase(newPhrase);
    setAnswerOptionsCallback(originalAll, newPhrase);
  };
  const currentSeenCategory = categories.find(cat =>
    cat.phrasesIds.includes(currentPhrase?.id),
  );
  const usedLanguage = nativeLanguage === LANGUAGE_NAMES.EN;
  const categoryHeading = LANGUAGE_DATA[CATEGORY_HEADING][nativeLanguage];
  const phraseHeading = LANGUAGE_DATA[PHRASES_HEADING][nativeLanguage];
  const pickSolution = LANGUAGE_DATA[PICK_SOLUTION_HEADING][nativeLanguage];
  const pickButton = LANGUAGE_DATA[PICK_BUTTON][nativeLanguage];
  const nextButton = LANGUAGE_DATA[NEXT_BUTTON][nativeLanguage];
  const reshuffleButton = LANGUAGE_DATA[RESHUFFLE_BUTTON][nativeLanguage];

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={getStyle(CONTAINER_STYLE, themeMode)}
        behavior="padding">
        <View style={{paddingHorizontal: 35, paddingVertical: 23}}>
          <View style={styles.header}>
            <ToolBar
              button={
                <ToolButton
                  onPress={() => {
                    navigation.navigate('Home');
                  }}>
                  <BackIcon
                    width={24}
                    height={24}
                    fill={getFillColor(themeMode)}
                  />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <LanguageSwitcher
                  LeftText={usedLanguage ? 'MG' : 'EN'}
                  RightText={usedLanguage ? 'EN' : 'MG'}
                  firstLanguage={nativeLanguage}
                  color={getFillColor(themeMode)}
                  iconType=""
                  iconName="swap-horiz"
                  onPress={() => switchLanguages(nativeLanguage)}
                  iconSize={24}
                />
              }
            />
            <ToolBar
              button={
                <ToolButton onPress={() => switchThemeMode()}>
                  <ModeIcon
                    width={24}
                    height={24}
                    fill={getFillColor(themeMode)}
                  />
                </ToolButton>
              }
            />
          </View>
          <View style={styles.heading}>
            <SectionHeading text={categoryHeading} themeMode={themeMode} />
            <Text style={getStyle(SELECT_CATEGORY_HEADING, themeMode)}>
              {usedLanguage && currentSeenCategory
                ? currentSeenCategory.name.en
                : currentCategoryName && currentSeenCategory
                ? currentSeenCategory.name.mg
                : currentCategoryName}
            </Text>
          </View>
          <View style={styles.heading}>
            <SectionHeading text={phraseHeading} themeMode={themeMode} />
          </View>
          <View style={{marginBottom: 37}}>
            <Textarea
              editable={false}
              themeMode={themeMode}
              phrase={
                shouldReshuffle
                  ? 'You have answered all the questions in this category'
                  : currentPhrase?.name?.[
                      usedLanguage ? LANGUAGE_NAMES.MG : LANGUAGE_NAMES.EN
                    ]
              }
            />
          </View>
          {!shouldReshuffle && Boolean(answerOptions && answerOptions.length) && (
            <View>
              <View style={{marginBottom: 37}}>
                <SectionHeading text={pickSolution} themeMode={themeMode} />
              </View>
              <List
                color="#06B6D4"
                text={pickButton}
                data={answerOptions}
                themeMode={themeMode}
                iconName="arrow-right"
                iconType="material-community"
                makeAction={selectAnswerCallback}
                randomPhraseId={currentPhrase.id}
                disableAllOptions={disableAllOptions}
                lang={usedLanguage ? LANGUAGE_NAMES.EN : LANGUAGE_NAMES.MG}
              />
            </View>
          )}

          {disableAllOptions && !shouldReshuffle && (
            <View style={{marginTop: 45}}>
              <NextButton
                isDisabled={false}
                text={nextButton}
                textColor={getFillColor(themeMode)}
                onPress={nextAnswerCallback}
              />
            </View>
          )}
          {shouldReshuffle && (
            <View style={{marginTop: 45}}>
              <NextButton
                isDisabled={false}
                text={reshuffleButton}
                textColor={getFillColor(themeMode)}
                onPress={reshuffleCallback}
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingBottom: 56,
  },
  heading: {
    paddingBottom: 15,
    flexDirection: 'row',
  },
  debugList: {
    flexDirection: 'row',
    width: 250,
  },
});
