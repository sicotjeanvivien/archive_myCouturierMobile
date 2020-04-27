import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles, main, widthTall, presta } from '../../assets/stylesCustom';


export const PrestationList = ({data, navigation}) => {
console.log( 'prestation list',data)
    const prestaInProgressData = data.inProgress;
    const prestaEndData = data.end;
    
    let prestaInProgressView = <Text>Aucune prestation en cours.</Text>;
    if (prestaInProgressData) {
        prestaInProgressView = Object.keys(prestaInProgressData).map((key, i) => {
            return (
                <TouchableOpacity
                    key={i}
                    style={presta.listItem}
                    onPress={() => navigation.navigate('PrestationDetail', {
                        prestation: prestaInProgressData[key],
                    })}
                >
                    <Text> prestation {prestaInProgressData[key].statut}</Text>
                </TouchableOpacity>
            )
        });
    }

    let prestaEndView = <Text>Aucune prestation.</Text>;
    console.log('prestaEndData', prestaEndData.lenght> 0);
    if (prestaEndData && prestaEndData.lenght> 0) {
        prestaEndView = Object.keys(prestaEndData).map((key, i) => {
            return (
                <TouchableOpacity
                    key={i}
                    style={presta.listItem}
                    onPress={() => navigation.navigate('PrestationDetail', {
                        prestation: prestaEndData[key],
                    })}
                >
                    <Text> prestation {prestaEndData[key].statut}</Text>
                </TouchableOpacity>
            )
        });
    }

    return (
        <View style={main.page}>
            {/* <Text>{data.inProgress}</Text> */}
            <View style={presta.listTile}>
                <Text style={presta.listText}>Prestations en cours:</Text>
                {prestaInProgressView}
            </View>
            <View style={presta.listTile}>
                <Text style={presta.listText}>Prestations Terminées:</Text>
                {prestaEndView}
            </View>
        </View>
    );
}

