/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from '../Styles/main';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';  
import {
  Text,
  View,
} from 'react-native';

class Login extends Component{

	render() {
		return(
        <View style={[styles.container, styles.loading]}>
            <Text>仍为开发出登录功能</Text>
        </View>
	    );
	}
}


export { Login as default };