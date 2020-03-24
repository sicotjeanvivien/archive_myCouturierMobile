import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage, ScrollView, Image, ActivityIndicator, Picker } from "react-native";
import {styles} from '../../assets/stylesCustom';
import { ConstEnv } from '../../ConstEnv';
import * as ImagePicker from 'expo-image-picker';
import imageProfilDefault from '../../assets/default-profile.svg';
import { Error } from '../tools/Error';
import { Success } from '../tools/Success';



export const Profil = () => {

    React.useEffect(() => {
        const bootData = async () => {
            let data = await AsyncStorage.getItem('imageProfil');
            let token = await AsyncStorage.getItem('userToken');
            let usernameStorage = await AsyncStorage.getItem('username');
            let bioStorage = await AsyncStorage.getItem('bio');
            let activeCouturierStorage = await AsyncStorage.getItem('activeCouturier');
            console.log(activeCouturierStorage);
            data != null ? setImageProfil(data) : '';
            token != null ? setApitoken(token) : setApitoken(null);
            usernameStorage != null ? setUsername(usernameStorage) : setUsername(null);
            activeCouturierStorage == 'true' ? setActiveCouturier(true) : setActiveCouturier(false);
            if (bioStorage != null) {
                setBio(bioStorage);
            };

            //LOAD retouche
            fetch(ConstEnv.host + ConstEnv.retouching, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': token,
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.length > 0) {
                        console.log(responseJson);
                        setDataRetouche(responseJson);
                        let array = [];
                        responseJson.forEach(element => {
                            array.push({
                                id: element.id,
                                active: false,
                                value: element.value,
                            });
                        });
                        setSendData(array)
                    } else {
                        setDataRetouche(null)
                    }
                })
        };
        bootData();
    }, [])

    const [dataRetouche, setDataRetouche] = React.useState();
    const [imageProfil, setImageProfil] = React.useState(null);
    const [apitoken, setApitoken] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const [bio, setBio] = React.useState('Entré votre bio');
    const [sendData, setSendData] = React.useState();
    const [errorResponse, setErroResponse] = React.useState()
    const [activeCouturier, setActiveCouturier] = React.useState();

    console.log(activeCouturier)
    //SEND dataRetouche
    const sendDataRetouche = () => {
        let errorData = false;
        Object.keys(sendData).map((key, i) => {
            let retouche = sendData[key];
            console.log(retouche.active, Math.round(retouche.value) == Number(retouche.value), retouche.value > 1);

            if (retouche.active, Math.round(retouche.value) == Number(retouche.value), retouche.value > 1) {
                console.log(sendData[key])
                setErroResponse(<Success message={'valeur correcte'} />);
                errorData = false;
            } else if (retouche.active) {
                setErroResponse(<Error message={'valeur incorrecte'} />);
                errorData = true;
            }
        });
        if (!errorData) {
            const bodyContent = {
                retouche: sendData,
                bio: bio,
                activeCouturier: activeCouturier,
            };
            console.log(bodyContent);

            fetch(ConstEnv.host + ConstEnv.retouching, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': apitoken,
                },
                body: JSON.stringify(bodyContent)
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if (!responseJson.error) {
                        setErroResponse(<Success message={responseJson.message} />);
                        AsyncStorage.setItem('bio', bio)
                    } else {
                        setErroResponse(<Error message={responseJson.message} />);
                    }
                })
        }
    }

    //SEND ACTIVE COUTURIER
    let sendActiveCouturier = () => {
        console.log('start send AvtiveCouturier');
        activeCouturier ? setActiveCouturier(false) : setActiveCouturier(true);
        fetch(ConstEnv.host + ConstEnv.activeCouturier, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': apitoken,
            },
            body: JSON.stringify({ activeCouturier: !activeCouturier })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (!responseJson.error) {
                    setErroResponse(<Success message={responseJson.message} />);
                    AsyncStorage.setItem('activeCouturier', responseJson.activeCouturier)
                } else {
                    setErroResponse(<Error message={responseJson.message} />);
                }
            })

    }

    //IMAGE PICKER
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        setImageProfil(pickerResult.uri);
        const blob = new Blob([JSON.stringify(pickerResult.uri, null, 2)]);
        fetch(ConstEnv.host + ConstEnv.imageProfil, {
            method: 'POST',
            headers: {
                'X-AUTH-TOKEN': apitoken
            },
            body: blob,
        })
    };

    //Rendu View retouche
    const dataRetoucheView = sendData != null ? Object.keys(sendData).map((key, i) => {
        return (
            <View key={i} style={styles.container, styles.retoucheView}>
                <View style={styles.containerRow}>
                    <Text style={styles.text}>{dataRetouche[key].type}</Text>
                    <View style={styles.containerRow}>
                        <TextInput
                            style={styles.inputRetouche}
                            keyboardType='number-pad'
                            textContentType='oneTimeCode'
                            id={dataRetouche[key].id}
                            onChangeText={(value) => {
                                if (value > 0) {
                                    sendData[key].value = value;
                                    sendData[key].active = true;
                                } else {
                                    sendData[key].value = '';
                                    sendData[key].active = false;
                                }
                            }}
                            defaultValue={sendData[key].value}
                        />
                        <Text>  €</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.textInfo}>{dataRetouche[key].description}</Text>
                </View>
            </View>
        )
    }) : <ActivityIndicator />;

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.containerRowEnd}>
                <TouchableOpacity onPress={() => sendActiveCouturier()}>
                    <Text style={styles.inputBecomeCouturier}>{activeCouturier ? 'Ne plus être couturier' : 'Devenir Couturier'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.blocCenter}>
                <TouchableOpacity onPress={openImagePickerAsync} >
                    <Image
                        resizeMethod="resize"
                        source={imageProfil != 'null' ? imageProfil : imageProfilDefault}
                        style={styles.thumbnail}
                    />
                </TouchableOpacity>
                <Text>{username}</Text>
            </View>
            <View style={styles.blocCenter}>
                <TextInput
                    multiline={true}
                    numberOfLines={5}
                    style={styles.input}
                    placeholder='Entré votre bio'
                    onChangeText={setBio}
                    value={bio != 'null' ? bio : 'Entré votre bio'}
                />

            </View>
            <View style={styles.blocCenter}>
                {errorResponse}
            </View>
            <View style={styles.blocCenter}>
                <View style={activeCouturier ? styles.show : styles.hidden}>
                    {dataRetoucheView}
                </View>
                <TouchableOpacity onPress={() => sendDataRetouche()}>
                    <Text style={styles.btnValide}>Valider</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}