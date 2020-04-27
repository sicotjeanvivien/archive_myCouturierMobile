import * as React from 'react';
import { View, Text, ActivityIndicator, ScrollView, AsyncStorage } from 'react-native';
import { styles, main } from '../../assets/stylesCustom';
import { ConstEnv } from '../tools/ConstEnv';
import { AuthContext } from '../../Context/AuthContext';


export const Detail = ({ navigation, route }) => {

    React.useEffect(() => {
        const bootData = async () => {
            let apitokenData = await AsyncStorage.getItem('userToken');
            setApitoken(apitokenData);
            fetch(ConstEnv.host + ConstEnv.prestationDetail + route.params.prestation.id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': apitokenData,
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson);
                    if (responseJson.error === 'invalid credentials') {
                        signOut()
                    }
                   if (responseJson) {
                       setIsloading(true);

                   }
                })
                .catch(error => {
                    console.error(error);
                });
        };
        bootData();
    }, [])

    const [apitoken, setApitoken] = React.useState();
    const [isLoading, setIsloading] = React.useState();
    const [prestation, setPrestation] = React.useState( route.params.prestation);

    const { signOut } = React.useContext(AuthContext);

    const sendAcceptPrestation = ()=>{

    };


let contentPage = <ActivityIndicator />;
if(isLoading){
    if (prestation.state === 'active') {
        return (
            <View style={styles.scrollView}>
                <View>
                    <Text></Text>
                </View>
                <Text>
                    detail presation
                </Text>
            </View>
        )
    } else {
        return (
            <View style={styles.scrollView}>
                <View>
                    <Text></Text>
                </View>
                <Text>
                    detail presation
                </Text>
            </View>
        )
    }
}

    return (
        <ScrollView style={main.scroll}>
            {contentPage}
        </ScrollView>
    )

}
