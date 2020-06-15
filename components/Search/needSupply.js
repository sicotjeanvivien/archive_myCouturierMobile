import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { main, flexTall, text, btn, input } from '../../assets/stylesCustom'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const needSupply = ({ navigation, route }) => {
    const [nbSupply, setNbSupply] = useState('1');
console.log(route.params);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            backgroundColor: '#F9F9F9',
            flexDirection: "row",
        }}>
            <View style={flexTall.flex1}></View>
            <View style={{ flex: 8, flexDirection: "column", justifyContent: 'space-evenly' }}>
                <View >
                    <Text style={text.sizeLarge}>
                        {route.params.couturier.retouche.supplyQuestion ?
                            route.params.couturier.retouche.supplyQuestion
                            :
                            'Avez vous besoin de fournitures ?'
                        }

                    </Text>
                </View>
                {route.params.couturier.retouche.supplyOption ?
                    <View style={{flexDirection: "column", justifyContent: 'space-between' }}>
                        <TextInput
                            keyboardType='number-pad'
                            textContentType='oneTimeCode'
                            onChangeText={setNbSupply}
                            defaultValue={nbSupply}
                            style={input.supply}
                        />
                        <TouchableOpacity style={btn.primaire} onPress={() => navigation.navigate("CreatePresation", {
                            couturier: route.params.couturier,
                            apitoken: route.params.apitoken,
                            nbSupply: nbSupply,
                            supplyCost: true
                        })}>
                            <Text style={text.btnPrimaire}>
                                Validate
                        </Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("CreatePresation", {
                            couturier: route.params.couturier,
                            apitoken: route.params.apitoken,
                            nbSupply: nbSupply,
                            supplyCost: true
                        })}>
                            <Text style={main.tileCard}>
                                Vous avez déjà le matériel nécessaire à la retouche, et n’aurez qu’à le transmettre au Couturier.
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("CreatePresation", {
                            couturier: route.params.couturier,
                            apitoken: route.params.apitoken,
                            nbSupply: nbSupply,
                            supplyCost: false
                        })}>
                            <Text style={main.tileCard}>
                                Vous n’avez pas le matériel nécessaire et voulez demander au Couturier de le fournir.
                        </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
            <View style={flexTall.flex1}></View>
        </View>
    )
}

const styles = StyleSheet.create({})
