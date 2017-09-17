/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from '../Styles/main';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';  
import MovieList from './MovieList';
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

class FeaturedNavigator extends Component{
	static navigationOptions = {
      headerTitle: '推荐电影',
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
		    <MovieList Navi={navigate}/> 
	    );
	}
}

 const Featured = StackNavigator({
  Home: { screen: FeaturedNavigator },
  Detail: { screen: MovieDetail },
});


export { Featured as default };