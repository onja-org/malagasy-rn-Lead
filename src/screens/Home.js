import React, {useEffect} from 'react';
import {action} from '@storybook/addon-actions';
import {
  LANGUAGE_NAMES,
  getAllCategories,
  getPhrasesForCategoryId,
} from '../data/dataUtils';

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
import ModeIcon from '../components/ToolButton/assets/mode.svg';

export default ({
  //nav provider
  navigation,
  //state props
  categories,
  seenPhrases,
  userPhrases,
  learntPhrases,
  nativeLanguage,
  nativeLanguage,
  userPhrases,
  //actions
  setPhrases,
  setCategories,
  setCurrentCategory,
  syncStorageToRedux,
}) => {
  useEffect(() => {
    syncStorageToRedux();
    // fetch categories
    const categories = getAllCategories();
    setCategories(categories);
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
                  firstLanguage={LANGUAGE_NAMES.EN}
                  LeftText="MG"
                  RightText="EN"
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
                  <CheckIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <ToolButton onPress={action('clicked-add-button')}>
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
            <SectionHeading text="Select a category:" />
          </View>
          <List
            lang={nativeLanguage}
            data={categories}
            text={'Learn'}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={openCategoryPhrases}
          />
          <View style={styles.heading}>
            <SectionHeading text="Seen phrases:" />
          </View>
          <List
            data={[{id: 1, name: '35 words and phrases'}]}
            text={'Learn'}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={() => {}}
          />
          <View style={styles.heading}>
            <SectionHeading text="Learnt phrases:" />
          </View>
          <List
            data={[{id: 2, name: `${learntPhrases.length} words and phrases`}]}
            text={'Learn'}
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
