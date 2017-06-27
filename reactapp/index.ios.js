/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Picker
} from 'react-native';

import {Button,FormLabel, FormInput } from 'react-native-elements';

import { StackNavigator } from 'react-navigation';

export default class reactapp extends Component {
   constructor(props) {
    super(props);
    this.state = { language:'java' };

  }
  render() {
    return (
      <View style={styles.container}>
        
        <Text style={styles.welcome}>
           拼车搜索
        </Text>
        
        <FormLabel>出发地</FormLabel>
<FormInput></FormInput>

<FormLabel>目的地</FormLabel>
<FormInput/>


        <Button title='搜索'></Button>

      </View>
    );
  }
}

const app = StackNavigator({
  Home: { screen: reactapp },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
 

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('reactapp', () => app);
