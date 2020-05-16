import React from "react";
import { View, Text, StyleSheet, ScrollView, Button, Image } from "react-native";
import { Ionicons, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import { main, styles, flexDirection, positions, btn, text } from "../../assets/stylesCustom";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Navigation } from "react-native-navigation";

export const CouturierDetail = ({ navigation, route }) => {
    const [couturier, setCouturier] = React.useState(route.params.data);

    const imageProfilDefault = '../../assets/default-profile.png';


    return (
        <ScrollView style={main.scroll}>
            <View style={positions.center}>
                <View style={flexDirection.row} >
                    <View style={positions.center} >
                        {
                            couturier.imageProfil ?
                                <Image
                                    resizeMethod="resize"
                                    source={{ uri: couturier.imageProfil }}
                                    style={styles.thumbnail}
                                /> :
                                <Image
                                    resizeMethod="resize"
                                    source={require(imageProfilDefault)}
                                    style={styles.thumbnail}
                                />
                        }
                        <Text> {couturier.username} </Text>
                    </View>
                    <View style={flexDirection.rowCenter}>
                        <Entypo name='star' size={24} color='#ffd700' />
                        <Text>{couturier.raiting}</Text>
                    </View>
                </View>
                <View style={positions.center}>
                    <Text style={main.tile} >{couturier.bio} </Text>
                </View>
                <View style={main.tile} >
                    <Text> Info retouche </Text>
                    <Text>Type: {couturier.retouche.type} </Text>
                    <Text>Outil: {couturier.retouche.tool} </Text>
                    <Text>Prix: {couturier.retouche.priceShowClient/100} </Text>
                    <Text>Engagement: {couturier.retouche.commitment} </Text>
                    <Text>Délai: {couturier.retouche.deadline} </Text>
                    <TouchableOpacity
                        style={btn.primaire}
                        onPress={() => navigation.navigate('CreatePresation', {
                            couturier: couturier,
                            apitoken: route.params.apitoken
                        })}
                    >
                        <Text style={text.btnPrimaire} >Soliciter</Text>
                    </TouchableOpacity>
                </View>
                <View style={main.tile}>
                    <Text>Commentaires</Text>
                </View>
            </View>
        </ScrollView>
    );
}