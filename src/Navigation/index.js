import * as React from 'react';
import NewTerm from '../containers/NewTermContainer';
import HomeScreen from '../containers/HomeScreenContainer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Learning from '../containers/LearningScreenContainer';

const Stack = createStackNavigator();

// Stack for screen navigator
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
