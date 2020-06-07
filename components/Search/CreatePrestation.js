import React from "react";
import { ConstEnv } from '../tools/ConstEnv';
import * as ImagePicker from 'expo-image-picker';

import { Error } from '../tools/Error';
import { Success } from '../tools/Success';
import { AuthContext } from '../../Context/AuthContext';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Dimensions } from "react-native";
import { main, styles, input, btn, text, styleImage } from "../../assets/stylesCustom";

export const CreatePrestation = ({ navigation, route }) => {

    const [apitoken, setApitoken] = React.useState(route.params.apitoken);
    const [couturier, setCouturier] = React.useState(route.params.couturier);
    const [supplyCost, setSupplyCost] = React.useState(route.params.supplyCost)
    const [description, setDescription] = React.useState();
    const [photoPresta, setPhotoPresta] = React.useState([]);
    const [photoPrestaView, setPhotoPrestaView] = React.useState();

    //IMAGE PICKER
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({ base64: true });
        if (pickerResult.cancelled === true) {
            return;
        }
        let photoPrestaData = photoPresta;
        photoPrestaData.push('data:image/jpeg;base64,' + pickerResult.base64);
        setPhotoPresta(photoPrestaData);
        setPhotoPrestaView(photoPresta.map((key, i) => {
            return (
                <Image key={i} resizeMethod="resize" source={{ uri: key }} style={styleImage.imgSquare} />
                // <Text>{key}</Text>
            )
        }));
    };

    //SEND CREATE PRESTATION 
    const sendCreatePrestation = () => {
        let data = {
            retoucheId: couturier.retouche.id,
            description: description || null,
            photo: JSON.stringify(photoPresta),
            material: '',
        };

        fetch(ConstEnv.host + ConstEnv.prestation, {
            method: 'POST',
            headers: {
                'X-AUTH-TOKEN': apitoken,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (!responseJson.error) {
                    navigation.navigate('Prestation', {
                        message: responseJson.message
                    })
                } else {

                }
            })

    }

    return (
        <ScrollView style={main.scroll}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
                <View style={{
                    flex: 1,
                    width: Dimensions.get('window').width * 0.9,
                    fontFamily: "Roboto",
                }}>
                    <Text style={text.sizeMediumCenter}> Info retouche </Text>
                    <View style={main.tile} >
                        <Text style={text.text} >Type: {couturier.retouche.type} </Text>
                        <Text style={text.text}>Outil: {couturier.retouche.tool} </Text>
                        <Text style={text.text}>Prix: {couturier.retouche.priceShowClient / 100} </Text>
                        {supplyCost && <Text style={text.text}>Coût d'achat: {couturier.retouche.sypplyCost / 100} </Text>}
                        <Text style={text.text}>Engagement: {couturier.retouche.commitment} </Text>
                        <Text style={text.text}>Délai: {couturier.retouche.deadline} </Text>

                    </View>
                </View>
                <View style={{
                    flex: 1,
                    width: Dimensions.get('window').width * 0.9,
                    fontFamily: "Roboto",
                }}>
                    <Text style={text.sizeMediumCenter}>Ajoutez une description</Text>
                    <View style={main.tile}>
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            style={input.textarea}
                            placeholder={'Précision sur la retouche demandé'}
                            onChangeText={setDescription}
                            defaultValue={description}
                        />
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    width: Dimensions.get('window').width * 0.9,
                    fontFamily: "Roboto",
                }}>
                    <Text style={text.sizeMediumCenter}>Ajoutez des photos</Text>
                    <View style={main.tile}>
                        <TouchableOpacity onPress={openImagePickerAsync} >
                            <Text>Envoie d'image</Text>
                        </TouchableOpacity>
                        <View >
                            {photoPrestaView}
                        </View>
                    </View>
                </View>
                <View>
                    <Text></Text>
                </View>
                <View style={main.tile}>
                    <Text>Avez-vous le matériel pour la prestation?</Text>
                </View>
                <View style={{ marginBottom: 64 }}>

                    <TouchableOpacity
                        onPress={() => sendCreatePrestation()}
                        style={btn.primaire}
                    >
                        <Text style={text.btnPrimaire} >Envoyer la demande</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}