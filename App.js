import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import NavigationSignin from './Navigation/NavigationSignin';
const Stack = createStackNavigator();

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      host: {
        host: '',
        api_token: '',
      },


    }
  };
  render() {
    return (
        <NavigationSignin />

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(119,136,153, 40)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
