import React from 'react'
import { View, Text } from 'react-native'

export const GuideResponse = ({navigation, route}) => {
    return (
        <View style={{ justifyContent: 'center', margin: 24 }}>
            <Text style={{fontSize:16}}>{route.params.response}</Text>
        </View>
    )
}
