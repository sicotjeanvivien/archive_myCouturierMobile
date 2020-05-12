import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';


import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { View, Text, Platform, ActivityIndicator, Picker, Image, AsyncStorage, TouchableOpacity, TextInput } from "react-native";
import MapView, { Marker, OverlayComponent } from "react-native-maps";

import { styles, positions, main, padding, margin, styleImage, flexTall, flexDirection } from "../../assets/stylesCustom";
import { HeaderApp } from "../tools/HeaderApp";
import { ConstEnv } from "../tools/ConstEnv";
import { Success } from "../tools/Success";
import { Error } from "../tools/Error";
import { CouturierDetail } from "./CouturierDetail";
import { CreatePrestation } from "./CreatePrestation";
import { AuthContext } from "../../Context/AuthContext";

const Search = ({ navigation }) => {

    React.useEffect(() => {
        const bootData = async () => {
            //apiToken
            let token = await AsyncStorage.getItem('userToken');
            token != null ? setApitoken(token) : setApitoken(null);
            //Access Geoloc
            if (Platform.OS === 'android' && !Constants.isDevice) {
                setErrorMessage('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
            } else {
                let { status } = await Permissions.askAsync(Permissions.LOCATION);
                if (status !== 'granted') {
                    setErrorMessage('Permission to access location was denied');
                }
                let location = await Location.getCurrentPositionAsync({});
                let latitudeUser = location.coords.latitude;
                let longitudeUser = location.coords.longitude;
                setLocation(location);
                setLongitudeUser(longitudeUser);
                setLatitudeUser(latitudeUser);
                //mapShow
                latitudeUser != null && longitudeUser != null ? setMapShow(true) : setMapShow(false);
            };
            //load dataRetouche
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
                    } else {
                        setDataRetouche(null)
                    }
                });
        };

        bootData();

    }, [])

    const [apitoken, setApitoken] = React.useState(null);
    const [location, setLocation] = React.useState();
    const [errorMessage, setErrorMessage] = React.useState();
    const [longitudeUser, setLongitudeUser] = React.useState();
    const [latitudeUser, setLatitudeUser] = React.useState();
    const [dataRetouche, setDataRetouche] = React.useState([]);
    const [retoucheSelect, setRetoucheSelect] = React.useState('choisir une prestation...');
    const [mapShow, setMapShow] = React.useState(false);
    const [errorResponse, setErroResponse] = React.useState();
    const [couturierResult, setCouturierResult] = React.useState();
    const [address, setAddress]= React.useState()

    const imageProfilDefault = '../../assets/default-profile.png';

    const { signOut } = React.useContext(AuthContext);

    const findRetouche = (itemValue) => {
        const bodyContent = {
            longitude: longitudeUser,
            latitude: latitudeUser,
            search: itemValue,
            radius: 0.10
        };
        setErroResponse(undefined);
        if (itemValue === 'noSelect') {
            findAllRetouche()
        } else {
            fetch(ConstEnv.host + ConstEnv.searchPrestation, {
                method: 'POST',
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
                        let couturierResultData = responseJson.couturier && responseJson.couturier.map((key, i) => {
                            let longitudeCouturier = key.longitude;
                            let latitudeCouturier = key.latitude;
                            return (
                                <MapView.Marker
                                    key={i}
                                    pinColor={"yellow"}
                                    coordinate={{
                                        latitude: latitudeCouturier,
                                        longitude: longitudeCouturier,
                                    }}
                                    HideCallout
                                    onPress={() => navigation.navigate('CouturierDetail', {
                                        data: key,
                                        apitoken: apitoken
                                    })}
                                >
                                    <View style={main.tileMap}>
                                        {
                                            key.imageProfil ?
                                                <Image
                                                    resizeMethod="resize"
                                                    source={{ uri: key.imageProfil }}
                                                    style={styleImage.imageCouturierMap}
                                                /> :
                                                <Image
                                                    resizeMethod="resize"
                                                    source={require(imageProfilDefault)}
                                                    style={styleImage.imageCouturierMap}
                                                />
                                        }
                                        <View>
                                            <Text>{key.username}</Text>
                                            <View style={flexDirection.rowCenter}>
                                                <Entypo name='star' size={16} color='#ffd700' />
                                                <Text>{key.raiting}</Text>
                                            </View>
                                            <Text> {key.retouche ? key.retouche.priceShowClient : ''} <FontAwesome name='euro' /> </Text>

                                        </View>
                                    </View>
                                </MapView.Marker>
                            )
                        })
                        setCouturierResult(couturierResultData);
                    }
                    else {
                        setErroResponse(<Error message={responseJson.message} />);
                        setCouturierResult(null);
                    }
                })
        }
    }

    const findAllRetouche = () => {
        //findAllRetouche TODO better
        fetch(ConstEnv.host + ConstEnv.searchPrestation, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': apitoken,
            },
            body: JSON.stringify({
                longitude: longitudeUser,
                latitude: latitudeUser,
                // search: itemValue,
                radius: 0.10
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error === 'invalid credentials') {
                    signOut()
                }
                if (!responseJson.error) {
                    let couturierResultData = responseJson.couturier && responseJson.couturier.map((key, i) => {
                        let longitudeCouturier = key.longitude;
                        let latitudeCouturier = key.latitude;
                        return (
                            <MapView.Marker
                                key={i}
                                pinColor={"yellow"}
                                coordinate={{
                                    latitude: latitudeCouturier,
                                    longitude: longitudeCouturier,
                                }}
                                HideCallout>
                            </MapView.Marker>)
                    })
                    setCouturierResult(couturierResultData);
                } else {
                    setErroResponse(<Error message={responseJson.message} />);
                    setCouturierResult(responseJson.couturier);
                }
            })
    };

    const geocodeAddress = async ()=>{
        let location = await Location.geocodeAsync(address);
        location.forEach((geoloc, i)=>{
            setLongitudeUser(geoloc.longitude);
            setLatitudeUser(geoloc.latitude);
        })
        setLongitudeUser(location)
    }

    if (latitudeUser != null && longitudeUser != null && couturierResult === undefined) {
        findAllRetouche();
    };

    const mapView = () => {
        return (
            <MapView
                style={styles.mapStyle}
                mapType='terrain'
                showsPointsOfInterest={false}
                initialRegion={{
                    latitude: latitudeUser,
                    longitude: longitudeUser,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} >
                {couturierResult}
                <Marker
                    draggable
                    onDrag={(e) => {
                        setLatitudeUser(e.nativeEvent.coordinate.latitude)
                        setLongitudeUser(e.nativeEvent.coordinate.longitude)
                    }}
                    coordinate={{
                        latitude: latitudeUser,
                        longitude: longitudeUser,
                    }}
                    title={'vous étes ici'}
                    showCallout
                />
                <Text style={positions.end, { fontSize: 8 }}>{text} </Text>
            </MapView>
        )
    };

    let text = 'Waiting..';
    if (errorMessage) {
        text = errorMessage;
    } else if (location) {
        let geoloc = location;
        text = JSON.stringify(latitudeUser + ' ' + longitudeUser);
    }

    let mapViewRender = <ActivityIndicator style={styles.mapStyle} />;
    if (mapShow) {
        mapViewRender = mapView();
    };

    const itemPicker = dataRetouche && dataRetouche.length != 0 ? Object.keys(dataRetouche).map((key, i) => {
        return (
            <Picker.Item
                key={i}
                style={styles.inputPickerItem}
                label={dataRetouche[key].type}
                value={dataRetouche[key].type}
            />
        )
    }) : null;

    return (
        <View style={main.page}>
            <View style={flexTall.flex2}>
                <HeaderApp />
            </View>
            <View style={flexTall.flex9}>
                {mapViewRender}
            </View>
            <View style={flexTall.flex2}>
                <View style={padding.small, positions.center}>
                    <Picker
                        selectedValue={retoucheSelect}
                        onValueChange={async (itemValue, itemIndex) => { setRetoucheSelect(itemValue); findRetouche(itemValue) }}
                        style={styles.inputPicker}
                    >
                        <Picker.Item style={styles.inputPickerItem} label='' value='noSelect' />
                        {itemPicker}
                    </Picker>
                    <TextInput
                        style={styles.inputPicker}
                        placeholder="Adresse"
                        onChangeText={()=>geocodeAddress()}
                        defaultValue={address}
                    />
                </View>
                {errorResponse}
            </View>
        </View>
    );
}

const SearchStack = createStackNavigator();
export const SearchStackScreen = () => {
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen
                name='MapSearch'
                component={Search}
                options={{
                    headerShown: false,
                }}
            />
            <SearchStack.Screen
                name='CouturierDetail'
                component={CouturierDetail}
                options={{
                    title: '',
                }}
            />
            <SearchStack.Screen
                name='CreatePresation'
                component={CreatePrestation}
                options={{
                    title: '',
                }}
            />
        </SearchStack.Navigator>
    )
}