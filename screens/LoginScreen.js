import React, {Component} from 'react';
import {
  StyleSheet, Text, View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  Dimensions
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
import {Icon} from 'native-base';

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }

  // 5 底部登录框区域, 高度增加的动画
  increaseHeightOfLogin = () => {
    // 第一个参数是需要动画设置的变量, 第二个参数是动画配置
    Animated.timing(this.loginHeight, {
      toValue: SCREEN_HEIGHT, // 这里需要先知道全屏的高度, 使用dimensions
      duration: 500
    }).start();
  }

  // 4. 定义初始化变量, 底部登录框区域默认高度150
  componentWillMount = () => {
    this.loginHeight = new Animated.Value(150);
  }

  // 7.3 将登陆框的高度还原, 默认150, 实际上就是改变了下高度增加方法的参数
  decreaseLoginOfHeight() {
    Animated.timing(this.loginHeight, {
      toValue: 150,
      duration: 500
    }).start();
  }

  render() {
    // 6. 调整header高度, 需要的header相关变量
    // 登录框的顶部文字透明度, 当全屏的时候, 登录框的顶部透明度变量
    const headerTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [1, 0]     // 当顶部高度为150 那么则不透明, 当全屏, 则全透明隐藏
    });

    // 登录框的顶部margin
    const marginTop = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [25, 100] // 当顶部高度为150 那么则margin 25, 当全屏, 则margin更大100 才合理
    })

    // 返回按钮的透明度 , 它和登陆框顶部文字的透明度互补
    const headerBackArrowOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1]
    })


    return (<View style={{flex: 1}}>

      {/* 7. 添加返回导航按钮 */}
      {/* 7.1 设置返回按钮的透明度 */}
      <Animated.View style={{
        position: 'absolute',
        height: 60,
        width: 60,
        top: 60,
        left: 25,
        zIndex: 100,
        opacity: headerBackArrowOpacity
      }}>
        {/* 7.2 添加返回按钮的事件*/}
        <TouchableOpacity
          onPress={() => {
            this.decreaseLoginOfHeight()
          }}
        >
          <Icon name="md-arrow-back" style={{color: "black"}}/>
        </TouchableOpacity>

      </Animated.View>

      <ImageBackground source={require('../assets/login_bg.jpg')}
                       style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{
            backgroundColor: 'white', height: 100, width: 100,
            justifyContent: "center", alignItems: "center"
          }}>
            <Text style={{fontWeight: 'bold', fontSize: 26}}>UBER</Text>
          </View>
        </View>


        {/** BOTTOM **/}
        <View>
          {/* 2. 设置包含输入框控件的该View为Animated.View , 因为动画设置的就是该控件的高 */}
          <Animated.View style={{height: this.loginHeight, backgroundColor: 'white'}}>

            {/* 6.2 设置输入框顶部的动态大小和透明度 */}
            <Animated.View style={{
              alignItems: 'flex-start',
              paddingHorizontal: 25,
              marginTop: marginTop,
              opacity: headerTextOpacity
            }}>
              <Text style={{fontSize: 24}}>Get moving with Uber</Text>
            </Animated.View>

            {/* 3. 当点击输入区域则触发该事件处理,动画设置高 */}
            <TouchableOpacity
              onPress={() => {
                this.increaseHeightOfLogin()
              }}
            >
              <View style={{
                marginTop: 20,
                flexDirection: 'row',
                paddingHorizontal: 10
              }}>

                <Image source={require('../assets/india.png')}
                       style={{height: 24, width: 24, resizeMode: 'contain'}}/>
                {/* 1. 在input控件的父元素一个View 设置关闭文本输入, 避免键盘弹出 */}
                <View
                  pointerEvents="none"
                  style={{flexDirection: 'row', flex: 1}}>
                  <Text style={{fontSize: 20, paddingHorizontal: 10}}>91</Text>
                  {/* 输入框 */}
                  <TextInput
                    keyboardType="numeric"
                    ref="textInputMobile"
                    style={{flex: 1, fontSize: 20}}
                    placeholder="Enter your phone number"
                    underlineColorAndroid="transparent"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={{
          height: 70,
          backgroundColor: 'white',
          alignItems: 'flex-start',
          justifyContent: 'center',
          borderTopColor: '#e8e8ec',
          borderTopWidth: 1,
          paddingHorizontal: 25
        }}>
          <Text style={{color: '#5a7fdf', fontWeight: 'bold'}}>
            Or connect using a social account
          </Text>
        </View>

      </ImageBackground>
    </View>);
  }
}
export default LoginScreen