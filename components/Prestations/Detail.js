import * as React from 'react';
import { View, Text, ActivityIndicator, ScrollView, AsyncStorage, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { styles, main, flexDirection, btn, text, input, flexTall } from '../../assets/stylesCustom';
import { ConstEnv } from '../tools/ConstEnv';
import { AuthContext } from '../../Context/AuthContext';
import { MessageUser } from '../tools/MessageUser';
import { MessageContact } from '../tools/MessageContact';


export const Detail = ({ navigation, route }) => {

    React.useEffect(() => {
        const bootData = async () => {
            let apitokenData = await AsyncStorage.getItem('userToken');
            setApitoken(apitokenData);
            let usernameAsyncStorage = await AsyncStorage.getItem('username');
            setUsername(usernameAsyncStorage)
            fetch(ConstEnv.host + ConstEnv.prestation + route.params.prestation.id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': apitokenData,
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.error === 'invalid credentials') {
                        signOut()
                    }
                    if (!responseJson.error) {
                        setIsloading(true);
                        setPrestation(responseJson.prestation)

                    }
                })
                .catch(error => {
                    console.error(error);
                });
        };
        bootData();
    }, [])


    const [apitoken, setApitoken] = React.useState();
    const [isLoading, setIsloading] = React.useState();
    const [username, setUsername] = React.useState();
    const [prestation, setPrestation] = React.useState(route.params.prestation);
    const [message, setMessage] = React.useState();
    const [confirmCode, setConfirmCode] = React.useState();

    const { signOut } = React.useContext(AuthContext);
    let countMessage = prestation.message && Object.keys(prestation.message).length;

    const sendAcceptPrestation = (elem) => {
        fetch(ConstEnv.host + ConstEnv.prestation + '/accept', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': apitoken,
            },
            body: JSON.stringify({
                'accept': elem,
                'id': prestation.id
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error === 'invalid credentials') {
                    signOut()
                }
                if (responseJson.length > 0) {

                } else {

                }
            });
    };

    const sendMessage = () => {
        if (message.length > 0) {
            setMessage(undefined)
            fetch(ConstEnv.host + ConstEnv.message, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': apitoken,
                },
                body: JSON.stringify({
                    "message": message,
                    "prestation": prestation.id
                })
            })
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.error === 'invalid credentials') {
                        signOut()
                    }
                    if (!responseJson.error) {
                        navigation.push('PrestationDetail', { prestation: prestation.id });
                    }

                })
        }
    }

    const getCodeConfirm = () => {
        console.log('start get codeConfirm')
        fetch(ConstEnv.host + ConstEnv.confirmCode, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': apitokenData,
            },
        })
        .then(response=>response.json())
        .then(responseJson=>{
            console.log(responseJson);
            if (responseJson.error === 'invalid credentials') {
                signOut()
            }if (!responseJson.error) {
                setConfirmCode(responseJson.code)
            }
        })

    }
    const sendCodeConfirm = () => {
        console.log('start blabla')
    }


    if (isLoading) {
        if (prestation.state === 'active') {
            return (
                <View style={main.page}>
                    <View style={{ flexDirection: 'row', flex: 2, backgroundColor: "#E5E5E5" }}>
                        <View style={flexTall.flex1}></View>
                        <View style={flexTall.flex8}>
                            <Text style={text.sizeMedium}>Détail prestation:</Text>
                            <View style={{ flexWrap: 'wrap', flexDirection: "row" }}>

                                {
                                    username !== prestation.couturier && <Text>     Couturier: {prestation.couturier} </Text>
                                }{
                                    username !== prestation.client && <Text>    Couturier: {prestation.couturier} </Text>
                                }
                                <Text>Délai: {prestation.deadline !== null ? prestation.deadline : 'non indiqué'} </Text>
                                <Text>Outil: {prestation.tool !== null ? prestation.tool : 'non indiqué'} </Text>
                                <Text>Description: {prestation.description !== null ? prestation.description : 'aucune'} </Text>
                                {
                                    username === prestation.couturier && <Text>Prix: {prestation.priceCouturier}<FontAwesome style={flexTall.flex1} size={16} name='euro' /></Text>
                                }
                                {
                                    username === prestation.client && <Text>Prix: {prestation.priceShow}<FontAwesome style={flexTall.flex1} size={16} name='euro' /></Text>
                                }

                            </View>
                        </View>
                        {/* ACCEPT */}
                        {
                            username === prestation.couturier && prestation.accept !== true &&
                            <View style={flexDirection.row}>
                                <TouchableOpacity
                                    style={btn.decline}
                                    onPress={() => { sendAcceptPrestation(false) }}
                                ><Text style={text.btnPrimaire}>Décliner</Text></TouchableOpacity>
                                <TouchableOpacity
                                    style={btn.accept}
                                    onPress={() => { sendAcceptPrestation(true) }}
                                ><Text style={text.btnPrimaire}>Accepter</Text></TouchableOpacity>
                            </View>
                        }
                        {/* PAYMENT */}
                        {
                            username === prestation.client && prestation.accept === true && prestation.pay !== true &&
                            <View style={flexDirection.row}>
                                <TouchableOpacity
                                    style={btn.primaire}
                                    onPress={() => navigation.navigate('PaymentForm', { prestation: prestation })}
                                ><Text style={text.btnPrimaire}>Payer</Text></TouchableOpacity>

                            </View>
                        }
                    </View>
                    {/* MESSAGES */}
                    {
                        ((prestation.accept === true && prestation.pay === true) || prestation.message.length > 0) &&
                        <View style={{ flex: 8, marginTop: 5 }}>
                            <View style={flexDirection.justRow}>
                                <View style={flexTall.flex1}></View>
                                <View style={flexTall.flex12}>
                                    <FlatList
                                        keyExtractor={item => item.id}
                                        initialScrollIndex={countMessage - 1}
                                        data={prestation.message}
                                        renderItem={({ item, i, separators }) => (
                                            <View style={{ minHeight: 48 }} key={i}>
                                                {
                                                    username === item.username &&
                                                    <MessageUser message={item.message} date={item.editedDate} imageProfil={item.imageProfil} />
                                                }
                                                {
                                                    username !== item.username &&
                                                    <MessageContact message={item.message} date={item.editedDate} imageProfil={item.imageProfil} />
                                                }

                                            </View>
                                        )}
                                    />

                                </View>
                                <View style={flexTall.flex1}></View>
                            </View>
                        </View>
                    }{
                        <View style={{ flexDirection: 'row', flex: 2, backgroundColor: "#E5E5E5" }}>
                            <View style={flexTall.flex1}></View>
                            <View style={flexTall.flex8}>
                                {
                                    prestation.accept === true && prestation.pay === true && prestation.state === "active" &&
                                    <View style={flexDirection.justRow}>
                                        <View style={flexTall.flex6}>

                                            <TextInput
                                                multiline={true}
                                                numberOfLines={2}
                                                style={input.message}
                                                placeholder='Message...'
                                                onChangeText={setMessage}
                                                defaultValue={message}
                                            />
                                        </View>
                                        <View style={{ flex: 2, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={flexTall.flex1}>
                                                {
                                                    username === prestation.client &&
                                                    <AntDesign
                                                        onPress={() => getCodeConfirm()}
                                                        name="scan1" size={24} color="black"
                                                    />
                                                }
                                                {
                                                    username === prestation.couturier &&
                                                    <FontAwesome
                                                        onPress={() => senCodeConfirm()}
                                                        name="qrcode" size={24} color="black"
                                                    />
                                                }
                                            </View>
                                            <View style={flexTall.flex1}><AntDesign onPress={() => sendMessage()} name="rightcircleo" size={28} color="black" /></View>
                                        </View>
                                    </View>
                                }
                            </View>
                            <View style={flexTall.flex1}></View>
                        </View>
                    }
                </View >
            )
        }
    }

    return (
        <ScrollView style={main.scroll}>
            <ActivityIndicator />
        </ScrollView>
    )

}
