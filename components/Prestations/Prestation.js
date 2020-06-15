import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, AsyncStorage, ActivityIndicator, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { styles, main, flexDirection, tab } from "../../assets/stylesCustom";
import { DetailInProgress } from './DetailInProgress';
import { ConstEnv } from '../tools/ConstEnv';
import { PrestationList } from './PrestationList';
import { AuthContext } from '../../Context/AuthContext';
import { CardRegistrationForm } from './CardRegistrationForm';
import { PaymentForm } from './PaymentForm';
import { DetailFinished } from './DetailFinished';
import { Rating } from '../tools/Rating';


export const Prestations = ({ navigation, route }) => {


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
                        setPrestationShow(true)
                    }
                })
                .catch((error) => { console.error(error) })
        };
        bootdata();
    }, [])

    const [apitoken, setApitoken] = React.useState();
    const [activeCouturier, setActiveCouturier] = React.useState(true);
    const [prestationShow, setPrestationShow] = React.useState();
    const [isLoading, setIsLoading] = React.useState();
    const [prestaCouturierData, setPrestaCouturierData] = React.useState();
    const [prestaClientData, setPrestaClientData] = React.useState();
    const [response, setResponse] = React.useState()

    const { signOut } = React.useContext(AuthContext);

    const prestationView = () => {
        setPrestationShow(!prestationShow);
        setActiveCouturier(!activeCouturier)
    }

    if (route.params && route.params.response && response === undefined) {
        setResponse(route.params.response)
    }

    let prestationRenderView = <ActivityIndicator />;
    if (isLoading && prestationShow === true) {
        prestationRenderView = <PrestationList data={prestaClientData} navigation={navigation} response={response} />;
    }
    if (isLoading && prestationShow === false) {
        prestationRenderView = <PrestationList data={prestaCouturierData} navigation={navigation} response={response} />;
    }

    let prestaHeaderView = <Text style={tab.btnClient}>Prestations</Text>;
    activeCouturier === 'true' ?
        prestaHeaderView = <TouchableOpacity onPress={() => prestationView()} style={tab.btnCouturier}><Text style={tab.btnText}>Client</Text></TouchableOpacity>
        :
        prestaHeaderView = <TouchableOpacity onPress={() => prestationView()} style={tab.btnCouturier}><Text style={tab.btnText}>Couturier</Text></TouchableOpacity>;

    // VIEW
    return (
        <ScrollView style={main.scroll}>
            <View style={flexDirection.justRowEnd}>
                {prestaHeaderView}
            </View>

            <View style={flexDirection.justRowEnd}>
                
            </View>
            <View style={flexDirection.justRowEnd}>
                {prestationRenderView}
            </View>
        </ScrollView>
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
                name='PrestationInProgress'
                component={DetailInProgress}
                options={{
                    headerShown: true,
                    title: ''
                }}
            />
            <PrestationStack.Screen
                name='DetailFinished'
                component={DetailFinished}
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
                    heardershow: true,
                    title: 'Formulaire carte bancaire'
                }}
            />
            <PrestationStack.Screen
                name="Rating"
                component={Rating}
                options={{
                    headerShown: true,
                    title: 'Laissez un commentaire'
                }}
            />
        </PrestationStack.Navigator>
    )
}


