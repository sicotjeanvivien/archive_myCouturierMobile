import * as React from 'react';
import { AsyncStorage } from 'react-native';


export const ConstEnv = {
    host: 'https://127.0.0.1:8000',
    signIn: '/login_check',
    signUp: '',
    contactUs: '/api/contactUs',
    retouching: '/api/retouching',

};
const _authTokenAsync = async () => {
    let authToken = '';
    try {
        authToken = await AsyncStorage.getItem('userToken');
    } catch (error) {
        // Error retrieving data
    }
    console.log(authToken)
    return authToken
};
// const [authToken, setAuthToken] = React.useState();
// setAuthToken( _authTokenAsync());

console.log()
export const headers = {
    authToken: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': _authTokenAsync(),
    }
};