import * as React from 'react';
import { View, Text, Image } from 'react-native';
import {styles} from '../../assets/stylesCustom';
import logoTest from '../../assets/react-wp-app8.png';


export const HeaderApp = ()=>{
    return(
        <View style={styles.headerLogo}>
                <Image
                    resizeMethod="resize"
                    style={{
                        width: 75,
                        height: 75,
                        resizeMode: 'stretch'
                    }}
                    source={require('../../assets/icon.png')}
                />

        </View>
    )
}