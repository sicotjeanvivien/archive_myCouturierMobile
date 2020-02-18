import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (
        <Button
          title="Go to Jane's profile"
          onPress={() => this.props.navigation.navigate('Profile', {name: 'Jane'})}
        />
      );
  }
}
