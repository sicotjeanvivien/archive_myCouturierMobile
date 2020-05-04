import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles, main, widthTall, presta } from '../../assets/stylesCustom';


export const PrestationList = ({ data, navigation }) => {
    console.log('prestation list', data)
    const prestaInProgressData = data.inProgress;
    const prestaEndData = data.end;

    let prestaInProgressView = <Text>Aucune prestation en cours.</Text>;
    if (prestaInProgressData && prestaInProgressData.length > 0) {
        prestaInProgressView = Object.keys(prestaInProgressData).map((key, i) => {
            return (
                <TouchableOpacity
                    key={i}
                    style={presta.listItem}
                    onPress={() => navigation.navigate('PrestationDetail', {
                        prestation: prestaInProgressData[key],
                        state: 'active',
                    })}
                >
                    <Text> prestation: {prestaInProgressData[key].type}</Text>
                </TouchableOpacity>
            )
        });
    }

    let prestaEndView = <Text>Aucune prestation.</Text>;
    if (prestaEndData && prestaEndData.length > 0) {
        prestaEndView = Object.keys(prestaEndData).map((key, i) => {
            console.log('end', prestaEndData);
            return (
                <TouchableOpacity
                    key={i}
                    style={presta.listItem}
                    onPress={() => navigation.navigate('PrestationDetail', {
                        prestation: prestaEndData[key],
                        state: 'inactive',
                    })}
                >
                    <Text> prestation: {prestaEndData[key].type}</Text>
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

