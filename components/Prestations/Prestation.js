import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, AsyncStorage, ActivityIndicator, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {styles} from "../../assets/stylesCustom";
import  Detail  from './Detail';
import { ConstEnv } from '../../ConstEnv';


export default class Prestations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
        this._loadDataPrestations();
    }

    _loadDataPrestations = async () => {
        console.log('Start load data Prestations')
        try {
            let data = await AsyncStorage.getItem('userToken');
            this.state.userToken = data;
        } catch (error) {

        }

        if (this.state.userToken) {
            await fetch(ConstEnv.host + ConstEnv.prestation, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': this.state.userToken,
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        isLoading: false,
                        prestationsInprogress: responseJson.prestationsINPROGRESS,
                        prestationsEnd: responseJson.prestationsEND,
                    },
                        function () { });
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            );
        } else {
            
            console.log(this.state.prestationsInprogress)
            const prestations = this.state.prestationsInprogress
            const prestationINProgress = prestations.length > 0 ? Object.keys(prestations).map((key, i) => {
                console.log(prestations[key])
                return (
                    <TouchableOpacity
                        key={i}
                        style={styles.btnEnter}
                        onPress={() => this.props.navigation.navigate('PrestationDetail', { 
                            prestation: prestations[key],
                            userToken: this.state.userToken 
                        })}
                    >
                        <Text style={styles.btnSignUp}> prestation {prestations[key].statut}</Text>
                    </TouchableOpacity>
                )
            }) : <Text>Aucune prestation en cours.</Text>;
            
            const prestationEND = this.state.prestationsEnd.length > 0 ? Object.keys(this.state.prestationsEnd).map((PrestationEnd, i) => (
                <Detail key={i} />
            )) : <Text>Aucune prestation terminées.</Text>;

            return (
                <ScrollView style={styles.scrollView}>
                    <View style={styles.blocCenter}>
                        <Text style={styles.title}>Prestations en cours:</Text>
                        {prestationINProgress}
                    </View>
                    <View style={styles.blocCenter}>
                        <Text style={styles.title}>Prestations Terminées:</Text>
                        {prestationEND}
                    </View>
                </ScrollView>
            );
        }

    }
}

const PrestationStack = createStackNavigator()
export const PrestationStackScreen = () => {
    return (
        <PrestationStack.Navigator>
            <PrestationStack.Screen
                name='Prestaions'
                component={Prestations}
                options={{
                    headerShown: false,
                }}
            />
            <PrestationStack.Screen
                name='PrestationDetail'
                component={Detail}
                options={{
                    headerShown: true,
                    title: 'Détail prestation'
                }}
            />
        </PrestationStack.Navigator>
    )
}


