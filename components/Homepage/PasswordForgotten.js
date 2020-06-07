import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { main, styles, btn, widthTall, text, flexTall, flexDirection } from '../../assets/stylesCustom';
import { TextInput } from 'react-native-gesture-handler';
import { Error } from '../tools/Error';
import { ConstEnv } from '../tools/ConstEnv';
import { Success } from '../tools/Success';

export const PasswordForgotten = ({ navigation }) => {

    const [email, setEmail] = React.useState();
    const [response, setResponse] = React.useState();
    const [showBtn, setShowBtn] = React.useState(false);

    const sendPasswordForgotten = () => {
        if (email) {
            setShowBtn(true)
            console.log(ConstEnv.host + ConstEnv.passwordForgotten + '/' + email);

            if (email.repeat(1).length > 0 && toString(email) && email.includes('@')) {
                fetch(ConstEnv.host + ConstEnv.passwordForgotten + '/' + email, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(responseJson => {
                        console.log(responseJson);

                        if (!responseJson.error) {
                            setResponse(<Success message={responseJson.message} />);
                            setShowBtn(false);
                        } else {
                            setResponse(<Error message={responseJson.message} />)
                            setShowBtn(false);
                        }
                    })
            } else {
                setResponse(<Error message={'Adresse email non valide.'} />)
            }
        } else {
            setResponse(<Error message={'Champs vide.'} />)
        }
    }
    let sendShow = (<TouchableOpacity style={btn.primaire} onPress={() => sendPasswordForgotten()} >
        <Text style={text.btnPrimaire}>Envoyer</Text>
    </TouchableOpacity>)
    if (showBtn) {
        sendShow = <ActivityIndicator />
    }

    return (
        <ScrollView style={main.scroll}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
                <View style={flexDirection.row}>
                    <View style={flexTall.flex1}></View>
                    <Text style={text.h1}>MyCouturier</Text>
                    <View style={flexTall.flex1}></View>
                </View>
                <View style={flexDirection.row}>
                    <View style={flexTall.flex1}></View>
                    <View style={flexTall.flex8}>
                        <Text style={text.sizeLarge}>Mot de passe oubliée?</Text>
                        <Text style={text.sizeMedium}>
                            Saisissez l'adresse mail liée à votre compte Mycouturier, un nouveau mot de passe vous sera envoyé. (Vous pourrez le modifier dans la configuration de votre profil).
                    </Text>
                    </View>
                    <View style={flexTall.flex1}></View>
                </View>
                <View style={widthTall.width08}>
                    <TextInput
                        style={styles.input}
                        placeholder="Adresse email"
                        onChangeText={setEmail}
                        defaultValue={email}
                    />
                    {sendShow}
                </View>
            </View>
            <View style={flexDirection.row}>
                <View style={flexTall.flex1}></View>
                <View style={flexTall.flex10}>
                    {response}
                </View>
                <View style={flexTall.flex1}></View>
            </View>
            <View style={flexTall.flex1}>
                <TouchableOpacity
                    style={btn.secondaire}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={text.btnSecondaire}>connexion</Text>
                </TouchableOpacity>
            </View>
            {/* </View> */}
        </ScrollView >
    )
}