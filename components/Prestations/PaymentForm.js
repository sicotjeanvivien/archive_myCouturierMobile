import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, AsyncStorage, Picker, Modal, TouchableHighlight } from "react-native";
import { main, styles, input, btn, text, flexDirection, modal } from "../../assets/stylesCustom";
import { Ionicons, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import { Error } from '../tools/Error';
import { Success } from '../tools/Success';
import { AuthContext } from '../../Context/AuthContext';
import { ConstEnv } from '../tools/ConstEnv';


export const PaymentForm = ({ navigation, route }) => {

    const { signOut } = React.useContext(AuthContext);
    const [apitoken, setApitoken] = useState();
    const [cardList, setCardList] = useState();
    const [cardSelect, setCardSelect] = useState();
    const [prestation, setPrestation] = React.useState(route.params.prestation);
    const [errorResponse, setErrorResponse] = React.useState();

    React.useEffect(() => {
        const bootdata = async () => {
            let apitokenAsync = await AsyncStorage.getItem('userToken');
            setApitoken(apitokenAsync);
            fetch(ConstEnv.host + ConstEnv.listCard, {
                method: "GET",
                headers: {
                    'X-AUTH-TOKEN': apitokenAsync,
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.error === 'invalid credentials') {
                        signOut()
                    }
                    if (!responseJson.Error) {
                        setCardList(responseJson.listCard)
                    }
                })
        };
        bootdata();
    }, []);

    const cardSelected = (item) => {
        setCardSelect(item.Id);
    }

    const sendPayInCardDirect = () => {
        if (cardSelect !== undefined) {
            let data = {
                prestation: prestation.id,
                cardId: cardSelect
            }
            fetch(ConstEnv.host + ConstEnv.payInCardDirect, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': apitoken,
                },
                body: JSON.stringify(data)
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.error === 'invalid credentials') {
                        signOut();
                    }
                    if (!responseJson.error) {
                        navigation.push('PrestationDetail', { prestation: responseJson.prestation })
                    } else {
                        setErrorResponse(<Error message={responseJson.message} />)
                    }
                })
        } else {
            setErrorResponse(<Error message={'aucune carte selectionné'} />)
        }

    }

    let cardListRenderView = <Text>aucune</Text>
    if (cardList) {
        cardListRenderView = cardList.map((item, i) => {
            return (
                <View key={i} style={cardSelect === item.Id ? main.tileCardSelect : main.tileCard}>
                    <TouchableOpacity
                        onPress={() => cardSelected(item)}
                    >
                        <View style={flexDirection.rowBetween}>
                            <Text style={text.sizeSmall}>{item.CardType}</Text>
                            <Text style={text.sizeSmall}>date d'expiration: {item.ExpirationDate}</Text>

                        </View>
                        <Text style={text.sizeSmall}>Numéro de carte: {item.Alias}</Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    return (
        <ScrollView style={main.scroll}>
            <View style={{ marginBottom: 36 }}>
                <View style={main.tile} >
                    <Text style={text.sizeMedium}>Selectionner une carte: </Text>
                    {cardListRenderView}
                    <View style={flexDirection.rowEnd}>
                        <TouchableOpacity
                            style={btn.primaire}
                            onPress={() => navigation.navigate('CardRegistrationForm')}
                        >
                            <Text style={text.sizeSmall} >Ajouter une carte</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={main.tile}>
                    <Text style={text.sizeMedium}>Résumé: </Text>
                    <View style={flexDirection.rowBetween}>
                        <Text style={text.sizeSmall}>Prix prestation: </Text>
                        <View>
                            <Text style={text.sizeSmall}>{prestation.priceCouturier}</Text>
                            <FontAwesome style={flexTall.flex1} size={16} name='euro' />
                        </View>
                    </View>
                    <View style={flexDirection.rowBetween}>
                        <Text style={text.sizeSmall}>Frais: </Text>
                        <View>
                            <Text style={text.sizeSmall}>{prestation.priceShow - prestation.priceCouturier}</Text>
                            <FontAwesome style={flexTall.flex1} size={16} name='euro' />
                        </View>
                    </View>
                    <View style={flexDirection.rowBetween}>
                        <Text style={text.sizeSmall}>Total: </Text>
                        <View>
                            <Text style={text.sizeSmall}>{prestation.priceShow}</Text>
                            <FontAwesome style={flexTall.flex1} size={16} name='euro' />
                        </View>


                    </View>
                </View>
                <View style={styles.blocCenter}>
                    {errorResponse}
                    <TouchableOpacity
                        style={btn.primaire}
                        onPress={() => sendPayInCardDirect()}
                    >
                        <Text style={text.btnPrimaire}>Comfirmer payment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

