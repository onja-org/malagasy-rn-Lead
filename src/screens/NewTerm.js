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
import SectionHeading from '../components/SectionHeading/SectionHeading';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';

export default ({
  //nav provider
  navigation,
  categories,
  addNewPhrases,
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
  const selectCategory = Text => {
    setSelectedCategory(Text);
    const selectedCat = categories.find(cat => cat.name.en === Text);
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

  const textColour =
    malagasyPhrase && englishPhrase && selectedCategory ? '#ffffff' : '#06B6D4';

  const isButtonDisabled =
    malagasyPhrase && englishPhrase && selectedCategory ? false : true;

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
          </View>
          <View style={styles.headerCategoryWrapper}>
            <SectionHeading text="Category: " />
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
                  label={'Select Category'}
                  value={null}
                  color="#06B6D4"
                />
                {categories.map(categoryName => (
                  <Picker.Item
                    label={categoryName.name.en}
                    key={categoryName.id}
                    value={categoryName.name.en}
                  />
                ))}
              </Picker>
              {showSelectIcon && <SelectIcon />}
            </View>
          </View>
          <View style={styles.headerPhrases}>
            <Text style={{paddingBottom: 15}}>
              <SectionHeading text="The phrase in English: " />
            </Text>
            <Textarea
              editable={true}
              multiline={true}
              placeholder="Enter here"
              phrase={englishPhrase}
              onChange={Text => setEnglishPhrase(Text)}
            />
          </View>
          <View style={styles.headerPhrases}>
            <Text style={{paddingBottom: 15}}>
              <SectionHeading text="The phrase in Malagasy: " />
            </Text>
            <Textarea
              placeholder="Enter here"
              editable={true}
              multiline={true}
              phrase={malagasyPhrase}
              onChange={Text => setMalagsyPhrase(Text)}
            />
          </View>
          <View style={styles.addButton}>
            <NextButton
              onPress={() => addnewPhraseForCategory()}
              text="Add"
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
