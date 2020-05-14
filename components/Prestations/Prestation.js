import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, AsyncStorage, ActivityIndicator, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { styles, main, flexDirection, tab } from "../../assets/stylesCustom";
import { Detail } from './Detail';
import { ConstEnv } from '../tools/ConstEnv';
import { PrestationList } from './PrestationList';
import { AuthContext } from '../../Context/AuthContext';
import { CardRegistrationForm } from './CardRegistrationForm';
import { PaymentForm } from './PaymentForm';


export const Prestations = ({ navigation }) => {

    React.useEffect(() => {
        const bootdata = async () => {
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

    const prestationView = (userType) => {
        setPrestationShow(userType);
    }

    let prestationRenderView = <ActivityIndicator />;
    if (isLoading && prestationShow === 'client') {
        prestationRenderView = <PrestationList data={prestaClientData} navigation={navigation} />;
    }
    if (isLoading && prestationShow === 'couturier') {
        prestationRenderView = <PrestationList data={prestaCouturierData} navigation={navigation} />;
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
                    title: ''
                }}
            />
            <PrestationStack.Screen
                name='PaymentForm'
                component={PaymentForm}
                options={{
                    herdershow: true,
                    title: 'Formulaire de payment'
                }}
            />
            <PrestationStack.Screen
                name='CardRegistrationForm'
                component={CardRegistrationForm}
                options={{
                    herdershow: true,
                    title: 'Formulaire carte bancaire'
                }}
            />
        </PrestationStack.Navigator>
    )
}


