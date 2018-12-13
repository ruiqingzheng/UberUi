# 动画

添加forward图标和放大后登录框的标题, 和相关动画

## 1. forward 圆形按钮基本样式

```js
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
```

## 键盘的显示和关闭

### 2.1 当点击输入框后, 动画完毕则调出键盘

```js
    Animated.timing(this.loginHeight, {
      toValue: SCREEN_HEIGHT, // 这里需要先知道全屏的高度, 使用dimensions
      duration: 500
      // 2.1 当点击输入框后, 动画完毕则调出键盘
    }).start(() => {
      this.refs.textInputMobile.focus()
    });
```

### 2.2 当返回时, 首先关闭键盘

```js
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
```

## 键盘显示和关闭时, 设置按钮等相关显示和动画

```js
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
```

// forward图标的高度就是键盘的高度 + 10
// forward按钮透明度来控制显示
// input 框底部横线的显示

```js

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
```

## 4. 应用上面设置的动画变量

```js
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

        ...


        <Animated.View
                  pointerEvents="none"
                  style={{
                    flexDirection: 'row', flex: 1,
                    borderBottomWidth: this.borderBottomWidth // 4.3 输入框的底部线条
                  }}>
```

## 5. 还原动画 , 类似键盘弹起,只需要把动画的toValue值改为默认值

键盘关闭时, 将上面设置的变量还原, 则让forward图标bottom为0 (keyboardHeight), 透明度为0不显示, 输入框底部线条不显示

## 6. 输入框的placeholder

作为state来设置

```js
  increaseHeightOfLogin = () => {

    // 6.1 输入框placeholder
    this.setState({
      placeholderText: '0123456789'
    })
```

## 7. 调整输入框的marginTop

```js
    // 7. 输入框的标题 marginTop
    const marginTop = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [25, 100] // 当顶部高度为150 那么则margin 25, 当全屏, 则margin更大100 才合理
    })
```

## 8. 标题

```js
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
```

// 标题动画

```js

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
```

## 9. 使用Animatable 设置一次性动画

```js
          {/* 9.1 使用Animatable将首次显示logo设置为动画显示 */}
          <Animatable.View
            animation="zoomIn" iterationCount={1}
```

```js
        {/* 9.2  使用Animatable将底部区域动画设置为从底部顶出 */}
        <Animatable.View animation="slideInUp" iterationCount={1}>
```