import * as React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Settings } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "../Context/AuthContext";

import styles from '../assets/stylesCustom';

import Test from '../components/Test';
import { Profil } from "../components/Profil/Profil";
import { Prestation } from "../components/Prestations/Prestation";
import { Guide } from '../components/Profil/Guide';
import { Favoris } from '../components/Profil/Favoris';
import { SettingsProfil } from '../components/Profil/SettingsProfil';
import { ContactUs } from '../components/Profil/ContactUs';
import { SettingsStackScreen } from './NavigationSettings';
import { Account } from '../components/Profil/Account';


const NavigationProfil = ({ navigation }) => {
    const { signOut } = React.useContext(AuthContext);
    return (

        <View style={styles.container}>
            <View>
                <TouchableOpacity
                    style={styles.profilStack}
                    onPress={() => navigation.navigate('Profil')}
                    
                >
                    <Text style={styles.title}>Profil</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profilStack}
                    onPress={() => navigation.navigate('Guide')}
                >
                    <Text style={styles.title}>Guide MyCouturier</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profilStack}
                    onPress={() => navigation.navigate('SettingsAccount')}
                >
                    <Text style={styles.title}>Paramètres du compte</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profilStack}
                    onPress={() => navigation.navigate('Favoris')}
                >
                    <Text style={styles.title}>Mes favoris</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profilStack}
                    onPress={() => navigation.navigate('ContactUs')}
                >
                    <Text style={styles.title}>Nous contacter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.profilStack}
                    onPress={signOut}
                >
                    <Text style={styles.title}>Déconnexion</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
};

const ProfilStack = createStackNavigator();
export const ProfilStackScreen = () => {
    return (
        <ProfilStack.Navigator>
            <ProfilStack.Screen
                name='NavigationProfil'
                component={NavigationProfil}
                options={{
                    title: ' ',
                    headerShown: false,
                }}
            />
            <ProfilStack.Screen
                name='Profil'
                component={Profil}
                options={{
                    title: 'Profil',
                    headerShown: false,
                }}
            />
            <ProfilStack.Screen
                name='Guide'
                component={Guide}
                options={{
                    title: 'Guide MyCouturier'
                }}
            />
            <ProfilStack.Screen
                name='Favoris'
                component={Favoris}
                options={{
                    title: 'Mes favoris'
                }}
            />
            <ProfilStack.Screen
                name='SettingsAccount'
                component={Account}
                options={{
                    title: 'Paramètres'
                }}
            />
            <ProfilStack.Screen
                name='ContactUs'
                component={ContactUs}
                options={{
                    title: 'Nous contacter'
                }}
            />
            <ProfilStack.Screen
                name='Test'
                component={Test}
            />
        </ProfilStack.Navigator>
    )
};