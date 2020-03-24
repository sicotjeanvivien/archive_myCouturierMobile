import * as React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Settings } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { Account } from '../components/Profil/Account'
import {styles} from '../assets/stylesCustom';

const NavigationSettings = ({ navigation }) => {
    return (
        <View>
            <TouchableOpacity
                style={styles.profilStack}
                onPress={() => navigation.navigate('Account')}
            >
                <Text style={styles.title}>Mon compte</Text>
            </TouchableOpacity>
        </View>
    )
};

const SettingsStack = createStackNavigator();
export const SettingsStackScreen = () => {
    return (
        <SettingsStack.Navigator
            initialRouteName='NavigationSettings'
        >
            <SettingsStack.Screen
                name='NavigationSettings'
                component={NavigationSettings}
                options={{
                    headerShown: false,
                }}
            />
            <SettingsStack.Screen
                name='Account'
                component={Account}
            />
        </SettingsStack.Navigator>
    )
}