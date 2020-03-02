import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage } from "react-native";
import styles from '../../assets/stylesCustom';
import { ConstEnv, headers } from '../../ConstEnv';


export const Profil = () => {

    const [hide, setHide] = React.useState(false);
    const retouchingData = ()=>{
        console.log('start fetch')

        let header = headers.authToken;

        fetch(ConstEnv.host+ConstEnv.retouching,{
            methods:'GET',
            headers: header
        })
        .then((response) => response.json())
        .then((responsejson)=>{
            setHide(true);
        })
    }

    return (
        <View style={styles.container}>
            <View>
                <Text>Profil</Text>

            </View>
            <View>
                <TouchableOpacity 
                    onPress={ ()=>{retouchingData(true)}}
                >
                    <Text>Devenir Couturier</Text>
                </TouchableOpacity>                
            </View>
            <View>
                <TextInput />
            </View>
            {
                hide ? 
                <View>
                    <Text>Hello</Text>
                </View>
                :
                null
            }
        </View>
    );
}