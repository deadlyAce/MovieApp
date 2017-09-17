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

const REQUEST_URL = 'https://api.douban.com/v2/movie/us_box'


class USBoxList extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      movies: new ListView.DataSource({
        rowHasChanged: (row1,row2) => row1 !== row2
      }),
      loaded: false,
    };

    this.fetchData();
  }

  fetchData() { //从服务器中获取数据
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData =>{
          this.setState({
            movies: this.state.movies.cloneWithRows(responseData.subjects),
            loaded: true
          });
      })
      .done();
  }

  showMovieDetail(movie){
    this.props.Navi('Detail',{title: movie.title, movie: movie.subject});
  }


  renderMovieList(movie){
    return(
      <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)"
        onPress={()=> this.showMovieDetail(movie) }>
        <View style={styles.item}>
          <View style={styles.itemImage}>
            <Image 
              source={{uri: movie.subject.images.large}}
              style={styles.image}/>
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemHeader}>{movie.subject.title}</Text>
            <Text style={styles.itemMeta}>
             {movie.subject.original_title} ( {movie.subject.year} )
            </Text>
            <Text style={styles.redText}>
              {movie.subject.rating.average}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
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
          dataSource= {this.state.movies}
          renderRow={this.renderMovieList.bind(this)}
        />
      </View>
    );
  }
}


export { USBoxList as default };
