import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, ActivityIndicator } from "react-native";
import { styles, main, text, flexTall, flexDirection } from '../../assets/stylesCustom';
import { AuthContext } from '../../Context/AuthContext';
import { ConstEnv } from '../tools/ConstEnv';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

export const Guide = ({ navigation, route }) => {

    useEffect(() => {
        const bootdata = async () => {
            let token = await AsyncStorage.getItem('userToken');
            setApitoken(token);
            loadGude(token)
        };
        bootdata();
    }, [])

    const [apitoken, setApitoken] = useState();
    const [guide, setGuide] = useState();
    const { signOut } = useContext(AuthContext);

    const loadGude = (apitoken) => {
        fetch(ConstEnv.host + ConstEnv.guide, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': apitoken,
            },
        }).then(response => response.json())
            .then(responseJson => {
                if (responseJson.error === 'invalid credentials') {
                    signOut()
                } if (!responseJson.error) {
                    setGuide(JSON.parse(responseJson.guide));
                }
            })
    }

    let listGuideView = <ActivityIndicator />;
    if (guide) {
        listGuideView = guide.map((item, i) => {
            return (
                <TouchableHighlight
                    onPress={() => navigation.navigate('GuideResponse', { "response": item.response })}
                    key={i}
                    underlayColor={'#F5B30F'}
                    style={main.tile}
                >
                    <View style={flexDirection.rowBetween}>
                        <Text style={{ fontSize: 16, flex: 8 }}>{item.question}</Text>
                        <AntDesign style={flexTall.flex1} name="arrowright" size={24} color="black" />
                    </View>
                </TouchableHighlight>
            )
        })
    }

    return (
        <ScrollView style={main.scroll}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
                {listGuideView}
            </View>
        </ScrollView>
    );
}