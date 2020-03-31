import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { main, styles, btn, widthTall, text, flexTall } from '../../assets/stylesCustom';
import { TextInput } from 'react-native-gesture-handler';
import { Error } from '../tools/Error';
import { ConstEnv } from '../tools/ConstEnv';

export const PasswordForgotten = ({ navigation }) => {

    const [email, setEmail] = React.useState();
    const [response, setResponse] = React.useState();

    const sendPasswordForgotten = () => {
        if (email) {
            if (email.repeat(1).length > 0 && toString(email) && email.includes('@')) {
                console.log(ConstEnv.host + ConstEnv.passwordForgotten + '/' + email)
                fetch(ConstEnv.host + ConstEnv.passwordForgotten + '/' + email)
                    .then((response) => { response.json() })
                    .then((responseJson) => {
                        console.log(responseJson)
                        if (!response.error) {
                            setResponse(<Success message={responseJson.message} />)
                        } else {
                            setResponse(<Error message={responseJson.message} />)
                        }
                    })
            } else {
                setResponse(<Error message={'Adresse email non valide.'} />)
            }
        } else {
            setResponse(<Error message={'Champs vide.'} />)
        }
    }

    return (
        <KeyboardAvoidingView style={main.page} keyboardVerticalOffset={20} enabled>
            <View style={flexTall.flex1}></View>
            <View style={flexTall.flex1}>
                <Text style={text.h1}>MyCouturier</Text>
            </View>
            <View style={flexTall.flex1}>
                <View style={widthTall.width08}>
                    {response}
                </View>
            </View>
            <View style={flexTall.flex2}>
                <View style={widthTall.width08}>
                    <TextInput
                        style={styles.input}
                        placeholder="Adresse email"
                        onChangeText={setEmail}
                        defaultValue={email}
                    />
                    <TouchableOpacity style={btn.primaire} onPress={() => sendPasswordForgotten()} >
                        <Text style={text.btnPrimaire}>Envoyer</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={flexTall.flex3}>
                <Text style={text.sizeLarge}>Mot de passe oubliée?</Text>
                <Text style={text.sizeMedium}>
                    Entré l'adresse email de votre compte pour générer un nouveau mot de passe qui vous sera envoyé dans votre boîte email.
                </Text>
            </View>
            <View style={flexTall.flex1}>
                <TouchableOpacity
                    style={btn.secondaire}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={text.btnSecondaire}>connexion</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}