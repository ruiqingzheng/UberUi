# UberUi

`https://www.youtube.com/watch?v=e1xi0NfpkfI&list=PLy9JCsy2u97lqwG1DiaUA9RPloJ0Ok2wb`

仿UberUi登录页面

expo建立项目后 添加依赖

yarn add native-base
yarn add react-native-animatable
yarn add react-navigation

单页面, react-navigation 跳转到 `LoginScreen`

```js
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

```

// `LoginScreen`

具体看代码, 后面将改进和加入动画

效果

![框架界面](https://raw.githubusercontent.com/ruiqingzheng/images/master/UberUi01.png)