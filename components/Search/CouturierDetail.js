import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView, Button, Image, AsyncStorage, ActivityIndicator } from "react-native";
import { Ionicons, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import { main, styles, flexDirection, positions, btn, text, flexTall, styleImage } from "../../assets/stylesCustom";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Navigation } from "react-native-navigation";
import { ConstEnv } from "../tools/ConstEnv";

export const CouturierDetail = ({ navigation, route }) => {

    useEffect(() => {
        const bootdata = async () => {
            const apitoken = await AsyncStorage.getItem('userToken');
            // load Commentaire
            fetch(ConstEnv.host + ConstEnv.commentary + couturier.id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': apitoken,
                }
            }).then(response => response.json())
                .then(responseJson => {
                    if (!responseJson.error) {
                        setCommentary(responseJson.commentary)
                    }
                })
        }
        bootdata();
    }, [])

    const imageProfilDefault = '../../assets/default-profile.png';
    const [couturier, setCouturier] = React.useState(route.params.data);
    const [commentary, setCommentary] = useState();

    // Render View
    // Todo better
    let rating = 2.1;
    let start = <View style={{ flexDirection: "row" }}></View>
    if (rating >= 1) {
        start = <View style={{ flexDirection: "row" }}>
            <Entypo name='star' size={32} color='#F8C342' />
        </View>;
    } if (rating >= 2) {
        start = <View style={{ flexDirection: "row" }}>
            <Entypo name='star' size={32} color='#F8C342' />
            <Entypo name='star' size={32} color='#F8C342' />
        </View>;
    } if (rating >= 3) {
        start = <View style={{ flexDirection: "row" }}>
            <Entypo name='star' size={32} color='#F8C342' />
            <Entypo name='star' size={32} color='#F8C342' />
            <Entypo name='star' size={32} color='#F8C342' />
        </View>;
    } if (rating >= 4) {
        start = <View style={{ flexDirection: "row" }}>
            <Entypo name='star' size={32} color='#F8C342' />
            <Entypo name='star' size={32} color='#F8C342' />
            <Entypo name='star' size={32} color='#F8C342' />
            <Entypo name='star' size={32} color='#F8C342' />
        </View>;
    } if (rating >= 5) {
        start = <View style={{ flexDirection: "row" }}>
            <Entypo name='star' size={32} color='#F8C342' />
            <Entypo name='star' size={32} color='#F8C342' />
            <Entypo name='star' size={32} color='#F8C342' />
            <Entypo name='star' size={32} color='#F8C342' />
            <Entypo name='star' size={32} color='#F8C342' />
        </View>;
    }

    // REnderView Commentary
    let commentaryRenderView = <ActivityIndicator />;
    if (commentary) {
        if (commentary.length > 0) {
            commentaryRenderView = commentary.map((item, i) => {
                return (
                    <View key={i} style={main.tileCard}>
                        <View style={flexTall.flex1}></View>
                        <View style={flexTall.flex3}>
                            {
                                item.authorImg ?
                                    <Image
                                        resizeMethod="resize"
                                        source={{ uri: item.authorImg }}
                                        style={styleImage.comment}
                                    /> :
                                    <Image
                                        resizeMethod="resize"
                                        source={require(imageProfilDefault)}
                                        style={styleImage.comment}
                                    />
                            }
                        </View>
                        <View style={flexTall.flex1}></View>
                        <View style={flexTall.flex8}>
                            <Text>{item.message}</Text>

                        </View>
                        {/* <View style={flexTall.flex1}></View> */}
                    </View>
                )
            })
        } else {
            commentaryRenderView = <Text>aucun</Text>
        }
    }

    return (
        <ScrollView style={main.scroll}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
                {/* Photo  */}
                <View style={{ flexDirection: "row", marginTop: 5 }} >
                    <View style={flexTall.flex2}></View>
                    <View style={flexTall.flex5}>
                        {
                            couturier.imageProfil ?
                                <Image
                                    resizeMethod="resize"
                                    source={{ uri: couturier.imageProfil }}
                                    style={styleImage.couturier}
                                /> :
                                <Image
                                    resizeMethod="resize"
                                    source={require(imageProfilDefault)}
                                    style={styleImage.couturier}
                                />
                        }
                    </View>
                    <View style={flexTall.flex7}>
                        <Text style={{ fontSize: 28, fontWeight: "bold" }}>{couturier.username}</Text>
                        {start}
                        <View style={flexDirection.row}>
                            <Text>{couturier.raiting}</Text>

                        </View>
                    </View>
                    <View style={flexTall.flex2}></View>
                </View>
                {/* BIO */}
                <View style={{ flexDirection: "row", marginTop: 24 }}>
                    {
                        couturier.bio.length > 0 &&
                        <View style={main.tile}>
                            <Text style={text.text} >{couturier.bio} </Text>
                        </View>
                    }
                </View>
                {/* BTN Solicite */}
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    { couturier.retouche.supplyQuestion ?
                        <TouchableOpacity
                            style={btn.primaire}
                            onPress={() => navigation.navigate('NeedSupply', {
                                couturier: couturier,
                                apitoken: route.params.apitoken
                            })}>
                            <Text style={text.btnPrimaire}>Soliciter</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={btn.primaire}
                            onPress={() => navigation.navigate('CreatePresation', {
                                couturier: couturier,
                                apitoken: route.params.apitoken
                            })}>
                            <Text style={text.btnPrimaire}>Soliciter</Text>
                        </TouchableOpacity>
                    }
                </View>
                {/* INFO retouche */}

                <View style={{
                    flex: 1,
                    width: Dimensions.get('window').width * 0.9,
                    fontFamily: "Roboto",
                }}>
                    <Text style={text.sizeMedium}> Info retouche </Text>
                    <View style={main.tile} >
                        <Text style={text.text} >Type: {couturier.retouche.type} </Text>
                        <Text style={text.text}>Outil: {couturier.retouche.tool} </Text>
                        <Text style={text.text}>Prix: {couturier.retouche.priceShowClient / 100} </Text>
                        <Text style={text.text}>Engagement: {couturier.retouche.commitment} </Text>
                        <Text style={text.text}>Délai: {couturier.retouche.deadline} </Text>

                    </View>
                </View>
                {

                    <View style={{
                        flex: 1,
                        width: Dimensions.get('window').width * 0.9,
                        fontFamily: "Roboto",
                    }}>
                        <Text style={text.sizeMedium}>Commentaires</Text>
                        <View >
                            {commentaryRenderView}
                        </View>
                    </View>
                }
            </View>
        </ScrollView>
    );
}