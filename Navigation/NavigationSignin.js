import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../components/Login';
import SignUp from '../components/SignUp';

const Stack = createStackNavigator();

export default function NavigationSignin() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ title: ''}}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{title: 'Inscription'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
