import React from "react";
import { View, Text, StyleSheet, Button, Dimensions } from "react-native";

export const MessageUser = (data) => {
    const style = StyleSheet.create({
        bulle: {
            width: Dimensions.get('screen').width * 0.6,
            backgroundColor: 'white',
            borderRadius:15,
            borderWidth:1,
            borderColor: 'black',
            padding: 15,
        },
        edited:{
            fontSize:10,
        }

    })

    return (
        <View style={style.bulle}>
            <Text> azeazaeaz eazeaz{data.message}</Text>
            <Text style={style.edited}>envoyé: </Text>
        </View>
    );
}