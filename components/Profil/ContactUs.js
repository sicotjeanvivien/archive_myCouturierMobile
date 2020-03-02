import * as React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, AsyncStorage } from "react-native";
import styles from '../../assets/stylesCustom';
import { ConstEnv } from "../../ConstEnv";


export const ContactUs = () => {
    const [sujet, setSujet] = React.useState('');
    const [content, setContent] = React.useState('');
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Nature du problème'
                onChangeText={setSujet}
                value={sujet}
            />
            <TextInput
                // maxLength={40}
                multiline={true}
                numberOfLines={4}
                style={styles.input}
                placeholder='Expliquer votre problème'
                onChangeText={setContent}
                value={content}
            />
            <TouchableOpacity
                onPress={() => _sendContactUs({ sujet, content })}
            >
                <Text style={styles.btnSignUp}>Envoyer</Text>
            </TouchableOpacity>
        </View>
    );
}

const _sendContactUs = (elem) => {

    let data = {
        // userApp: AsyncStorage.getItem('user'),
        sujet: elem.sujet,
        content: elem.content,
    };
    let header = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    fetch(ConstEnv.host+ConstEnv.contactUs, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.token) {
                setUserToken(responseJson.token);
                AsyncStorage.setItem('userToken', responseJson.token)
            } else {
                alert(responseJson.error)
            }
        })
        .catch((error) => {
            console.error(error);
        });
}