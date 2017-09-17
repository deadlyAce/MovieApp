/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from '../Styles/main';
import Login from './Login';
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

class UserProfile extends Component{

	render() {
		return(
        <Login />
	    );
	}
}


export { UserProfile as default };