import React, { Component } from 'react';
import { Text, View, Button, ActivityIndicator, ScrollView } from 'react-native';
import { main, text } from '../../assets/stylesCustom';
import { ConstEnv } from '../tools/ConstEnv';

export const CGV = ()=>{

    React.useEffect(()=>{
        fetch(ConstEnv.host +ConstEnv.cgv)
        .then((response)=>{response.json()})
        .then((responseJson)=>{
            console.log(responseJson)
            if (!responseJson.error) {
                setCgv(responseJson.cgv)
            } else {
                
            }
        })
    })
    
    const [cgv, setCgv]=React.useState();
    let cgvViewRender = <ActivityIndicator />;
    if (cgv) {
        cgvViewRender=<Text style={text.sizeSmall}>{cgv}</Text>
    }


    return(
        <ScrollView style={main.scroll}>
            {cgvViewRender}
        </ScrollView>
    )
}
