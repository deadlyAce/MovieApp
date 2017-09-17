/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styles from '../Styles/main';
import MovieDetail from './MovieDetail';
import Featured from './Featured';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';  

import {
  ActivityIndicator,
  TouchableHighlight,
  Text,
  View,
  ListView,
  Image,
} from 'react-native';


class MovieList extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      movies: [],
      loaded: false,
      count: 20,
      start: 0,
      total: 0,
    };

    this.dataSource = new ListView.DataSource({
        rowHasChanged: (row1,row2) => row1 !== row2
      })

    this.REQUEST_URL = 'https://api.douban.com/v2/movie/top250'

    this.fetchData();
  }

  requestURL(
    url = this.REQUEST_URL,
    count = this.state.count,
    start = this.state.start
  ){
    return(
      `${url}?count=${count}&start=${start}`
    )
  }


  fetchData() { //从服务器中获取数据
    fetch(this.requestURL())
      .then(response => response.json())
      .then(responseData =>{
        let newStart=responseData.start+responseData.count;
          this.setState({
            movies: responseData.subjects,
            loaded: true,
            total:responseData.total,
            start:newStart
          });
      })
      .done();
  }

  showMovieDetail(movie){
    this.props.Navi('Detail',{title: movie.title, movie: movie});
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
    if(!this.state.loaded){
      return (
        <View style={styles.container}>
          <View style={styles.loading}>
            <ActivityIndicator
              style={[styles.centering, {height: 80}]}
              color= '#6435c9'
              size="large"
            />
            <Text>加载中。。。</Text>
          </View>
        </View>
      )
    }
    return (
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


export { MovieList as default };
