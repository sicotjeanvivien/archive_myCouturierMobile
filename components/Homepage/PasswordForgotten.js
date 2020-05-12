import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
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
                fetch(ConstEnv.host + ConstEnv.passwordForgotten + '/' + email)
                    .then((response) => { response.json() })
                    .then((responseJson) => {
                        if (!responseJson.error) {
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
        <ScrollView style={main.scroll}>
            <KeyboardAvoidingView style={main.backgroundColor, { alignItems: 'center' }} behavior='height' enabled>
                <View style={flexTall.flex1}></View>
                <View style={flexTall.flex1}>
                    <Text style={text.h1}>MyCouturier</Text>
                </View>
                <View style={flexTall.flex5}>
                    <Text style={text.sizeLarge}>Mot de passe oubliée?</Text>
                    <Text style={text.sizeMedium}>
                        Saisissez l'adresse mail liée à votre compte Mycouturier, un nouveau mot de passe vous sera envoyé. (Vous pourrez le modifier dans la configuration de votre profil).
                    </Text>
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
                <View style={flexTall.flex1}>
                    <View style={widthTall.width08}>
                        {response}
                    </View>
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
        </ScrollView>
    )
}