import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { main, flexDirection, flexTall, text } from '../../assets/stylesCustom'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const needSupply = ({ navigation, route }) => {
    console.log( route.params.couturier);
    
    return (
        <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            backgroundColor: '#F9F9F9',
            flexDirection: "row",
        }}>
            <View style={flexTall.flex1}></View>
            <View style={{ flex: 5, flexDirection: "column", justifyContent: 'space-evenly' }}>
                <View >
                    <Text style={text.sizeLarge}>Avez vous besoin de fournitures ? </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("CreatePresation", {
                        couturier: route.params.couturier,
                        apitoken: route.params.apitoken,
                        supplyCost: true
                    })}>
                        <Text style={main.tileCard}>
                            Vous avez déjà le matériel nécessaire à la retouche, et n’aurez qu’à le transmettre au Couturier.
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("CreatePresation", {
                        couturier: route.params.couturier,
                        apitoken: route.params.apitoken,
                        supplyCost: false
                    })}>
                        <Text style={main.tileCard}>
                            Vous n’avez pas le matériel nécessaire et voulez demander au Couturier de le fournir.
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={flexTall.flex1}></View>
        </View>
    )
}

const styles = StyleSheet.create({})
