import React, {Component} from 'react';
import {
  StyleSheet, Text, View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (<View style={{flex: 1}}>
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
          <View style={{height: 150, backgroundColor: 'white'}}>
            <View style={{
              alignItems: 'flex-start',
              paddingHorizontal: 25,
              marginTop: 10
            }}>
              <Text style={{fontSize: 24}}>Get moving with Uber</Text>
            </View>

            <TouchableOpacity>
              <View style={{
                marginTop: 20,
                flexDirection: 'row',
                paddingHorizontal: 10
              }}>

                <Image source={require('../assets/india.png')}
                       style={{height: 24, width: 24, resizeMode: 'contain'}}/>
                <View style={{flexDirection:'row',flex:1}}>
                  <Text style={{fontSize:20,paddingHorizontal:10}}>91</Text>
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

          </View>


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