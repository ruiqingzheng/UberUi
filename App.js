import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import LoginScreen from "./screens/LoginScreen";

const AppNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen
  }
});

export default createAppContainer(AppNavigator);


