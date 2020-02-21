import React, { Component } from 'react';
import { Text, View, Button, AsyncStorage } from 'react-native';
import { AuthContext } from './../Context/AuthContext';

export const Home = () => {

    const { signOut } = React.useContext(AuthContext);

    return (
        <View>
            <Text>Signed in!</Text>
            <Button title="Sign out" onPress={signOut} />
        </View>
    );

}
