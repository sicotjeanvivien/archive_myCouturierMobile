import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput, TouchableOpacity, AsyncStorage, KeyboardAvoidingView, ScrollView } from 'react-native';
import { styles, main, widthTall, flexTall, text, btn } from '../assets/stylesCustom';
import { AuthContext } from '../Context/AuthContext';
import { ConstEnv } from './tools/ConstEnv';
import { Error } from './tools/Error';
import { Success } from './tools/Success';



export const SingUp = ({ navigation }) => {
    const [userToken, setUsertoken] = React.useState('');
    const [username, setUername] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [response, setResponse] = React.useState();

    const { signUpContext } = React.useContext(AuthContext);

    const _signupSend = () => {
        let data = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            passwordConfirm: '',
            email: '',
        }

        let errorData = {
            firstname: {
                error: false,
                text: 'Valeur non valide'
            },
            lastname: {
                error: false,
                text: 'Valeur non valide'
            },
            username: {
                error: false,
                text: 'Valeur non valide'
            },
            password: {
                error: false,
                text: 'Valeur non valide (8 caratères minimun)'
            },
            passwordConfirm: {
                error: false,
                text: 'Valeur non valide (8 caratères minimun)'
            },
            email: {
                error: false,
                text: 'Adresse email non valide'
            },
        };

        firstname.repeat(1).length > 0 && toString(firstname)
            ? data.firstname = firstname : errorData.firstname.error = true;

        lastname.repeat(1).length > 0 && toString(lastname)
            ? data.lastname = lastname : errorData.lastname.error = true;

        username.repeat(1).length > 0 && toString(username)
            ? data.username = username : errorData.username.error = true;

        email.repeat(1).length > 0 && toString(email) && email.includes('@')
            ? data.email = email : errorData.email.error = true;

        if (password.repeat(1).length > 7
            && passwordConfirm.repeat(1).length > 7
            && toString(password)
            && toString(passwordConfirm)
            && password === passwordConfirm
        ) {
            data.password = password;
            data.passwordConfirm = passwordConfirm;
        } else {
            errorData.password.error = true;
            errorData.passwordConfirm.error = true;
        }
        let errors = JSON.stringify(errorData);


        if (!errors.includes("true")) {
            fetch(ConstEnv.host + ConstEnv.signUp, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.error) {
                        setResponse(<Error message={responseJson.message} />);
                    } else {
                        setResponse(<Success message={responseJson.message} />);
                        const userApp = JSON.parse(responseJson.user);
                        AsyncStorage.setItem('userToken', userApp.apitoken);
                        AsyncStorage.setItem('username', userApp.username);
                        AsyncStorage.setItem('firstname', userApp.firstname);
                        AsyncStorage.setItem('lastname', userApp.lastname);
                        AsyncStorage.setItem('email', userApp.email);
                        AsyncStorage.setItem('id', userApp.id);
                        AsyncStorage.setItem('privateMode', userApp.privateMode);
                        signUpContext(userApp.apitoken)
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            let message = '';
            for (const key in errorData) {
                if (errorData.hasOwnProperty(key)) {
                    const elem = errorData[key];
                    if (elem.error) {
                        message += elem.text;
                    }
                }
            }
            setResponse(<Error message={message} />);
        }
    }
    return (
        <ScrollView style={main.scroll}>
            <View style={flexTall.flex1}></View>
            <View style={flexTall.flex1}>
                <Text style={text.h1}>MyCouturier</Text>
            </View>
            <KeyboardAvoidingView style={flexTall.flex7} behavior="height" enabled>
                <View style={widthTall.width08, { alignItems: 'center' }}>
                    <View style={{}}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nom d'utilisateur"
                            onChangeText={setUername}
                            defaultValue={username}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nom"
                            onChangeText={setLastname}
                            defaultValue={lastname}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Prénom"
                            onChangeText={setFirstname}
                            defaultValue={firstname}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Adresse email"
                            onChangeText={setEmail}
                            defaultValue={email}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={true}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmer mot de passe"
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity
                            style={btn.primaire}
                            onPress={() => _signupSend()}
                        >
                            <Text style={text.btnPrimaire}>Inscription</Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        {response}
                    </View>
                </View>
            </KeyboardAvoidingView>
            <View style={flexTall.flex1}>
                <TouchableOpacity
                    style={btn.secondaire}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={text.btnSecondaire}>connexion</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    );
}



