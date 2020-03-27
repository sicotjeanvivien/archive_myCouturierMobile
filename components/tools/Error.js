import * as React from 'react';
import { Text } from 'react-native';
import {styles} from '../../assets/stylesCustom';


export const Error = (props)=>{
    return(
        <Text style={styles.error_reponse}>
            {props.message}
        </Text>
    )
}