import * as React from 'react';
import { ScrollView, View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import { main, styles, input, btn, text } from "../../assets/stylesCustom";


import { Error } from '../tools/Error';
import { Success } from '../tools/Success';
import { AuthContext } from '../../Context/AuthContext';
import { ConstEnv } from '../tools/ConstEnv';
import { TextInput } from 'react-native-gesture-handler';

export const CardRegistrationForm = ({ navigation, route }) => {

    React.useEffect(() => {
        const bootData = async () => {
            setApitoken(await AsyncStorage.getItem('userToken'))
        };
        bootData();
    }, [])

    const { signOut } = React.useContext(AuthContext);


    const [apitoken, setApitoken] = React.useState();
    const [errorResponse, setErrorResponse] = React.useState();
    const [tokenCard, setTokenCard] = React.useState(route.params.tokenCard)
    const [cardNumber, setCardNumber] = React.useState();
    const [cardExpirationDate, setCardExpirationDate] = React.useState('');
    const [CVX, setCVX] = React.useState('');

    // console.log(tokenCard);
    const sendCardInfo = () => {
        console.log("start card info")
        // console.log(cardNumber, cardExpirationDate, CVX, tokenCard.CardRegistrationURL, tokenCard.PreregistrationData, tokenCard.AccessKey);
        if (cardNumber !== undefined && cardExpirationDate !== undefined && CVX !== undefined) {

            fetch(ConstEnv.host + ConstEnv.createToken, {
                method: 'GET',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-AUTH-TOKEN': apitoken, },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.error === 'invalid credentials') {
                        signOut()
                    }
                    if (!responseJson.error) {
                        var data = "data=" + responseJson.token.PreregistrationData + "&accessKeyRef=" + responseJson.token.AccessKey + "&returnURL=&cardNumber=" + cardNumber + "&cardExpirationDate=" + cardExpirationDate + "&cardCvx=" + CVX;
                        console.log(data)

                        fetch(responseJson.token.CardRegistrationURL, {
                            method: 'POST',
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                            body: data,
                            redirect: 'follow'
                        })
                            .then(response => response.text())
                            .then(result => console.log(result))
                            .catch(error => console.log('error', error));
                    }

                })
        }
    }

    return (
        <ScrollView style={main.scroll}>

            <View style={main.tile}>
                <TextInput
                    style={input.signUp}
                    keyboardType='number-pad'
                    placeholder='Numéro de carte'
                    onChangeText={setCardNumber}
                    defaultValue={cardNumber}

                />
                <TextInput
                    style={input.signUp}
                    keyboardType='number-pad'
                    placeholder="date d'expiration"
                    onChangeText={setCardExpirationDate}
                    defaultValue={cardExpirationDate}
                />
                <TextInput
                    style={input.signUp}
                    keyboardType='number-pad'
                    placeholder="CVX"
                    onChangeText={setCVX}
                    defaultValue={CVX}
                />
            </View>
            <View style={styles.blocCenter}>
                <TouchableOpacity
                    style={btn.primaire}
                    onPress={() => sendCardInfo()}
                >
                    <Text style={text.btnPrimaire}>payment</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}