import * as React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, AsyncStorage } from "react-native";
import { styles, main, btn, text, widthTall, flexTall } from '../../assets/stylesCustom';
import { ConstEnv } from "../tools/ConstEnv";
import { Success } from '../tools/Success';
import { Error } from '../tools/Error';
import { AuthContext } from '../../Context/AuthContext';


export const ContactUs = () => {

    React.useEffect(() => {
        const bootData = async () => {
            setApitoken(await AsyncStorage.getItem('userToken'))
        };
        bootData();
    })

    const [apitoken, setApitoken] = React.useState()
    const [sujet, setSujet] = React.useState();
    const [content, setContent] = React.useState();
    const [response, setResponse]= React.useState();

    const { signOut } = React.useContext(AuthContext);


    const _sendContactUs = () => {
        if (sujet && content) {
            let data = {
                subject: sujet,
                content: content,
            };
    
            fetch(ConstEnv.host + ConstEnv.contactUsCreate, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': apitoken,
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.error === 'invalid credentials') {
                        signOut()
                    }
                    if (!responseJson.error) {
                        setResponse(<Success message={responseJson.message} />)
                    } else {
                        setResponse(<Error message={responseJson.message} />)
                    }
                })
        } else {
            setResponse(<Error message={'champs vide'} />)
        }
        
    }

    return (
        <View style={main.page}>
            <View style={flexTall.flex8, {alignItems:'center'}}>
                <View style={widthTall.width08}>
                    <TextInput
                        style={styles.input}
                        placeholder='Nature du problème'
                        onChangeText={setSujet}
                        defaultValue={sujet}
                    />
                    <TextInput
                        // maxLength={40}
                        multiline={true}
                        numberOfLines={6}
                        style={styles.input}
                        placeholder='Expliquer votre problème'
                        onChangeText={setContent}
                        defaultValue={content}
                    />
                    <TouchableOpacity
                        style={btn.primaire}
                        onPress={() => _sendContactUs({ sujet, content })}
                    >
                        <Text style={text.btnPrimaire}>Envoyer</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={flexTall.flex4}>
                {response}
            </View>
        </View>
    );
}