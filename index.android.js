/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import styles from './app/Styles/main';

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackNavigator,TabBarBottom} from 'react-navigation'; 


import USBox from './app/Components/USBox';
import Featured from './app/Components/Featured';
import Search from './app/Components/Search';
import User from './app/Components/User';
import {  AppRegistry,View,Text,Image } from 'react-native';


class Movie extends Component {
  constructor(props) {
    super(props);

    this.state={  
      selectedTab:'我的',  
    } 
  }

  render() {
    return (
      <TabNavigator  tabBarStyle={{ backgroundColor:'#5D529B' }}>

        <TabNavigator.Item
          selected={this.state.selectedTab === '推荐电影'}
          title="推荐电影"
          titleStyle={{ color: '#BDBDBD' }}
          selectedTitleStyle={{ color:'#FAFAFA' }}
          renderIcon={() => <Icon name='inbox' size={24} color='#BDBDBD' /> }
          renderSelectedIcon={() => <Icon name='inbox' size={24} color='#FAFAFA' />}
          onPress={() => this.setState({ selectedTab: '推荐电影' })}>
          <Featured />
        </TabNavigator.Item>

        <TabNavigator.Item 
          selected={this.state.selectedTab === '北美票房'}
          title="北美票房"
          titleStyle={{ color: '#BDBDBD' }}
          selectedTitleStyle={{ color:'#FAFAFA' }}
          renderIcon={() => <Icon name='arrows' size={24} color='#BDBDBD' />}
          renderSelectedIcon={() => <Icon name='arrows' size={24} color='#FAFAFA' />}
          onPress={() => this.setState({ selectedTab: '北美票房' })}>
            <USBox />
        </TabNavigator.Item>

        <TabNavigator.Item 
          selected={this.state.selectedTab === '搜索'}
          title="搜索"
          titleStyle={{ color: '#BDBDBD' }}
          selectedTitleStyle={{ color:'#FAFAFA' }}
          renderIcon={() => <Icon name='search' size={24} color='#BDBDBD' />}
          renderSelectedIcon={() => <Icon name='search' size={24} color='#FAFAFA' />}
          onPress={() => this.setState({ selectedTab: '搜索' })}>
            <Search />
        </TabNavigator.Item>

        <TabNavigator.Item 
          selected={this.state.selectedTab === '我的'}
          title="我的"
          我的={{ color: '#BDBDBD' }}
          selectedTitleStyle={{ color:'#FAFAFA' }}
          renderIcon={() => <Icon name='user' size={24} color='#BDBDBD' />}
          renderSelectedIcon={() => <Icon name='user' size={24} color='#FAFAFA' />}
          onPress={() => this.setState({ selectedTab: '我的' })}>
            <User />
        </TabNavigator.Item>

      </TabNavigator>
    );
  }
}



const SimpleStack = StackNavigator(  
    {  
        Profile: {  
            path: 'people/:name',  
            screen: USBox,  
        },  
        Photos: {  
            path: 'photos/:name',  
            screen: Featured,  
        },  
        User: {
            path: 'photos/:name',  
            screen: User,  
        },
    },  
    {  
        initialRouteName: 'Home',  
    }  
);

AppRegistry.registerComponent('Movie', () => Movie);
