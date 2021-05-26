import {shuffleArray} from '../utils/index';
import List from '../components/List/List';
import {action} from '@storybook/addon-actions';
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
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

export default ({
  //nav provider
  navigation,
  categories,
  seenPhrases,
  learntPhrases,
  addSeenPhrases,
  categoryPhrases,
  addLearntPhrases,
  updateSeenPhrases,
  currentCategoryName,
  updateLearntPhrases,
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
        // add to learned
        // Get correct seen phrase
        const correctPhraseInSeenPhrases = seenPhrases.find(
          phr => phr.id === item.id,
        );
        // update seen phrases
        if (correctPhraseInSeenPhrases) {
          updateSeenPhrases(correctPhraseInSeenPhrases);
        }
        // TODO add to learned
        learntPhrases.every(phrase => phrase.id !== item.id) &&
          addLearntPhrases(item);
      } else {
        //add to seen
        if (seenPhrases.every(phrase => phrase.id !== item.id)) {
          addSeenPhrases(item);
        }
        // TODO add to seen
        const wrongPhrasesInLearntPhrases = learntPhrases.find(
          phr => phr.id === item.id,
        );
        if (wrongPhrasesInLearntPhrases) {
          updateLearntPhrases(wrongPhrasesInLearntPhrases);
        }
      }
      setDisableAllOptions(true);
      const answerOptionsWithSelected = answerOptions.map(phrase => {
        return {...phrase, isSelected: phrase.id === item.id};
      });
      setAnswerOptions(answerOptionsWithSelected);
    },
    [currentPhrase, setDisableAllOptions, answerOptions],
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <View style={{paddingHorizontal: 35, paddingVertical: 23}}>
          <View style={styles.header}>
            <ToolBar
              button={
                <ToolButton
                  onPress={() => {
                    navigation.navigate('Home');
                  }}>
                  <BackIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <LanguageSwitcher
                  firstLanguage={LANGUAGE_NAMES.EN}
                  LeftText="EN"
                  RightText="MA"
                  color="#FFFFFF"
                  iconType=""
                  iconName="swap-horiz"
                  onPress={() => null}
                  iconSize={24}
                />
              }
            />
            <ToolBar
              button={
                <ToolButton onPress={action('clicked-add-button')}>
                  <ModeIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
          </View>
          <View style={styles.heading}>
            <SectionHeading text="Category: " />
            <Text>
              {currentSeenCategory
                ? currentSeenCategory.name.en
                : currentCategoryName}
            </Text>
          </View>
          <View style={styles.heading}>
            <SectionHeading text="The phrase: " />
          </View>
          <View style={{marginBottom: 37}}>
            <Textarea
              editable={false}
              phrase={
                shouldReshuffle
                  ? 'You have answered all the questions in this category'
                  : currentPhrase?.name?.[LANGUAGE_NAMES.EN]
              }
            />
          </View>
          {!shouldReshuffle && Boolean(answerOptions && answerOptions.length) && (
            <View>
              <View style={styles.heading}>
                <SectionHeading text="Pick a solution: " />
              </View>
              <List
                lang={LANGUAGE_NAMES.MG}
                data={answerOptions}
                text="Pick"
                color="#06B6D4"
                iconType="material-community"
                iconName="arrow-right"
                makeAction={selectAnswerCallback}
                randomPhraseId={currentPhrase.id}
                disableAllOptions={disableAllOptions}
              />
            </View>
          )}

          {disableAllOptions && !shouldReshuffle && (
            <View style={{marginTop: 45}}>
              <NextButton
                isDisabled={false}
                textColor="#FFFFFF"
                text={'Next'}
                onPress={nextAnswerCallback}
              />
            </View>
          )}
          {shouldReshuffle && (
            <View style={{marginTop: 45}}>
              <NextButton
                isDisabled={false}
                textColor="#FFFFFF"
                text={'Reshuffle'}
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
