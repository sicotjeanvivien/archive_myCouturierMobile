import React from "react";
import { View, Text, StyleSheet, Button, Dimensions, Image } from "react-native";
import { flexDirection, flexTall, styles, img, text } from "../../assets/stylesCustom";

export const MessageUser = (data) => {

    const imageProfilDefault = '../../assets/default-profile.png';

    let imageSource = <Image resizeMethod="resize" source={require(imageProfilDefault)} style={img.messenger} />;
    if (data.imageProfil) {
        imageSource = <Image resizeMethod="resize" source={{ uri: data.imageProfil }} style={img.messenger} />
    }

    return (
        <View style={{flexDirection:"row", minHeight: 64,}}>
            <View style={flexTall.flex2}></View>
            <View style={{flex:4}}>
                <Text>user</Text>
                <Text style={text.message}>{data.message}</Text>
            </View>
            <View style={flexTall.flex2}>{imageSource}</View>

        </View>
    );
}