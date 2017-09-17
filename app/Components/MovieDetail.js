/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import styles from '../Styles/main';
 import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';  

 import {
 	ActivityIndicator,
 	TouchableHighlight,
 	Text,
 	View,
 	ListView,
 	Image,
 	ScrollView,
 } from 'react-native';

 class MovieDetail extends Component{
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

 	constructor(props) {
 		super(props);
 		const { params } = this.props.navigation.state;

 		this.state = {
 			movieDetail: '',
 			loaded: false,
 		};

 		const REQUEST_URL = `https://api.douban.com/v2/movie/subject/${ params.movie.id }`;

 		this.fetchData(REQUEST_URL);
 	}

	fetchData(REQUEST_URL) { //从服务器中获取数据
		fetch(REQUEST_URL)
		.then(response => response.json())
		.then(responseData =>{
			this.setState({
				movieDetail: responseData,
				loaded: true,
			});
		})
		.done();
	}


	render() {
		const { params } = this.props.navigation.state;

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

			let movie=this.state.movieDetail;
			let summary=movie.summary.split(/\n/).map(function(p,index){
				return(
				<View style={{marginBottom:15,paddingLeft:6,paddingRight:6}} key={index} >
					<Text style={styles.itemText}>
					{p}
					</Text>
				</View>
				)
			});

			if(movie.summary !== '' ){
				return(
				<View style={styles.container}>
					<ScrollView>
						{summary}
					</ScrollView>
				</View>
				);
			} 
			else{
				return (
					<View  style={styles.TextContainer}>
						<Text style={styles.CenterText}>
							不好意思，该电影仍然没有最新的电影介绍！
						</Text>
					</View>
				)
			}

		}
	}

	export { MovieDetail as default }; 
