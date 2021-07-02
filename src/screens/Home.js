import React, {useEffect} from 'react';
import {action} from '@storybook/addon-actions';
import {getPhrasesForCategoryId, LANGUAGE_NAMES} from '../data/dataUtils';

import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import List from '../components/List/List';
import ToolBar from '../components/ToolBar/ToolBar';
import ToolButton from '../components/ToolButton/ToolButton';
import AddIcon from '../components/ToolButton/assets/add.svg';
import ModeIcon from '../components/ToolButton/assets/mode.svg';
import CheckIcon from '../components/ToolButton/assets/check.svg';
import CheckAllIcon from '../components/ToolButton/assets/check-all.svg';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';
import LEARNT_PRHASES_ID from '../redux/constants';
import SEEN_PHRASES_ID from '../redux/constants';

import {
  HOME_CATEGORY_HEADING,
  LEARN_BUTTON,
  SEEN_PHRASES_HEADING,
  LEARNT_PHRASES_HEADING,
  WORDS_PHRASES_HEADING,
  LANGUAGE_DATA,
} from '../translations/index';

export default ({
  //nav provider
  navigation,
  //state props
  categories,
  seenPhrases,
  userPhrases,
  learntPhrases,
  nativeLanguage,
  //actions
  setPhrases,
  setCurrentCategory,
  syncStorageToRedux,
  switchLanguages,
  asyncGetAllCategories,
}) => {
  useEffect(() => {
    syncStorageToRedux();
    asyncGetAllCategories();
  }, []);

  const openCategoryPhrases = item => {
    const categoryId = item.id;
    setCurrentCategory(item.id);
    // fetch Phrases for category
    const phrasesForCategory = getPhrasesForCategoryId(categoryId);
    const userPhrasesForCategory = userPhrases.filter(
      phrase => phrase.catId === categoryId,
    );
    // combine all phrases for category
    const allPhrasesForCategory = [
      ...phrasesForCategory,
      ...userPhrasesForCategory,
    ];
    setPhrases(allPhrasesForCategory);
    navigation.navigate('Learn');
  };

  const openSeenPhrases = () => {
    if (seenPhrases.length !== 0) {
      setPhrases(seenPhrases);
      navigation.navigate('Learn');
    }
  };

  const openLearntPhrases = () => {
    setPhrases(learntPhrases);
    learntPhrases.length && navigation.navigate('Learn');
  };

  const usedLanguage = nativeLanguage === LANGUAGE_NAMES.EN;
  const categoryHeading = LANGUAGE_DATA[HOME_CATEGORY_HEADING][nativeLanguage];
  const learnButton = LANGUAGE_DATA[LEARN_BUTTON][nativeLanguage];
  const seenPhrasesHeading =
    LANGUAGE_DATA[SEEN_PHRASES_HEADING][nativeLanguage];
  const learnPhraseHeading =
    LANGUAGE_DATA[LEARNT_PHRASES_HEADING][nativeLanguage];
  const wordsAndPhrasesHeading =
    LANGUAGE_DATA[WORDS_PHRASES_HEADING][nativeLanguage];
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <View style={{paddingHorizontal: 35, paddingVertical: 23}}>
          <View style={styles.header}>
            <ToolBar
              button={
                <ToolButton onPress={() => navigation.navigate('NewTerm')}>
                  <AddIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <LanguageSwitcher
                  firstLanguage={nativeLanguage}
                  LeftText={usedLanguage ? 'MG' : 'EN'}
                  RightText={usedLanguage ? 'EN' : 'MG'}
                  color="#FFFFFF"
                  iconType=""
                  iconName="swap-horiz"
                  onPress={() => switchLanguages(nativeLanguage)}
                  iconSize={24}
                />
              }
            />
            <ToolBar
              button={
                <ToolButton onPress={openSeenPhrases}>
                  <CheckIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <ToolButton onPress={openLearntPhrases}>
                  <CheckAllIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
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
            <SectionHeading text={categoryHeading} />
          </View>
          <List
            lang={nativeLanguage}
            data={categories}
            text={learnButton}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={openCategoryPhrases}
          />
          <View style={styles.heading}>
            <SectionHeading text={seenPhrasesHeading} />
          </View>
          <List
            data={[
              {
                id: `${SEEN_PHRASES_ID}`,
                name: `${seenPhrases.length} ${wordsAndPhrasesHeading}`,
              },
            ]}
            text={learnButton}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={openSeenPhrases}
          />
          <View style={styles.heading}>
            <SectionHeading text={learnPhraseHeading} />
          </View>
          <List
            data={[
              {
                id: `${LEARNT_PRHASES_ID}`,
                name: `${learntPhrases.length} ${wordsAndPhrasesHeading}`,
              },
            ]}
            text={learnButton}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={openLearntPhrases}
          />
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
  },
});
