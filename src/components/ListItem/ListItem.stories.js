import * as React from 'react';
import list from './list';
import answers from './answers';
import {View} from 'react-native';
import ListItem from './ListItem';
import {storiesOf} from '@storybook/react-native';

storiesOf('List Item', module)
  .addDecorator(story => <View>{story()}</View>)
  .add('Item category', () => (
    <ListItem
      data={list}
      text={'Learn'}
      color="#06B6D4"
      iconName="arrow-right"
      iconType="material-community"
      onPress={() => console.log('Pressed to learn screen')}
    />
  ))
  .add('Item answer', () => (
    <ListItem
      data={answers}
      text={'Pick'}
      color="#06B6D4"
      iconName="arrow-right"
      iconType="material-community"
      onPress={() => console.log('Pressed to check the answer')}
    />
  ));
