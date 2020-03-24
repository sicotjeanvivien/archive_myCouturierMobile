import * as React from 'react';
import { Text } from 'react-native';
import {styles} from '../../assets/stylesCustom';


export const Success = (props)=>{
    console.log(props)
    return(
        <Text style={styles.success_reponse}>
            {props.message}
        </Text>
    )
}