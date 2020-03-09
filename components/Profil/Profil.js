import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage, ScrollView, Image } from "react-native";
import styles from '../../assets/stylesCustom';
import { ConstEnv } from '../../ConstEnv';
import * as ImagePicker from 'expo-image-picker';
// import defaultProfil from '../../ass'


export const Profil = () => {

    React.useEffect(() => {
        const bootData = async () => {
            let data = await AsyncStorage.getItem('imageProfil');
            let token = await AsyncStorage.getItem('userToken');
           data != null ? setImageProfil(data) : setImageProfil(ConstEnv.host + ConstEnv.imageProfilDefault);
           token != null ? setApitoken(token): setApitoken(null);
        };
        bootData();
    }, [])

    const [hide, setHide] = React.useState(false);
    const [imageProfil, setImageProfil] = React.useState(null);
    const [apitoken, setApitoken] = React.useState(null);
    const retouchingData = () => {
        console.log('start fetch')

        fetch(ConstEnv.host + ConstEnv.retouching, {
            methods: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responsejson) => {
                setHide(true);
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
        setImageProfil(pickerResult.uri );
        const blob = new Blob([JSON.stringify(pickerResult.uri,null, 2)]);
        fetch(ConstEnv.host + ConstEnv.imageProfil, {
            method: 'POST',
            headers:{
                'X-AUTH-TOKEN' : apitoken
            },
            body: blob,
        })
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View>
                <Text>Profil</Text>
                <View style={styles.container}>
                    <TouchableOpacity onPress={openImagePickerAsync} >
                        <Image
                            source={imageProfil}
                            style={styles.thumbnail}
                        />
                    </TouchableOpacity>
                </View>
               

            </View>
            <View>
                <TouchableOpacity
                    onPress={() => { retouchingData(true) }}
                >
                    <Text>Devenir Couturier</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TextInput />
            </View>
            {
                hide ?
                    <View>
                        <Text>Hello</Text>
                    </View>
                    :
                    null
            }
        </ScrollView>
    );
}