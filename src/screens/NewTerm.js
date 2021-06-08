import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {action} from '@storybook/addon-actions';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import {LANGUAGE_NAMES} from '../data/dataUtils';
import ToolBar from '../components/ToolBar/ToolBar';
import Textarea from '../components/Textarea/Textarea';
import NextButton from '../components/NextButton/NextButton';
import ToolButton from '../components/ToolButton/ToolButton';
import BackIcon from '../components/ToolButton/assets/back.svg';
import ModeIcon from '../components/ToolButton/assets/mode.svg';
import SelectIcon from '../components/ToolButton/assets/pickerIcon';

import {
  CATEGORY_HEADING,
  SELECT_CATEGORY,
  PHRASE_IN_ENGLISH,
  PHRASE_IN_MALAGASY,
  ADD_BUTTON,
  TEXTAREA_PLACEHOLDER,
  LANGUAGE_DATA,
} from '../translations/index';

import SectionHeading from '../components/SectionHeading/SectionHeading';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';

export default ({
  //nav provider
  navigation,
  categories,
  addNewPhrases,
  nativeLanguage,
  switchLanguages,
}) => {
  const [categoryId, setCategoryId] = useState('');
  const [englishPhrase, setEnglishPhrase] = useState('');
  const [malagasyPhrase, setMalagsyPhrase] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSelectIcon, setShowSelectIcon] = useState(true);

  // Hiding icon when the user select one item
  const isIconShown = () => {
    if (selectedCategory === '') {
      setShowSelectIcon(!showSelectIcon);
    } else {
      setShowSelectIcon(showSelectIcon);
    }
  };

  // Merging englishPhrase and malagasyPhrases
  const englishText = {
    en: englishPhrase,
  };
  const malagasyText = {
    mg: malagasyPhrase,
  };
  const mergingPhrasesStates = {...englishText, ...malagasyText};

  // find the selected category
  const selectCategory = categoryName => {
    setSelectedCategory(categoryName);
    const selectedCat = categories.find(cat =>
      usedLanguage
        ? cat.name.en === categoryName
        : cat.name.mg === categoryName,
    );
    setCategoryId(selectedCat.id);
  };
  const addnewPhraseForCategory = () => {
    const newPhrase = {
      catId: categoryId,
      id: uuid(),
      name: mergingPhrasesStates,
    };
    addNewPhrases(newPhrase);
    // clear input
    setEnglishPhrase('');
    setMalagsyPhrase('');
  };

  // Add button
  const textColour =
    malagasyPhrase && englishPhrase && selectedCategory ? '#ffffff' : '#06B6D4';

  const isButtonDisabled =
    malagasyPhrase && englishPhrase && selectedCategory ? false : true;

  // Switch languages
  const usedLanguage = nativeLanguage === LANGUAGE_NAMES.EN;
  const categoryHeading = LANGUAGE_DATA[CATEGORY_HEADING][nativeLanguage];
  const selectCategoryPicker = LANGUAGE_DATA[SELECT_CATEGORY][nativeLanguage];
  const phrasesInEnglish = LANGUAGE_DATA[PHRASE_IN_ENGLISH][nativeLanguage];
  const phraseInMalagasy = LANGUAGE_DATA[PHRASE_IN_MALAGASY][nativeLanguage];
  const addButton = LANGUAGE_DATA[ADD_BUTTON][nativeLanguage];
  const textareaPlaceholder =
    LANGUAGE_DATA[TEXTAREA_PLACEHOLDER][nativeLanguage];

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
                <ToolButton onPress={action('clicked-mode-Icon')}>
                  <ModeIcon width={24} height={24} fill="#FFFFFF" />
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
          </View>
          <View style={styles.headerCategoryWrapper}>
            <SectionHeading text={categoryHeading} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Picker
                selectedValue={selectedCategory}
                style={{
                  width: 200,
                  height: 100,
                  backgroundColor: 'transparent',
                }}
                mode="dropdown"
                onValueChange={Text => {
                  selectCategory(Text);
                  isIconShown();
                }}
                dropdownIconColor="#06B6D4">
                <Picker.Item
                  label={selectCategoryPicker}
                  value={null}
                  color="#06B6D4"
                />
                {usedLanguage
                  ? categories.map(categoryName => (
                      <Picker.Item
                        label={categoryName.name.en}
                        key={categoryName.id}
                        value={categoryName.name.en}
                      />
                    ))
                  : categories.map(categoryName => (
                      <Picker.Item
                        label={categoryName.name.mg}
                        key={categoryName.id}
                        value={categoryName.name.mg}
                      />
                    ))}
              </Picker>
              {showSelectIcon && <SelectIcon />}
            </View>
          </View>
          <View style={styles.headerPhrases}>
            <Text style={{paddingBottom: 15}}>
              <SectionHeading text={phrasesInEnglish} />
            </Text>
            <Textarea
              editable={true}
              multiline={true}
              placeholder={textareaPlaceholder}
              phrase={englishPhrase}
              onChange={Text => setEnglishPhrase(Text)}
            />
          </View>
          <View style={styles.headerPhrases}>
            <Text style={{paddingBottom: 15}}>
              <SectionHeading text={phraseInMalagasy} />
            </Text>
            <Textarea
              placeholder={textareaPlaceholder}
              editable={true}
              multiline={true}
              phrase={malagasyPhrase}
              onChange={Text => setMalagsyPhrase(Text)}
            />
          </View>
          <View style={styles.addButton}>
            <NextButton
              onPress={addnewPhraseForCategory}
              text={addButton}
              textColor={textColour}
              isDisabled={isButtonDisabled}
            />
          </View>
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
  headerCategoryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 30,
  },
  headerPhrases: {
    paddingBottom: 25,
  },
  addButton: {
    paddingTop: 60,
  },
});
