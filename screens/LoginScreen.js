import React, {Component} from 'react';
import {
  StyleSheet, Text, View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  Dimensions,
  Keyboard,
  Platform
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
import {Icon} from 'native-base';
import * as Animatable from 'react-native-animatable'

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }

  // 6. 输入框的placeholder
  constructor() {
    super();
    this.state = {
      placeholderText: 'Please enter your mobile number'
    }
  }

  // 底部登录框区域, 高度增加的动画
  increaseHeightOfLogin = () => {

    // 6.1 输入框placeholder
    this.setState({
      placeholderText: '0123456789'
    })
    // 第一个参数是需要动画设置的变量, 第二个参数是动画配置
    Animated.timing(this.loginHeight, {
      toValue: SCREEN_HEIGHT, // 这里需要先知道全屏的高度, 使用dimensions
      duration: 500
      // 2.1 当点击输入框后, 动画完毕则调出键盘
    }).start(() => {
      this.refs.textInputMobile.focus()
    });
  }

  //  定义初始化变量, 底部登录框区域默认高度150
  componentWillMount = () => {
    this.loginHeight = new Animated.Value(150);

    // 3. 设置forward图标跟随keyboard变化而变化
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    // 3.1 android下时间名必须为keyboardDidShow keyboardDidHide
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);

    // 3.2 定义forward按钮动画相关变量
    this.keyboardHeight = new Animated.Value(0)
    this.forwardArrowOpacity = new Animated.Value(0);
    this.borderBottomWidth = new Animated.Value(0);

  }

  keyboardWillShow = (event) => {
    if (Platform.OS === 'android') {
      duration = 100
    } else {
      duration = event.duration
    }
    Animated.parallel([
      // 3.3 联动动画
      // 键盘的出现动画, duration 就是键盘弹出事件的时间 + 100
      Animated.timing(this.keyboardHeight, {
        duration: duration + 100,
        toValue: event.endCoordinates.height + 10 // 在keyboard最终位置高度上 + 10
      }),
      // 设置forward按钮的透明度动画, 当键盘弹出, 透明度为1, 可见
      Animated.timing(this.forwardArrowOpacity, {
        duration: duration,
        toValue: 1
      }),

      // 设置输入框的底部线条
      Animated.timing(this.borderBottomWidth, {
        duration: event.duration,
        toValue: 1
      })
    ]).start()
  }

  // 5. 还原动画 , 类似键盘弹起,只需要把动画的toValue值改为默认值
  keyboardWillHide = (event) => {
    if(Platform.OS === "android") {
      duration = 100
    }else {
      duration = event.duration
    }
    Animated.parallel([
      // 3.3 联动动画
      // 键盘的出现动画, duration 就是键盘弹出事件的时间 + 100
      Animated.timing(this.keyboardHeight, {
        duration: duration + 100,
        toValue: 0
      }),
      // 设置forward按钮的透明度动画, 当键盘弹出, 透明度为1, 可见
      Animated.timing(this.forwardArrowOpacity, {
        duration: duration,
        toValue: 0
      }),

      // 设置输入框的底部线条
      Animated.timing(this.borderBottomWidth, {
        duration: event.duration,
        toValue: 0
      })
    ]).start()
  }


  //  将登陆框的高度还原, 默认150, 实际上就是改变了下高度增加方法的参数
  decreaseLoginOfHeight() {
    this.setState({
      placeholderText: 'Please enter your mobile number'
    });

    // 2.2 当返回时, 首先关闭键盘
    Keyboard.dismiss();
    Animated.timing(this.loginHeight, {
      toValue: 150,
      duration: 500
    }).start();
  }

  render() {
    // 调整header高度, 需要的header相关变量
    // 登录框的顶部文字透明度, 当全屏的时候, 登录框的顶部透明度变量
    const headerTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [1, 0]     // 当顶部高度为150 那么则不透明, 当全屏, 则全透明隐藏
    });

    // 登录框的顶部margin
    // 7. 输入框的 marginTop
    const marginTop = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [25, 100] // 当顶部高度为150 那么则margin 25, 当全屏, 则margin更大100 才合理
    })

    // 返回按钮的透明度 , 它和登陆框顶部文字的透明度互补
    const headerBackArrowOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1]
    })

    // 8.2 定义输入大页面的标题相关的动画变量, 他们同样是和SCREEN_HEIGHT相关

    const titleTextBottom = this.loginHeight.interpolate({
      inputRange: [150,400,SCREEN_HEIGHT],   // 8.3 添加一个参数,当超过400, 才开始从0变化
      outputRange: [0,0,100]
    });
    const titleTextLeft = this.loginHeight.interpolate({
      inputRange: [150,SCREEN_HEIGHT],
      outputRange: [100,25]    // 8.4  left 从100到25 就有从右到左进入的动画, 可以改其他数字试试
    });
    const titleTextOpacity = this.loginHeight.interpolate({
      inputRange: [150,SCREEN_HEIGHT],
      outputRange: [0,1]
    });


    return (<View style={{flex: 1}}>

      {/* 添加返回导航按钮 */}
      {/* 设置返回按钮的透明度 */}
      <Animated.View style={{
        position: 'absolute',
        height: 60,
        width: 60,
        top: 60,
        left: 25,
        zIndex: 100,
        opacity: headerBackArrowOpacity
      }}>
        {/* 添加返回按钮的事件*/}
        <TouchableOpacity
          onPress={() => {
            this.decreaseLoginOfHeight()
          }}
        >
          <Icon name="md-arrow-back" style={{color: "black"}}/>
        </TouchableOpacity>

      </Animated.View>

      {/* 1. forward 圆形按钮基本样式 */}
      <Animated.View
        style={{
          position: 'absolute',
          height: 60, width: 60,
          right: 10,
          bottom: this.keyboardHeight,  // 4.1 设置forward图标距离底部的坐标为键盘的高度
          opacity: this.forwardArrowOpacity, // 4.2 设置forward图标的可见透明度
          zIndex: 100,
          backgroundColor: '#54575e',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30
        }}>
        <Icon name="md-arrow-forward" style={{color: 'white'}}/>
      </Animated.View>


      <ImageBackground source={require('../assets/login_bg.jpg')}
                       style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {/* 9.1 使用Animatable将首次显示logo设置为动画显示 */}
          <Animatable.View
            animation="zoomIn" iterationCount={1}
            style={{
            backgroundColor: 'white', height: 100, width: 100,
            justifyContent: "center", alignItems: "center"
          }}>
            <Text style={{fontWeight: 'bold', fontSize: 26}}>UBER</Text>
          </Animatable.View>
        </View>

        {/** BOTTOM **/}
        {/* 9.2  使用Animatable将底部区域动画设置为从底部顶出 */}
        <Animatable.View animation="slideInUp" iterationCount={1}>
          {/* 设置包含输入框控件的该View为Animated.View , 因为动画设置的就是该控件的高 */}
          <Animated.View style={{height: this.loginHeight, backgroundColor: 'white'}}>
            {/* 设置输入框顶部的动态大小和透明度 */}
            <Animated.View style={{
              alignItems: 'flex-start',
              paddingHorizontal: 25,
              marginTop: marginTop,
              opacity: headerTextOpacity
            }}>
              <Text style={{fontSize: 24}}>Get moving with Uber</Text>
            </Animated.View>

            {/*  当点击输入区域则触发该事件处理,动画设置高 */}
            <TouchableOpacity
              onPress={() => {
                this.increaseHeightOfLogin()
              }}
            >
              {/* 8. 添加标题区域 */}
              <Animated.Text style={{
                fontSize: 24,
                color: 'gray',
                position: 'absolute',
                bottom: titleTextBottom,
                left: titleTextLeft,
                opacity: titleTextOpacity
              }}>
                Enter your mobile number
              </Animated.Text>


              {/* 7.2 输入区域marginTop */}
              <Animated.View style={{
                marginTop: marginTop,
                flexDirection: 'row',
                paddingHorizontal: 10
              }}>

                <Image source={require('../assets/india.png')}
                       style={{height: 24, width: 24, resizeMode: 'contain'}}/>
                {/* 在input控件的父元素一个View 设置关闭文本输入, 避免键盘弹出 */}
                <Animated.View
                  pointerEvents="none"
                  style={{
                    flexDirection: 'row', flex: 1,
                    borderBottomWidth: this.borderBottomWidth // 4.3 输入框的底部线条
                  }}>
                  <Text style={{fontSize: 20, paddingHorizontal: 10}}>91</Text>
                  {/* 输入框 */}
                  <TextInput
                    keyboardType="numeric"
                    ref="textInputMobile"
                    style={{flex: 1, fontSize: 20}}
                    placeholder={this.state.placeholderText}
                    underlineColorAndroid="transparent"
                  />
                </Animated.View>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </Animatable.View>

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