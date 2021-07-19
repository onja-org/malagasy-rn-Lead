import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
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

import {
  getStyle,
  CONTAINER_STYLE,
  getFillColor,
  LIGHT_MODE,
} from '../ThemeMode/ThemeMode';

export default ({
  themeMode,
  navigation,
  categories,
  addNewPhrases,
  nativeLanguage,
  switchLanguages,
  switchThemeMode,
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

  // Find the selected category
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
    console.log('add');
    const newPhrase = {
      catId: categoryId,
      id: uuid(),
      name: mergingPhrasesStates,
    };
    addNewPhrases(newPhrase);
    setEnglishPhrase('');
    setMalagsyPhrase('');
  };

  // Add button
  const textColour =
    malagasyPhrase && englishPhrase && selectedCategory ? '#ffffff' : '#06B6D4';

  const isButtonDisabled =
    malagasyPhrase && englishPhrase && selectedCategory ? false : true;

  function CategoryColor(theme) {
    if (selectedCategory && theme === LIGHT_MODE) {
      return 'black';
    } else if (selectedCategory && theme !== LIGHT_MODE) {
      return 'white';
    }
  }

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
                <ToolButton onPress={() => switchThemeMode()}>
                  <ModeIcon
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
                  firstLanguage={nativeLanguage}
                  LeftText={usedLanguage ? 'MG' : 'EN'}
                  RightText={usedLanguage ? 'EN' : 'MG'}
                  iconName="swap-horiz"
                  onPress={() => switchLanguages(nativeLanguage)}
                  iconType=""
                  LeftText="EN"
                  iconSize={24}
                  RightText="MA"
                  color={getFillColor(themeMode)}
                />
              }
            />
          </View>
          <View style={styles.headerCategoryWrapper}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <SectionHeading text={categoryHeading} themeMode={themeMode} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Picker
                selectedValue={selectedCategory}
                style={{
                  width: 200,
                  height: 100,
                  backgroundColor: 'transparent',
                  color: CategoryColor(themeMode),
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
              <SectionHeading text={phrasesInEnglish} themeMode={themeMode} />
            </Text>
            <Textarea
              editable={true}
              themeMode={themeMode}
              multiline={true}
              placeholder={textareaPlaceholder}
              phrase={englishPhrase}
              onChange={Text => setEnglishPhrase(Text)}
            />
          </View>
          <View style={styles.headerPhrases}>
            <Text style={{paddingBottom: 15}}>
              <SectionHeading text={phraseInMalagasy} themeMode={themeMode} />
            </Text>
            <Textarea
              placeholder={textareaPlaceholder}
              editable={true}
              themeMode={themeMode}
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
