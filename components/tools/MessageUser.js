import React from "react";
import { View, Text, StyleSheet, Button, Dimensions, Image } from "react-native";
import { flexDirection, flexTall, styles, img, text } from "../../assets/stylesCustom";

export const MessageUser = (data) => {
    const style = StyleSheet.create({
        bulle: {
            width: Dimensions.get('screen').width * 0.6,
            backgroundColor: 'white',
            borderRadius: 15,
            borderWidth: 1,
            borderColor: 'black',
            padding: 15,
        },
        edited: {
            fontSize: 10,
        }

    })
    const imageProfilDefault = '../../assets/default-profile.png';

    let imageSource = <Image resizeMethod="resize" source={require(imageProfilDefault)} style={img.messenger} />;
    // if (imageProfil) {
    //     imageSource = <Image resizeMethod="resize" source={{ uri: imageProfil }} style={styles.thumbnail} />
    // }

    return (
        <View style={flexDirection.justRow}>
            <View style={flexTall.flex2}></View>
            <View style={{flex:4}}>
                <Text style={text.message}>{data.message}</Text>
            </View>
            <View style={flexTall.flex2}>{imageSource}</View>

        </View>
    );
}