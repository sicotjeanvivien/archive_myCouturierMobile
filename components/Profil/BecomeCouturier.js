import * as React from 'react';
import { AuthContext } from '../../Context/AuthContext';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Error } from '../tools/Error';
import { Success } from '../tools/Success';
import { ScrollView, View, Text, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { main, input, btn, flexDirection, flexTall, text, styles } from '../../assets/stylesCustom';
import { Ionicons, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { ConstEnv } from '../tools/ConstEnv';

export const BecomeCouturier = ({ navigation, route }) => {
    React.useEffect(() => {
        const bootdata = async () => {
            let token = await AsyncStorage.getItem('userToken');
            setApitoken(token);
            setActiveCouturier(await AsyncStorage.getItem('activeCouturier'));
            setRetouches(route.params.retouches);
        }
        bootdata();
    }, [])

    const { signOut } = React.useContext(AuthContext);
    const [location, setLocation] = React.useState();
    const [longitudeUser, setLongitudeUser] = React.useState();
    const [latitudeUser, setLatitudeUser] = React.useState();
    const [activeCouturier, setActiveCouturier] = React.useState();
    const [apitoken, setApitoken] = React.useState();
    const [retouches, setRetouches] = React.useState(route.params.retouches);
    const [errorResponse, setErrorResponse] = React.useState();
    const [address, setAddress] = React.useState();


    const becomeCouturier = () => {
        let data = {
            activeCouturier: true,
            longitude: longitudeUser,
            latitude: latitudeUser,
            userRetouchingPrice: retouches,
        }
        console.log(data);

        fetch(ConstEnv.host + ConstEnv.userPriceRetouching, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': apitoken,
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson.error === 'invalid credentials') {
                    signOut()
                }
                if (!responseJson.error) {
                    AsyncStorage.setItem('activeCouturier', 'true')
                    navigation.navigate('ProfilCouturier');
                } else {
                    setErrorResponse(<Error message={JSON.stringify(responseJson.message)} />);
                }
            })
    }

    const geocodeAddress = async () => {
        if (address.length > 3) {
            let location = await Location.geocodeAsync(address);
            location.forEach((geoloc, i) => {
                setLongitudeUser(geoloc.longitude);
                setLatitudeUser(geoloc.latitude);
            })
        }
    }

    let retouchesRenderView = <ActivityIndicator />;
    if (retouches) {
        retouchesRenderView = retouches.map((item, i) => {
            console.log(item.value.length);
            let lengthPrice = item.value.length - 2;
            return (
                <View key={i}>
                    <View style={flexDirection.rowCenter}>
                        <Text style={{ flex: 6, fontSize: 16 }}>{item.type}</Text>
                        <TextInput
                            keyboardType='number-pad'
                            textContentType='oneTimeCode'
                            id={item.id}
                            onChangeText={(value) => {
                                if (value > 0) {
                                    item.value = (Math.round(value)) * 100;
                                    item.active = true;
                                } else {
                                    item.value = '';
                                    item.active = false;
                                }
                            }}
                            defaultValue={item.value.slice(0, lengthPrice)}
                            style={input.retouche}
                        />
                        <FontAwesome style={flexTall.flex1} size={16} name='euro' />
                    </View>
                    <View key={i} style={flexDirection.row}>
                        <Text style={{ flex: 6, fontSize: 16 }}>cout fourniture</Text>
                        <TextInput

                            keyboardType='number-pad'
                            textContentType='oneTimeCode'
                            onChangeText={(value) => {
                                if (value > 0) {
                                    item.supplyCost = (Math.round(value)) * 100;
                                } else {
                                    item.supplyCost = '';
                                }
                            }}
                            defaultValue={item.supplyCost}
                            style={input.retouche}
                        />
                        <FontAwesome style={flexTall.flex1} size={16} name='euro' />
                    </View>
                </View>
            )
        })
    }

    return (
        <ScrollView style={main.scroll}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
                <View style={main.tile}>
                    <Text style={text.sizeMedium}>Vos tarifs</Text>
                    {retouchesRenderView}
                </View>
                <View style={main.tile}>
                    <Text style={text.sizeMedium}>Votre zone d'influence</Text>
                    <TextInput
                        style={styles.inputPicker}
                        placeholder="Adresse"
                        onChangeText={setAddress}
                        onEndEditing={() => geocodeAddress()}
                        defaultValue={address}
                    />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={btn.primaire}
                        onPress={() => becomeCouturier()}
                    >
                        <Text style={text.btnPrimaire}>Devenir Couturier</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 36 }}>
                    {errorResponse}
                </View>
            </View>
        </ScrollView>
    )
}
