import * as React from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, AsyncStorage, KeyboardAvoidingView } from "react-native";
import { AuthContext } from '../Context/AuthContext';
import { styles, main, flexTall, btn, text, widthTall, flexDirection, positions } from '../assets/stylesCustom'
import { ConstEnv } from "./tools/ConstEnv";
import { Error } from "./tools/Error";

export const Login = ({ navigation }) => {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [response, setResponse] = React.useState();

    const { signInContext, signOut } = React.useContext(AuthContext);


    const _signIn = (elem) => {
        if (elem.email && elem.password) {
            let data = {
                "security": {
                    "email": elem.email,
                    "password": elem.password
                }
            };
            let header = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            };

            fetch(ConstEnv.host + ConstEnv.signIn, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.apitoken) {
                        AsyncStorage.setItem('data', responseJson);
                        AsyncStorage.setItem('userToken', responseJson.apitoken);
                        AsyncStorage.setItem('activeCouturier', responseJson.activeCouturier);
                        AsyncStorage.setItem('firstname', responseJson.firstname);
                        AsyncStorage.setItem('lastname', responseJson.lastname);
                        AsyncStorage.setItem('username', responseJson.username);
                        AsyncStorage.setItem('email', responseJson.email);
                        AsyncStorage.setItem('id', responseJson.id);
                        AsyncStorage.setItem('privateMode', responseJson.privateMode);
                        responseJson.imageProfil !== null && AsyncStorage.setItem('imageProfil', responseJson.imageProfil); //todoo
                        AsyncStorage.setItem('bio', responseJson.bio);
                        signInContext(responseJson.apitoken);
                    } else {
                        setResponse(<Error message={responseJson.error} />);
                        signOut()
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

        } else {
            setResponse(<Error message={'champs vides'} />);
        }
    }

    return (
        <View style={main.page} >
            <View style={flexTall.flex1}></View>
            <View style={flexTall.flex2}>
                <Text style={text.h1}>MyCouturier</Text>
            </View>
            <KeyboardAvoidingView style={flexTall.flex4, { alignItems: 'center' }} behavior='position' enabled>
                <View style={widthTall.width08}>
                    <TextInput
                        style={styles.input}
                        placeholder="Adresse email"
                        onChangeText={setEmail}
                        value={email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={btn.primaire}
                        onPress={() => _signIn({ email, password })}
                    >
                        <Text style={text.btnPrimaire}>Connexion</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            <View style={flexTall.flex2, { alignItems: 'center' }}>
                <View style={widthTall.width08}>
                    {response}
                </View>
            </View>
            <View style={flexTall.flex1}>
                <TouchableOpacity
                    style={btn.secondaire}
                    onPress={() => navigation.navigate('SignUp', { screen: 'SignUp' })}
                >
                    <Text style={text.btnSecondaire}>Inscription</Text>
                </TouchableOpacity>
            </View>

            <View style={flexTall.flex1}></View>
            <View style={flexTall.flex1}>
                <View style={flexDirection.row}>
                    <TouchableOpacity
                        style={btn.secondaire}
                        onPress={() => navigation.navigate('passwordForgotten')}>
                        <Text style={text.btnTertiaire}>mot de passe oublié?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={btn.secondaire}
                        onPress={() => navigation.navigate('cgv')}>
                        <Text style={text.btnTertiaire}>CGU</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


