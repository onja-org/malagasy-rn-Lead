import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../containers/HomeScreenContainer';
const Stack = createStackNavigator();
import Learning from '../containers/LearningScreenContainer';
import NewTerm from '../containers/NewTermContainer';

// a stack for screen navigator
const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="false">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Learn" component={Learning} />
        <Stack.Screen name="NewTerm" component={NewTerm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;
