import * as React from 'react';
import { Text } from 'react-native';
import {styles} from '../../assets/stylesCustom';


export const Error = (props)=>{
    console.log(props)
    return(
        <Text style={styles.error_reponse}>
            {props.message}
        </Text>
    )
}