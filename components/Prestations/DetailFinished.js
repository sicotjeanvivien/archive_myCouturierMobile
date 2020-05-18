import React, { useEffect } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import { ConstEnv } from '../tools/ConstEnv';
import { main, flexTall, flexDirection, text, FlatList } from '../../assets/stylesCustom';
import { ScrollView } from 'react-native-gesture-handler';
import { MessageUser } from '../tools/MessageUser';
import { MessageContact } from '../tools/MessageContact';

export const DetailFinished = ({ navigation, route }) => {


    useEffect(() => {
        const bootdata = async () => {
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
                    console.log(responseJson.prestation.history);

                    if (responseJson.error === 'invalid credentials') {
                        signOut()
                    }
                    if (!responseJson.error) {
                        setIsloading(true);
                        setPrestation(responseJson.prestation);
                        setMessages(responseJson.prestation.message);
                        setHistory(responseJson.prestation.history);

                    }
                })
                .catch(error => {
                    console.error(error);
                });
        };
        bootdata();
    }, []);

    const [apitoken, setApitoken] = React.useState();
    const [isLoading, setIsloading] = React.useState();
    const [username, setUsername] = React.useState();
    const [prestation, setPrestation] = React.useState();
    const [messages, setMessages] = React.useState();
    const [history, setHistory] = React.useState()

    // console.log(messages);


    let messagesView = <ActivityIndicator />
    if (messages) {
        messagesView = messages.map((item, i) => {
            return (
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
            )
        })
    }
    let historyView = <ActivityIndicator />;
    if (history) {
        historyView = history.map((item, i) => {
            return (
                <View>
                    <Text>Statut: {item.statut}</Text>
                    <Text>Date: {item.date.date}</Text>
                </View>
            )
        })
    }

    return (
        <View style={main.page2}>
            <View style={{ flexDirection: 'row', flex: 2, backgroundColor: "#E5E5E5" }}>
                <View style={flexTall.flex1}></View>
                {prestation &&
                    <View style={flexTall.flex8}>
                        <Text style={text.sizeMedium}>Détail prestation:</Text>
                        <View style={flexDirection.row}>
                            {
                                username !== prestation.couturier && <Text style={flexTall.flex1}>Couturier: {prestation.couturier} </Text>
                            }{
                                username !== prestation.client && <Text style={flexTall.flex1}>Couturier: {prestation.couturier} </Text>
                            }
                        </View>
                        <View style={flexDirection.row}>
                            <Text style={flexTall.flex1}>Délai: {prestation.deadline !== null ? prestation.deadline : 'non indiqué'} </Text>
                            <Text style={flexTall.flex1}>Outil: {prestation.tool !== null ? prestation.tool : 'non indiqué'} </Text>
                        </View>
                        <View style={flexDirection.row}>
                            <Text style={flexTall.flex1}>Description: {prestation.description !== null ? prestation.description : 'aucune'} </Text>
                        </View>
                        <View style={flexDirection.justRowEnd}>
                            {
                                username === prestation.couturier && <Text style={flexTall.flex1}>Prix: {prestation.priceCouturier / 100}<FontAwesome style={flexTall.flex1} size={16} name='euro' /></Text>
                            }
                            {
                                username === prestation.client && <Text style={flexTall.flex1}>Prix: {prestation.priceShow / 100}<FontAwesome style={flexTall.flex1} size={16} name='euro' /></Text>
                            }

                        </View>
                    </View>
                }
                <View style={flexTall.flex1}></View>
            </View>
            <View style={{ flex: 6, marginTop: 5 }}>
                <View style={flexDirection.justRow}>
                    <View style={flexTall.flex1}></View>
                    <View style={flexTall.flex12}>
                        <ScrollView>
                            {messagesView}
                        </ScrollView>
                    </View>
                    <View style={flexTall.flex1}></View>
                </View>
            </View>
            <View style={{ flex: 2, marginTop: 5 }}>
                <View style={{ flex: 12, backgroundColor: "#E5E5E5" }}>
                    <Text style={text.sizeMedium}>Historique:</Text>
                    <View style={flexDirection.row}>
                        <View style={flexTall.flex1}></View>
                        <ScrollView>
                            {historyView}
                        </ScrollView>
                        <View style={flexTall.flex1}></View>
                    </View>
                </View>
            </View>
        </View>
    )
}
