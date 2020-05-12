import * as React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Settings, AsyncStorage, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "../Context/AuthContext";

import { styles, main, flexTall, flexDirection, linkNavigation } from '../assets/stylesCustom';

import Test from '../components/Test';
import { ProfilClient } from "../components/Profil/ProfilClient";
import { Prestation } from "../components/Prestations/Prestation";
import { Guide } from '../components/Profil/Guide';
import { Favoris } from '../components/Profil/Favoris';
import { ContactUs } from '../components/Profil/ContactUs';
import { Account } from '../components/Profil/Account';
import { CGV } from '../components/Homepage/CGV';
import { ProfilCouturier } from '../components/Profil/ProfilCouturier';
import { BecomeCouturier } from '../components/Profil/BecomeCouturier';
const imageProfilDefault = '../assets/default-profile.png';


const NavigationProfil = ({ navigation }) => {

    React.useEffect(() => {
        const bootData = async () => {
            setUsername(await AsyncStorage.getItem('username'));
            setImageProfil(await AsyncStorage.getItem('imageProfil'));
            setActiveCouturier(await AsyncStorage.getItem('activeCouturier'));
        };
        bootData();
    }, [])

    const [imageProfil, setImageProfil] = React.useState();
    const [username, setUsername] = React.useState();
    const [activeCouturier, setActiveCouturier] = React.useState();

    const { signOut } = React.useContext(AuthContext);

    let imgProfilViewRender = <Image resizeMethod="resize" source={require(imageProfilDefault)} style={styles.thumbnail} />;
    if (imageProfil) {
        imgProfilViewRender = <Image resizeMethod="resize" source={{ uri: imageProfil }} style={styles.thumbnail} />
    }

    return (
        <View style={main.page}>
            <View style={flexTall.flex12}>
                <TouchableOpacity
                    style={linkNavigation.profil}
                    onPress={activeCouturier === 'true' ? () => navigation.navigate('ProfilCouturier') : () => navigation.navigate('ProfilClient')}
                >
                    <View style={flexDirection.rowCenter}>
                        {imgProfilViewRender}
                        <Text style={styles.title}>{username}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={linkNavigation.link}
                    onPress={() => navigation.navigate('Guide')}
                >
                    <Text style={styles.title}>Guide MyCouturier</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={linkNavigation.link}
                    onPress={() => navigation.navigate('SettingsAccount')}
                >
                    <Text style={styles.title}>Paramètres du compte</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={linkNavigation.link}
                    onPress={() => navigation.navigate('Favoris')}
                >
                    <Text style={styles.title}>Mes favoris</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={linkNavigation.link}
                    onPress={() => navigation.navigate('ContactUs')}
                >
                    <Text style={styles.title}>Nous contacter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={linkNavigation.link}
                    onPress={() => navigation.navigate('CGV')}
                >
                    <Text style={styles.title}>CGV</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={linkNavigation.link}
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
                name='ProfilClient'
                component={ProfilClient}
                options={{
                    title: 'Profil',
                    headerShown: false,
                }}
            />
            <ProfilStack.Screen
                name='ProfilCouturier'
                component={ProfilCouturier}
                options={{
                    title: 'Profil',
                    headerShown: false,
                }}
            />
            <ProfilStack.Screen
                name='BecomeCouturier'
                component={BecomeCouturier}
                options={{
                    title:'Formulaire pour devenir coutrurier'
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
                name='CGV'
                component={CGV}
            />
            <ProfilStack.Screen
                name='Test'
                component={Test}
            />
        </ProfilStack.Navigator>
    )
};