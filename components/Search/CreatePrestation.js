import React from "react";
import { ConstEnv } from '../tools/ConstEnv';
import * as ImagePicker from 'expo-image-picker';

import { Error } from '../tools/Error';
import { Success } from '../tools/Success';
import { AuthContext } from '../../Context/AuthContext';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Dimensions, ActivityIndicator } from "react-native";
import { main, styles, input, btn, text, styleImage, flexDirection } from "../../assets/stylesCustom";
import { Feather } from '@expo/vector-icons';

export const CreatePrestation = ({ navigation, route }) => {

    const [apitoken, setApitoken] = React.useState(route.params.apitoken);
    const [couturier, setCouturier] = React.useState(route.params.couturier);
    const [supplyCost, setSupplyCost] = React.useState(route.params.supplyCost)
    const [description, setDescription] = React.useState();
    const [photoPresta, setPhotoPresta] = React.useState([]);
    const [phototrue1, setPhototrue1] = React.useState(false)
    const [phototrue2, setPhototrue2] = React.useState(false)
    const [phototrue3, setPhototrue3] = React.useState(false)

    console.log(couturier);
    

    //IMAGE PICKER
    let openImagePickerAsync = async (index) => {
        // setPhototrue1(false)
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
        photoPrestaData[index] = 'data:image/jpeg;base64,' + pickerResult.base64;
        setPhotoPresta(photoPrestaData);
        switch (index) {
            case 1:
                setPhototrue1(false)
                setPhototrue1(true)
                break;
            case 2:
                setPhototrue2(false)
                setPhototrue2(true)
                break;
            case 3:
                setPhototrue3(false)
                setPhototrue3(true)
                break;

            default:
                break;
        }

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

    let photo1View = <Text><Feather name="camera" style={styleImage.imgSquare} size={90} color="black" /></Text>
    if (phototrue1) {
        photo1View = <Image resizeMethod="resize" source={{ uri: photoPresta[1] }} style={styleImage.imgSquare} />
    }
    let photo2View = <Text><Feather name="camera" style={styleImage.imgSquare} size={90} color="black" /></Text>
    if (phototrue2) {
        photo2View = <Image resizeMethod="resize" source={{ uri: photoPresta[2] }} style={styleImage.imgSquare} />
    }
    let photo3View = <Text><Feather name="camera" style={styleImage.imgSquare} size={90} color="black" /></Text>
    if (phototrue3) {
        photo3View = <Image resizeMethod="resize" source={{ uri: photoPresta[3] }} style={styleImage.imgSquare} />
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
                        <Text style={text.text}>Prix: {couturier.retouche.priceShowClient / 100} €</Text>
                        {supplyCost && <Text style={text.text}>Coût des fournitures: {couturier.retouche.supplyCost / 100} €</Text>}
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
                    <View style={flexDirection.row}>
                        <TouchableOpacity style={main.tileItem} onPress={() => openImagePickerAsync(1)} >
                            {photo1View}
                        </TouchableOpacity>
                        <TouchableOpacity style={main.tileItem} onPress={() => openImagePickerAsync(2)} >
                            {photo2View}
                        </TouchableOpacity>
                        <TouchableOpacity style={main.tileItem} onPress={() => openImagePickerAsync(3)} >
                            {photo3View}
                        </TouchableOpacity>
                    </View>
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
