import * as React from 'react';
import { Ionicons, AntDesign, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { View, Text, TextInput, TouchableOpacity, AsyncStorage, ScrollView, Image, ActivityIndicator, Picker, KeyboardAvoidingView } from "react-native";
import { styles, main, widthTall, input, text, flexDirection, flexTall, btn } from '../../assets/stylesCustom';
import { ConstEnv } from '../tools/ConstEnv';
import * as ImagePicker from 'expo-image-picker';

import { Error } from '../tools/Error';
import { Success } from '../tools/Success';
import { AuthContext } from '../../Context/AuthContext';


export const ProfilConfig = ({ navigation }) => {
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
            fetch(ConstEnv.host + ConstEnv.userPriceRetouching, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': token,
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (!responseJson.error) {
                        setUserPriceRetouches(responseJson.userPriceRetouches)
                    }
                })
        };
        bootData();
    }, [])

    const [userPriceRetouches, setUserPriceRetouches] = React.useState();
    const [imageProfil, setImageProfil] = React.useState();
    const [apitoken, setApitoken] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const [bio, setBio] = React.useState('');
    const [errorResponse, setErrorResponse] = React.useState();
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
    const finishedConfigClient = async  ()=>{
        updateProfil();
        await AsyncStorage.removeItem('screenOpen');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Search' }],
          });;
    }
    const becomeCouturier = ()=>{
        updateProfil();
        navigation.navigate('ProfilConfigCouturier', {
            retouches: userPriceRetouches
        })
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

    // RENDER VIEW
    let imageSource = <Image resizeMethod="resize" source={require(imageProfilDefault)} style={styles.thumbnail} />;
    if (imageProfil) {
        imageSource = <Image resizeMethod="resize" source={{ uri: imageProfil }} style={styles.thumbnail} />
    }

    return (
        <ScrollView style={main.scroll}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
                {/* Profil */}
                <View style={main.page}>
                    <View style={flexDirection.row}>
                        <View style={flexTall.flex1}></View>
                        <View style={flexTall.flex2}>
                            <TouchableOpacity onPress={openImagePickerAsync} >
                                {imageSource}
                            </TouchableOpacity>
                            <Text style={{ textAlign: 'center', fontSize: 24 }}>{username}</Text>
                        </View>
                        <View style={flexTall.flex1}></View>
                    </View>
                    <View style={flexDirection.row}>
                        <View style={flexTall.flex1}></View>
                        <View style={flexTall.flex5}>
                            <TextInput
                                multiline={true}
                                numberOfLines={10}
                                style={input.textarea}
                                placeholder='Entré votre bio'
                                onChangeText={setBio}
                                defaultValue={bio}
                            />
                            <View style={{ marginTop: 36 }}>
                                <TouchableOpacity style={btn.primaire} onPress={() => finishedConfigClient()}>
                                    <Text style={text.btnPrimaire}>Valider</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={flexTall.flex1}></View>
                    </View>
                    {errorResponse}
                    <View style={{ marginTop: 36 }}>
                        <View style={flexDirection.row}>
                            <View style={flexTall.flex1}></View>
                            <View style={flexTall.flex5}>
                                <TouchableOpacity
                                    style={btn.primaire}
                                    onPress={() => becomeCouturier()}>
                                    <Text style={text.btnPrimaire}>Mode couturier</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={flexTall.flex1}></View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
} 