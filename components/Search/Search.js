import React from "react";

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { View, Text, Platform, ActivityIndicator, Picker, Image, AsyncStorage } from "react-native";
import MapView, { Marker, OverlayComponent } from "react-native-maps";

import { styles, positions, main, padding, margin, styleImage, flexTall } from "../../assets/stylesCustom";
import { HeaderApp } from "../tools/HeaderApp";
import { ConstEnv } from "../tools/ConstEnv";
import { Success } from "../tools/Success";
import { Error } from "../tools/Error";

export const Search = () => {

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
    const [mapShow, setMapShow] = React.useState(false);
    const [errorResponse, setErroResponse] = React.useState();
    const [couturierResult, setCouturierResult] = React.useState();

    const imageProfilDefault = '../../assets/default-profile.png';


    const findRetouche = (itemValue) => {
        const bodyContent = {
            longitude: longitudeUser,
            latitude: latitudeUser,
            search: itemValue
        };
        setErroResponse(undefined);
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
                if (!responseJson.error) {
                    // setErroResponse(<Success message={responseJson.message} />);
                    setCouturierResult(responseJson.couturier);
                }
                else {
                    setErroResponse(<Error message={responseJson.message} />);
                    setCouturierResult(undefined);
                }
            })
    }

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
                {
                    couturierResult && couturierResult.map((key, i) => {
                        let longitudeCouturier = key.longitude;
                        let latitudeCouturier = key.latitude;
                        console.log(couturierResult, latitudeCouturier, longitudeCouturier)
                        return (
                            <MapView.Marker
                                key={i}
                                pinColor={"yellow"}
                                coordinate={{
                                    latitude: latitudeCouturier,
                                    longitude: longitudeCouturier,
                                }}
                                title={key.username}
                                showCallout
                            >
                                <View>
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
                                </View>
                            </MapView.Marker>
                        )
                    })
                }
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
        mapViewRender = mapView()
    } else {

    };

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
            <View style={flexTall.flex2}>
                <HeaderApp />
            </View>
            <View style={flexTall.flex8}>
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
                </View>
                {errorResponse}
                <View style={styles.blocCenter, searchBloc ? styles.show : styles.hidden}>

                </View>
            </View>
        </View>
    );

}