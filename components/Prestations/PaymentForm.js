import * as React from 'react';
import { View, Text, ActivityIndicator, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import { styles, main, flexDirection, btn, text } from '../../assets/stylesCustom';
import { ConstEnv } from '../tools/ConstEnv';
import { AuthContext } from '../../Context/AuthContext';

import { PaymentsStripe as Stripe } from 'expo-payments-stripe';

export const PaymentForm = ({ navigation, route }) => {



    Stripe.setOptionsAsync({
        publishableKey: 'pk_test_fjqH4NEXED9P6Q7R3hWuuvDz00ycPnnF5H', // Your key
        androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
        merchantId: 'your_merchant_id', // [optional] used for payments with ApplePay
        
    });

   

    return (
        <View>
            <Text>hello</Text>
        </View>
    )
}