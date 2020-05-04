import * as React from 'react';
import { View, Text, ActivityIndicator, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import { styles, main, flexDirection, btn, text } from '../../assets/stylesCustom';
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
            fetch(ConstEnv.host + ConstEnv.prestationDetail + route.params.prestation.id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': apitokenData,
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson);
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

    const { signOut } = React.useContext(AuthContext);

    const sendAcceptPrestation = (elem) => {
        console.log(elem)
        fetch(ConstEnv.host + ConstEnv.prestation + '/accept', {
            method: 'PUT',
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
                console.log(responseJson);
                if (responseJson.error === 'invalid credentials') {
                    signOut()
                }
                if (responseJson.length > 0) {

                } else {

                }
            });
    };


    if (isLoading) {
        if (prestation.state === 'active') {
            return (
                <ScrollView style={main.scroll}>
                    <View style={main.tile}>
                        <Text>Détail prestation:</Text>
                        {
                            username !== prestation.couturier && <Text>     Couturier: {prestation.couturier} </Text>
                        }{
                            username !== prestation.client && <Text>    Couturier: {prestation.couturier} </Text>
                        }
                        <Text>Délai: {prestation.deadline !== null ? prestation.deadline : 'non indiqué'} </Text>
                        <Text>Outil: {prestation.tool !== null ? prestation.tool : 'non indiqué'} </Text>
                        <Text>Description: {prestation.description !== null ? prestation.description : 'aucune'} </Text>
                        {
                            username === prestation.couturier && <Text>Prix: {prestation.priceCouturier}</Text>
                        }
                        {
                            username === prestation.client && <Text>Prix: {prestation.priceShow}</Text>
                        }

                    </View>
    {/* ACCEPT */}
                    {
                        username === prestation.couturier && prestation.accept === null &&
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
                        username === prestation.client && prestation.accept === true &&
                        <View style={flexDirection.row}>
                            <TouchableOpacity
                                style={btn.primaire}
                                onPress={() => { navigation.navigate('PaymentForm') }}
                            ><Text style={text.btnPrimaire}>Payer</Text></TouchableOpacity>

                        </View>
                    }
                    {
                        // prestation.accept === true && prestation.pay === true &&
                        <View style={main.tile}>
                            <Text>Messagerie</Text>
                            {
                                (prestation.message).map((key, i) => 
                                        <View>
                                            {
                                                username === key.username &&
                                                <MessageUser key={i} message={key.message} date={key.editedDate} />
                                            }
                                            {
                                                username !== key.username &&
                                                <MessageContact key={i} message={key.message} date={key.editedDate} />
                                            }
                                            {/* < Text key={i}>azea {key.message}</Text> */}
                                        </View>
                                    )
                            }
                        </View>
                    }

                </ScrollView >


            )
        }

    } else {
        if (prestation.state === 'inactive') {
            contentPage =
                <View >
                    <View>
                        <Text></Text>
                    </View>
                    <Text>
                        detail presation 885
                </Text>
                </View>
        }
    }


    return (
        <ScrollView style={main.scroll}>
            <ActivityIndicator />
        </ScrollView>
    )

}
