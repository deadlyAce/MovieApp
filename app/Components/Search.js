/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from '../Styles/main';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchResult from './SearchResult';
import MovieDetail from './MovieDetail';

import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';  

import {
  ActivityIndicator,
  TouchableHighlight,
  Text,
  View,
  ListView,
  Image,
  Button,
  TextInput,
  AsyncStorage,
} from 'react-native';


class SearchNavigator extends Component{
  constructor(props) {
    super(props);

    this.state = {
      query: 'fargo',
      loaded: false,
      searchHistory:[],
    };

    AsyncStorage.getItem('searchHistory')
    .then( (searchHistory) =>{
      if(searchHistory){
        this.setState({
          searchHistory: JSON.parse(searchHistory)
        });
      }
    });
  }

	static navigationOptions = {
      headerTitle: '搜索',
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

  searchHistory(){
    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    let newSearchHistory=[...new Set([this.state.query,...this.state.searchHistory])];

    this.setState({
       searchHistory: newSearchHistory,
     });

    AsyncStorage.setItem(
      'searchHistory',JSON.stringify(newSearchHistory)
    );
   } 


  fetchData(){
    this.searchHistory();

    this.setState({
      loaded: !this.state.loaded,
    });

    const REQUEST_URL= `http://api.douban.com/v2/movie/search?q=${this.state.query}`;
    fetch(REQUEST_URL)
    .then(response => response.json())
    .then(responseData => {
      console.log(this);
      this.setState({
        loaded:  !this.state.loaded,
      });

      this.props.navigation.navigate('SearchResult',{ result:  responseData,title: '搜索'+this.state.query+'的结果',query:this.state.query})
    })
    .done();
  }

  search(item){
    console.log('item  '+item);
    //使用setState函数的回调函数来实现
      this.setState({
        query: item,
      },() => {
        console.log('this.state.item  '+this.state.query);
        this.fetchData();
      });
  }


  deleteSearchHistoryItem(item) {
    let  newSearchHistory = this.state.searchHistory;

    function deleteItem(val) {
        var index = newSearchHistory.indexOf(val);
        if (index > -1) {
          newSearchHistory.splice(index, 1);
        }
      };
    deleteItem(item);

    this.setState({
      searchHistory: [...newSearchHistory],
    });
  }


  renderSearchHistoryList(item){

    return(
      <TouchableHighlight 
        underlayColor="rgba(34, 26, 38, 0.1)"
        onPress={()=> this.search(item)}
        >
        <View style={styles.item}>
          <TouchableHighlight
            underlayColor="rgba(34, 26, 38, 0.1)"
            onPress={()=> this.deleteSearchHistoryItem(item) }
            >
            <Icon name='remove' style={styles.delete} />
          </TouchableHighlight>            
            <View style={styles.itemContent}>
              <Text style={styles.itemHeader}>{item}</Text>
            </View>

        </View>
      </TouchableHighlight>
    );
  }

	render() {
		const { navigate } = this.props.navigation;
    let Source = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
		return(
        <View style={styles.container}> 
          <View style={{
            paddingTop: 7,
            paddingLeft: 7,
            paddingRight: 7,
            borderColor: "rgba(100,53,201,0.1)",
            borderBottomWidth: 1,
          }}>
            <TextInput 
            value={this.state.query}
            style={{
              height: 50,
              padding: 0,
            }}
            underlineColorAndroid="transparent"
            placeholder= "搜索内容。。。"
            placeholderTextColor="#6435c9"
            defaultValue="fargo"
            keyboardType="default"
            returnKeyType="search"
            onChangeText={(query)=>{
              this.setState({
                query
              });
            }}
            onSubmitEditing={this.fetchData.bind(this)}
            />
             {this.state.loaded && <ActivityIndicator 
              size="small"
              color="#6435c9"
              style={{
                position: 'absolute',
                right: 10,
                top: 20,
              }}
              animating={this.state.loaded} />}
          </View>
          <Text style={styles.searchHeader}>搜索历史</Text>
          <ListView 
          dataSource= { Source.cloneWithRows(this.state.searchHistory)}
          renderRow={this.renderSearchHistoryList.bind(this)}
          enableEmptySections={true}
           />
      
        </View>
	    );
	}
}

 const Search = StackNavigator({
  Home: { screen: SearchNavigator },
  SearchResult: { screen: SearchResult },
  Detail: { screen: MovieDetail },
});


export { Search as default };