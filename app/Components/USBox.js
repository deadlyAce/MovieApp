/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from '../Styles/main';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';  
import USBoxList from './USBoxList';
import MovieDetail from './MovieDetail';

import {
  ActivityIndicator,
  TouchableHighlight,
  Text,
  View,
  ListView,
  Image,
  Button,
} from 'react-native';

class USBoxe extends Component{
	static navigationOptions = {
      headerTitle: '北美票房',
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
        <USBoxList  Navi={navigate}/>
	    );
	}
}

 const USBox = StackNavigator({
  USBox: { screen: USBoxe },
  Detail: { screen: MovieDetail },
});


export { USBox as default };