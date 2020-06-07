import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, AsyncStorage, TextInput, TouchableOpacity } from 'react-native'
import { main, flexDirection, flexTall, input, btn, text } from '../../assets/stylesCustom';
import { ScrollView } from 'react-native-gesture-handler';

export const Rating = () => {

    useEffect(() => {
        const bootdata = async () => {
            setApitoken(await AsyncStorage.getItem("userToken"));
        };
        bootdata();
    }, []);

    const [apitoken, setApitoken] = useState();
    const [rating, setRating] = useState();
    const [comment, setComment] = useState();

    return (
        <ScrollView style={main.scroll}>
            <View style={main.page2}>
                <Text>Hello</Text>
                <View style={flexDirection.row}>
                    <View style={flexTall.flex1}></View>
                    <View style={flexTall.flex5}>
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            style={input.textarea}
                            placeholder='Entré votre bio'
                            onChangeText={setComment}
                            defaultValue={comment}
                        />

                    </View>
                    <View style={flexTall.flex1}></View>
                </View>
                <Text></Text>
            </View>
        </ScrollView>
    )
}

