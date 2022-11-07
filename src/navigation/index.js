import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListScreen from '../screens/ListScreen/ListScreen';
import DetailScreen from '../screens/DetailScreen/DetailScreen';
import FormScreen from '../screens/FormScreen/FormScreen';

const AppStack = createNativeStackNavigator();

const AppStackScreen = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}>
      <AppStack.Screen name="ListScreen" component={ListScreen}/>
      <AppStack.Screen name="DetailScreen" component={DetailScreen} />
      <AppStack.Screen name="FormScreen" component={FormScreen} />
    </AppStack.Navigator>
  );
};

export default class App extends Component {
  render() {
    return <AppStackScreen />
  }
}
