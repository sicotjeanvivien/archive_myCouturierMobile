import * as React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator } from "react-native";
import { main, styles, input, btn, text } from "../../assets/stylesCustom";


import { Error } from '../tools/Error';
import { Success } from '../tools/Success';
import { AuthContext } from '../../Context/AuthContext';
import { ConstEnv } from '../tools/ConstEnv';

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
    const [cardNumber, setCardNumber] = React.useState();
    const [cardExpirationDate, setCardExpirationDate] = React.useState('');
    const [CVX, setCVX] = React.useState('');
    const [showBtn, setShowBtn] = React.useState(true)

    const sendCardInfo = () => {
        if (cardNumber !== undefined && cardExpirationDate !== undefined && CVX !== undefined) {
            setShowBtn(false)
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
                        let tokenCard = responseJson.token;
                        fetch(responseJson.token.CardRegistrationURL, {
                            method: 'POST',
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                            body: data,
                            redirect: 'follow'
                        })
                            .then(response => response.text())
                            .then(result => {
                                if (!result.includes("errorCode") && result.includes("data")) {
                                    fetch(ConstEnv.host + ConstEnv.createToken, {
                                        method: 'PUT',
                                        headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-AUTH-TOKEN': apitoken, },
                                        body: JSON.stringify({
                                            RegistrationData: result,
                                            CardRegId: tokenCard.Id,
                                            saveCard: true,
                                        })
                                    })
                                        .then((response) => response.json())
                                        .then((responseJson) => {
                                            if (responseJson.error === 'invalid credentials') {
                                                signOut();
                                            }
                                            if (!responseJson.error) {
                                                navigation.goBack();
                                            }
                                        })
                                } else {
                                    setErrorResponse(<Error message={result} />);
                                    setShowBtn(true);
                                }
                            })
                            .catch(error => console.log('error', error));
                    }

                })
        }
    }

    return (
        <View style={main.page}>
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
            <View style={styles.blocCenter}>
                {showBtn === true ?
                    <TouchableOpacity
                        style={btn.primaire}
                        onPress={() => {
                            sendCardInfo();

                        }}
                    >
                        <Text style={text.btnPrimaire}>Ajouter</Text>
                    </TouchableOpacity>
                    : <ActivityIndicator />
                }
            </View>
            {errorResponse}
        </View>
    )
}