import React from "react";
import { View, Text, Platform } from "react-native";

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import styles from "../../assets/stylesCustom";
import { TextInput } from "react-native-gesture-handler";
import MapView, { Marker, OverlayComponent } from "react-native-maps";


export default class Search extends React.Component {
    state = {
        location: null,
        errorMessage: null,
        seachbloc: false,
        longitudeUser: 0,
        latitudeUser: 0,
    };

    UNSAFE_componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        let latitudeUser = location.coords.latitude;
        let longitudeUser = location.coords.longitude;
        this.setState({ location });
        this.setState({ longitudeUser });
        this.setState({ latitudeUser });
    };


    render() {
        let text = 'Waiting..';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            let geoloc = this.state.location;
            text = JSON.stringify(this.state.location);

            console.log(this.state.latitude)
            console.log(text)
        }

        return (
            <View style={styles.blocCenterEnd}>
                <MapView
                    style={styles.mapStyle}
                    // region={this.state.userGeoloc}
                    mapType='terrain'
                    showsPointsOfInterest={false}
                    initialRegion={{
                        latitude: this.state.latitudeUser,
                        longitude: this.state.longitudeUser,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude:this.state.latitudeUser,
                            longitude: this.state.longitudeUser
                        }}
                        title={'marker'}
                    />
                </MapView>
                <View style={styles.blocCenterEnd}>
                    <TextInput style={styles.input} />
                </View>
                {/* <Text>{text} </Text> */}
                <View style={styles.blocCenter, this.state.seachbloc ? styles.show : styles.hidden}>

                </View>
            </View>
        );
    }
}