/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from '../Styles/main';
import UserProfile from './UserProfile';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';  
import {
  ActivityIndicator,
  TouchableHighlight,
  Text,
  View,
  ListView,
  Image,
  Button,
} from 'react-native';

class UserNavigator extends Component{
	static navigationOptions = {
      headerTitle: '登录界面',
      headerTitleStyle: {
      	alignSelf: 'center',
      	color: '#E6E6E6',
      	fontSize: 14,
      },
      headerStyle: {
      	height: 40, 
      	backgroundColor: '#5D529B',
      },
      
    };
	render() {
		const { navigate } = this.props.navigation;
		return(
        <UserProfile />
	    );
	}
}

 const User = StackNavigator({
  Home: { screen: UserNavigator },

});


export { User as default };