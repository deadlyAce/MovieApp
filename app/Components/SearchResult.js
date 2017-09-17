/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from '../Styles/main';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';  
import Search from './Search';

import {
  ActivityIndicator,
  TouchableHighlight,
  Text,
  View,
  ListView,
  Image,
  Button,
} from 'react-native';

class SearchResult extends Component{


  constructor(props) {
    super(props);
  
    this.dataSource = new ListView.DataSource({
        rowHasChanged: (row1,row2) => row1 !== row2
      })

    this.state = {
      movies:this.props.navigation.state.params.result.subjects,
      total:this.props.navigation.state.params.result.total,
      count:3,
      start:this.props.navigation.state.params.result.start,
      query:this.props.navigation.state.params.query
    };

    this.REQUEST_URL = 'https://api.douban.com/v2/movie/search'
  }



  static navigationOptions = ( {navigation} ) => ({
    title: navigation.state.params.title ?  navigation.state.params.title :  navigation.state.params.movie.title ,
    headerTitleStyle: {
      marginLeft: 40,
      color: '#E6E6E6',
      fontSize: 14,
    },
    headerStyle: {
      height: 40, 
      backgroundColor: '#5D529B',
    },
  });


  showMovieDetail(movie){
    this.props.navigation.navigate('Detail',{title: movie.title, movie: movie})
  }

  renderMovieList(movie){

    return(
      <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)"
        onPress={()=> this.showMovieDetail(movie) }>
        <View style={styles.item}>
          <View style={styles.itemImage}>
            <Image 
              source={{uri: movie.images.large}}
              style={styles.image}/>
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemHeader}>{movie.title}</Text>
            <Text style={styles.itemMeta}>
             {movie.original_title} ( {movie.year} )
            </Text>
            <Text style={styles.redText}>
              {movie.rating.average}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }



  requestURL(
    url = this.REQUEST_URL,
    count = this.state.count,
    start = this.state.start,
    query= this.state.query
  ){
    return(
      `${url}?q=${query}&count=${count}&start=${start}`
    )
  }


  loadMore(){
    console.log("load start");
    fetch(this.requestURL())
      .then(response => response.json())
       .then(responseData => {
        let newStart=responseData.start+responseData.count;
          this.setState({
            movies: [...this.state.movies,...responseData.subjects],
            start: newStart,
          });
          console.log("load finish");
       })
      .done();
  }

  onEndReached(){
    console.log("end");
    console.log("totle  "+this.state.total +"  start  "+this.state.start   );
    if(this.state.total > this.state.start){
      this.loadMore();
    }
  }

  renderFooter(){
    if(this.state.total > this.state.start){
      return(
        <View
          style={{
            marginVertical: 10,
            paddingBottom: 10,
            alignSelf: 'center'
          }}
        >
          <ActivityIndicator />
        </View>
      );
    } else {
      return(
        <View
          style={{
            marginVertical: 10,
            paddingBottom: 10,
            alignSelf: 'center'
          }}
        >
          <Text
            style={{
              color: 'rgba(0,0,0,0.3)'
            }}
          >没有可以显示的内容了</Text>
        </View>
      );

    }
  }

	render() {

		return(
      <View style={styles.container}>
        <ListView 
          renderFooter={this.renderFooter.bind(this)}
          pageSize={this.state.count}
          onEndReached={this.onEndReached.bind(this)}
          initialListSize={this.state.count}
          dataSource= {this.dataSource.cloneWithRows(this.state.movies)}
          renderRow={this.renderMovieList.bind(this)}
        />
      </View>
	    );
	}
}


export { SearchResult as default };