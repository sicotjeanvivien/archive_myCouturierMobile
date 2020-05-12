import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage, ScrollView, Image, ActivityIndicator, Picker, KeyboardAvoidingView } from "react-native";
import { styles, main, widthTall, input } from '../../assets/stylesCustom';
import { ConstEnv } from '../tools/ConstEnv';
import * as ImagePicker from 'expo-image-picker';

import { Error } from '../tools/Error';
import { Success } from '../tools/Success';
import { AuthContext } from '../../Context/AuthContext';
import { Navigation } from 'react-native-navigation';



export const ProfilClient = ({ navigation }) => {

    React.useEffect(() => {
        const bootData = async () => {
            let data = await AsyncStorage.getItem('imageProfil');
            let token = await AsyncStorage.getItem('userToken');
            let usernameStorage = await AsyncStorage.getItem('username');
            let bioStorage = await AsyncStorage.getItem('bio');
            let activeCouturierStorage = await AsyncStorage.getItem('activeCouturier');
            data != null ? setImageProfil(data) : '';
            token != null ? setApitoken(token) : setApitoken(null);
            usernameStorage != null ? setUsername(usernameStorage) : setUsername(null);
            activeCouturierStorage === 'true' ? setActiveCouturier(true) : setActiveCouturier(false);
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
                        setDataRetouche(responseJson);
                        let array = [];
                        responseJson.forEach(element => {
                            array.push({
                                id: element.id,
                                active: false,
                                value: element.value,
                                type: element.type,
                                description: element.description,
                                categoryRetouching: element.categoryRetouching,
                                supplyCost: '',
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
    const [imageProfil, setImageProfil] = React.useState();
    const [apitoken, setApitoken] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const [bio, setBio] = React.useState('');
    const [sendData, setSendData] = React.useState();
    const [errorResponse, setErrorResponse] = React.useState()
    const [activeCouturier, setActiveCouturier] = React.useState();

    const imageProfilDefault = '../../assets/default-profile.png';

    const { signOut } = React.useContext(AuthContext);


    //SEND dataRetouche
    const updateProfil = () => {
        let errorData = false;
        if (bio.length > 250) {
            errorData = true;
            setErrorResponse(<Error message={'bio trop longue. (max 250 caratères)'} />);
        }

        if (!errorData) {
            const bodyContent = {
                bio: bio,
                activeCouturier: activeCouturier,
            };
            fetch(ConstEnv.host + ConstEnv.updateUser, {
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
                    if (responseJson.error === 'invalid credentials') {
                        signOut()
                    }
                    if (!responseJson.error) {
                        setErrorResponse(<Success message={responseJson.message} />);
                        AsyncStorage.setItem('bio', bio)
                    } else {
                        setErrorResponse(<Error message={responseJson.message} />);
                    }
                })
        }
    }

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
        setImageProfil('data:image/jpeg;base64,' + pickerResult.base64);
        AsyncStorage.setItem('imageProfil', 'data:image/jpeg;base64,' + pickerResult.base64)
        const blob = new Blob([JSON.stringify('data:image/jpeg;base64,' + pickerResult.base64, null, 2)]);
        fetch(ConstEnv.host + ConstEnv.imageProfil, {
            method: 'POST',
            headers: {
                'X-AUTH-TOKEN': apitoken
            },
            body: blob,
        })
    };

    let imageSource = <Image resizeMethod="resize" source={require(imageProfilDefault)} style={styles.thumbnail} />;
    if (imageProfil) {
        imageSource = <Image resizeMethod="resize" source={{ uri: imageProfil }} style={styles.thumbnail} />
    }

    return (
        <ScrollView style={main.scroll}>
            <View style={styles.containerRowEnd}>
                <TouchableOpacity onPress={() => navigation.navigate('BecomeCouturier', {
                    retouches: sendData
                })}>
                    <Text style={styles.inputBecomeCouturier}>'Mode Couturier'</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.blocCenter}>
                <TouchableOpacity onPress={openImagePickerAsync} >
                    {imageSource}
                </TouchableOpacity>
                <Text>{username}</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={5}
                    style={input.textarea}
                    placeholder='Entré votre bio'
                    onChangeText={setBio}
                    defaultValue={bio}
                />
                <TouchableOpacity onPress={() => updateProfil()}>
                    <Text style={styles.btnValide}>Valider</Text>
                </TouchableOpacity>
                {errorResponse}
            </View>
        </ScrollView>
    );
}