import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, AsyncStorage, ActivityIndicator } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "../../assets/stylesCustom";
import { Detail } from './Detail';
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
            this.setState({ userToken: data })
            console.log(this.state.userToken)
        } catch (error) {

        }
        if (this.state.userToken) {

            fetch(ConstEnv.host + ConstEnv.prestation, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': this.state.userToken,
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson);
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson.prestations,
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
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        } else {
            const prestationProgress = this.state.dataSource.length >0 ? Object.keys(this.state.dataSource.prestations).map((key, i) => (
                <Detail />
            )) : <Text>Aucune prestation en cours.</Text>;

            return (
                <ScrollView style={styles.scrollView}>
                    <View style={styles.blocCenter}>
                        <Text style={styles.title}>Prestations en cours:</Text>
                        {prestationProgress}
                    </View>
                    <View style={styles.blocCenter}>
                        <Text style={styles.title}>Prestations Terminées:</Text>
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
                name='PrestaionDetail'
                component={Detail}
                options={{
                    headerShown: false,
                }}
            />
        </PrestationStack.Navigator>
    )
}


