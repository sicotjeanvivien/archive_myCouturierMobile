import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, AsyncStorage, ActivityIndicator, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { styles, main, flexDirection, tab } from "../../assets/stylesCustom";
import { Detail } from './Detail';
import { ConstEnv } from '../tools/ConstEnv';
import { PrestationList } from './PrestationList';
import { AuthContext } from '../../Context/AuthContext';


export const Prestations = ({ navigation }) => {

    React.useEffect(() => {
        const bootdata = async () => {
            console.log(await AsyncStorage.getAllKeys());
            const apitokenData = await AsyncStorage.getItem('userToken');
            setApitoken(apitokenData);
            const onCouturierData = await AsyncStorage.getItem('activeCouturier');
            setActiveCouturier(onCouturierData);
            fetch(ConstEnv.host + ConstEnv.prestation, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': apitokenData,
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.error === 'invalid credentials') {
                        signOut()
                    }
                    if (!responseJson.error) {
                        setPrestaCouturierData(responseJson.couturier);
                        setPrestaClientData(responseJson.client);
                        setIsLoading(true);
                    }
                })
                .catch((error) => { console.error(error) })
        };
        bootdata();
    }, [])

    const [apitoken, setApitoken] = React.useState();
    const [activeCouturier, setActiveCouturier] = React.useState();
    const [isLoading, setIsLoading] = React.useState();
    const [prestaCouturierData, setPrestaCouturierData] = React.useState();
    const [prestaClientData, setPrestaClientData] = React.useState();
    const [prestationShow, setPrestationShow] = React.useState('client');

    const { signOut } = React.useContext(AuthContext);

    console.log('state', activeCouturier, apitoken)
    const prestationView = (userType) => {
        setPrestationShow(userType);
        console.log(userType, prestationShow, isLoading, prestaClientData);
    }

    let prestationRenderView = <ActivityIndicator />;
    if (isLoading && prestationShow === 'client') {
        prestationRenderView = <PrestationList data={prestaClientData} navigation={navigation}/>;
    }
    if (isLoading && prestationShow === 'couturier') {
        prestationRenderView = <PrestationList data={prestaCouturierData} navigation={navigation}/>;
    }

    let prestaHeaderView = <View style={flexDirection.justRow}><Text style={tab.btnClient}>Prestations</Text></View>;
    if (activeCouturier === 'true') {
        prestaHeaderView = <View style={flexDirection.justRow}>
                                <TouchableOpacity onPress={() => prestationView('client')} style={tab.btnCouturier}>
                                    <Text style={tab.btnText}>Client</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => prestationView('couturier')} style={tab.btnCouturier}>
                                    <Text style={tab.btnText}>Couturier</Text>
                                </TouchableOpacity>
                            </View>
    }


    // VIEW
    return (
        <View style={main.page}>
            {prestaHeaderView}
            <ScrollView style={main.scroll}>
                {prestationRenderView}
            </ScrollView>
        </View>
    )

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


