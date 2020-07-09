import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, AsyncStorage, TextInput, TouchableOpacity } from 'react-native'
import { main, flexDirection, flexTall, input, btn, text } from '../../assets/stylesCustom';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../Context/AuthContext';
import { AntDesign } from '@expo/vector-icons';
import { ConstEnv } from './ConstEnv';
import { Error } from './Error';

export const Rating = ({ navigation, route }) => {

    useEffect(() => {
        const bootdata = async () => {
            setApitoken(await AsyncStorage.getItem("userToken"));
        };
        bootdata();
    }, []);

    const [apitoken, setApitoken] = useState();
    const [rating, setRating] = useState();
    const [prestation, setPrestation] = useState(route.params.prestation)
    const [comment, setComment] = useState();
    const [errorResponse, setErrorResponse] = React.useState();
    const { signOut } = React.useContext(AuthContext);

    const sendRating = () => {
        console.log("start sendRating", rating, comment, apitoken);
        fetch(ConstEnv.host + ConstEnv.commentary, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': apitoken,
            },
            body: JSON.stringify({
                "rating": rating,
                "comment": comment,
                "prestationId": prestation.id
            })
        }).then(response => response.json()).then(res => {
            console.log(res);
            if (res.error === 'invalid credentials') {
                signOut()
            }
            if (!res.error) {
                navigation.navigate('Search');
            } else {
                setErrorResponse(<Error message={res.message} />);
            }
        })
    }

    return (
        <ScrollView style={main.scroll}>
            <View >

                <View style={{}} >
                    <Text style={styleRating.title} >Notez {prestation.username}:</Text>

                </View>
                <View style={{ margin: 20 }}></View>
                <View style={flexDirection.row}>
                    <View style={flexTall.flex1}></View>
                    <View style={flexTall.flex5}>
                        <View style={main.tileCard}>
                            <TouchableOpacity onPress={() => setRating(1)}>
                                {rating >= 1 ?
                                    <AntDesign name="star" size={28} color="#F8C342" />
                                    : <AntDesign name="staro" size={28} color="black" />

                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setRating(2)}>
                                {
                                    rating >= 2 ?
                                        <AntDesign name="star" size={28} color="#F8C342" />
                                        : <AntDesign name="staro" size={28} color="black" />

                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setRating(3)}>
                                {
                                    rating >= 3 ?
                                        <AntDesign name="star" size={28} color="#F8C342" />
                                        : <AntDesign name="staro" size={28} color="black" />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setRating(4)}>
                                {
                                    rating >= 4 ?
                                        <AntDesign name="star" size={28} color="#F8C342" />
                                        : <AntDesign name="staro" size={28} color="black" />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setRating(5)}>
                                {rating >= 5 ?
                                    <AntDesign name="star" size={28} color="#F8C342" />
                                    : <AntDesign name="staro" size={28} color="black" />
                                }
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={flexTall.flex1}></View>
                </View>

            </View>
            <View style={{ margin: 15 }}></View>
            <View style={main.page3}>
                <View style={flexDirection.row}>
                    <View style={flexTall.flex1}></View>
                    <View style={flexTall.flex5}>
                        <View style={main.tileCard}>
                            <TextInput
                                multiline={true}
                                numberOfLines={5}
                                style={input.textarea}
                                placeholder=' écrire un commentaire...'
                                onChangeText={setComment}
                                defaultValue={comment}
                            />
                        </View>
                    </View>
                    <View style={flexTall.flex1}></View>
                </View>
            </View>
            <View style={{ margin: 10 }}></View>
            <View style={main.page3}>
                <View style={flexDirection.row}>
                    <View style={flexTall.flex1}></View>
                    <View style={flexTall.flex5}>
                        {errorResponse}
                        <TouchableOpacity
                            style={btn.primaire}
                            onPress={() => sendRating()}
                        >
                            <Text style={text.btnPrimaire}>Envoyer</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={flexTall.flex1}></View>
                </View>
            </View>
        </ScrollView>
    )
}

const styleRating = StyleSheet.create({
    title: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontSize: 24,
        lineHeight: 23,
        textAlign: "center",
        color: "#F5B30F",
        marginTop: 50,
        // marginBottom: 50
    }
})