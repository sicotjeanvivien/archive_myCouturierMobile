import React from "react";

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { View, Text, Platform, ActivityIndicator, Picker, Image, AsyncStorage } from "react-native";
import MapView, { Marker, OverlayComponent } from "react-native-maps";

import { styles, positions, main, padding, margin } from "../../assets/stylesCustom";
import { HeaderApp } from "../tools/HeaderApp";
import { ConstEnv } from "../../ConstEnv";

export const Search = () => {

    React.useEffect(() => {
        const bootData = async () => {
            console.log('hello')
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
            }
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
                        console.log(responseJson);
                        setDataRetouche(responseJson);
                    } else {
                        setDataRetouche(null)
                    }
                })
        };
        bootData();
    }, [])

    const [apitoken, setApitoken] = React.useState(null);
    const [location, setLocation] = React.useState();
    const [errorMessage, setErrorMessage] = React.useState();
    const [searchBloc, setSearchBloc] = React.useState();
    const [longitudeUser, setLongitudeUser] = React.useState();
    const [latitudeUser, setLatitudeUser] = React.useState();
    const [dataRetouche, setDataRetouche] = React.useState([]);
    const [retoucheSelect, setRetoucheSelect] = React.useState('choisir une prestation...');
    const [mapShow, setMapShow] = React.useState(false)

    const retoucheTest = [
        {
            titre: 'zip',
            value: 'zip',
            description: 'patate'
        },
    ];

    const findRetouche = () => {

    }

    let text = 'Waiting..';
    if (errorMessage) {
        text = errorMessage;
    } else if (location) {
        let geoloc = location;
        text = JSON.stringify(latitudeUser + ' ' + longitudeUser);

        // console.log(latitude)
        // console.log(text)
    }

    let mapView = mapShow ?
        <MapView
            style={styles.mapStyle}
            // region={userGeoloc}
            mapType='terrain'
            showsPointsOfInterest={false}
            initialRegion={{
                latitude: latitudeUser,
                longitude: longitudeUser,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>
            <Marker
                draggable
                onDrag={(e) => {
                    setLatitudeUser(e.nativeEvent.coordinate.latitude)
                    setLongitudeUser(e.nativeEvent.coordinate.longitude)
                }}
                coordinate={{
                    latitude: latitudeUser,
                    longitude: longitudeUser
                }}
                title={'vous étes ici'}
                showCallout
            />
        </MapView>
        :
        <ActivityIndicator style={styles.mapStyle} />;

    const itemPicker = dataRetouche.length != 0 ? Object.keys(dataRetouche).map((key, i) => {
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
            <HeaderApp />
            <View style={{ flex: 6 }}>
                {mapView}
            </View>
            <View style={padding.small, positions.center}>
                <Picker
                    selectedValue={retoucheSelect}
                    onValueChange={(itemValue, itemIndex) => setRetoucheSelect(itemValue)}
                    style={styles.inputPicker}
                >
                    <Picker.Item style={styles.inputPickerItem} label="aucune" value="noSelect" />
                    {itemPicker}
                </Picker>
            </View>
            <Text>{text} </Text>
            <View style={styles.blocCenter, searchBloc ? styles.show : styles.hidden}>

            </View>
        </View>
    );

}