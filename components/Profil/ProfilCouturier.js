import * as React from 'react';
import { ScrollView, View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import { main, styles } from "../../assets/stylesCustom";


import { Error } from '../tools/Error';
import { Success } from '../tools/Success';
import { AuthContext } from '../../Context/AuthContext';
import { ConstEnv } from '../tools/ConstEnv';

export const ProfilCouturier = () => {

    React.useEffect(() => {
        const bootData = async () => {
            setActiveCouturier(await AsyncStorage.getItem('activeCouturier'));
            setApitoken(await AsyncStorage.getItem('userToken'))
        };
        bootData();
    }, [])

    const [activeCouturier, setActiveCouturier] = React.useState();
    const [apitoken, setApitoken] = React.useState();
    const [errorResponse, setErrorResponse]= React.useState();
    const { signOut } = React.useContext(AuthContext);

    let sendActiveCouturier = () => {
        activeCouturier ? setActiveCouturier(false) : setActiveCouturier(true);
        fetch(ConstEnv.host + ConstEnv.activeCouturier, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': apitoken,
            },
            body: JSON.stringify({ activeCouturier: !activeCouturier })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error === 'invalid credentials') {
                    signOut()
                }
                if (!responseJson.error) {
                    setErrorResponse(<Success message={responseJson.message} />);
                    AsyncStorage.setItem('activeCouturier', responseJson.activeCouturier)
                } else {
                    setErrorResponse(<Error message={responseJson.message} />);
                }
            })

    }


    return (
        <ScrollView Satyle={main.scroll}>
            <View>
                <View style={styles.containerRowEnd}>
                    <TouchableOpacity onPress={() => { sendActiveCouturier() }}>
                        <Text style={styles.inputBecomeCouturier}>'Devenir Couturier'</Text>
                    </TouchableOpacity>
                </View>
                <Text>
                    hello boys!!!
                </Text>
            </View>

        </ScrollView>
    )
}