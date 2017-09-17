'use strict';
import React from 'react-native';

let {StyleSheet} =React;

let styles = StyleSheet.create({
  delete: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginTop: 10,
    opacity: 0.6,
  },
  searchHeader: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 18,
    marginTop: 30,
    marginLeft: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 99,
    height: 138,
    margin: 6,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    color: 'rgba(0,0,0,0.8)',
    lineHeight:26,
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(100, 53, 201, 0.1)',
    paddingBottom: 6,
    paddingTop: 6,
    flex: 1,
  },
  itemContent: {
    flex: 1,
    marginLeft: 13,
    marginTop: 6,
  },
  itemHeader:{
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    color: '#6435c9',
    marginBottom: 6,
  },
  itemMeta:{
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 6,
  },
  redText: {
    color: '#db2828',
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#eae7ff',
    flexWrap: 'wrap',
  },
  TextContainer: {
    flex: 1,    
    justifyContent: 'center',    
    alignItems: 'center', 
  },
  CenterText: {
    fontSize: 16,    
    textAlign: 'center'   
  },
});


export { styles as default };