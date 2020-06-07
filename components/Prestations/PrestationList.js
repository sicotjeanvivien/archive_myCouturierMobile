import * as React from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import { styles, main, widthTall, presta, modal, btn, flexDirection, flexTall } from '../../assets/stylesCustom';


export const PrestationList = ({ data, navigation, response }) => {


    const prestaInProgressData = data.inProgress;
    const prestaEndData = data.end;
    const [modalVisible, setModalVisible] = React.useState(false);
    const [errorResponse, setErrorResponse] = React.useState();

    let prestaInProgressView = <Text>Aucune prestation en cours.</Text>;
    if (prestaInProgressData && prestaInProgressData.length > 0) {
        prestaInProgressView = prestaInProgressData.map((key, i) => {

            return (
                <TouchableOpacity
                    key={i}
                    style={presta.listItem}
                    onPress={() => navigation.navigate('PrestationInProgress', {
                        prestation: key,
                        state: 'active',
                    })}
                >
                    <Text> prestation: {key.type}</Text>
                </TouchableOpacity>
            )
        });
    }

    let prestaEndView = <Text>Aucune prestation.</Text>;
    if (prestaEndData && prestaEndData.length > 0) {
        prestaEndView = Object.keys(prestaEndData).map((key, i) => {
            return (
                <View  key={i} style={presta.listItem} >
                    <TouchableOpacity
                       style={flexTall.flex7}
                        // style={presta.listItem}
                        onPress={() => navigation.navigate('DetailFinished', {
                            prestation: prestaEndData[key],
                            state: 'inactive',
                        })}
                    >
                        <Text> prestation: {prestaEndData[key].type}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=> navigation.navigate('Rating')}
                    style={flexTall.flex2}
                    >
                        <Text>Boo</Text>
                    </TouchableOpacity>
                </View>
            )
        });
    }

    if (errorResponse === undefined && response) {
        setErrorResponse(response);
        setModalVisible(true);
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
            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
            >
                <View style={modal.centeredView}>
                    <View style={modal.modalView}>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontSize: 24, textAlign: 'center' }}>{errorResponse}</Text>
                        </View>
                        <TouchableHighlight
                            style={btn.decline}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={{ fontSize: 16 }}>Fermer</Text>
                        </TouchableHighlight>
                    </View>
                </View>

            </Modal>
        </View>
    );
}