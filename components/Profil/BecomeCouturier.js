import * as React from 'react';
import { AuthContext } from '../../Context/AuthContext';

import { Error } from '../tools/Error';
import { Success } from '../tools/Success';
import { ScrollView, View, Text, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { main, input, btn, flexDirection, flexTall, text, styles } from '../../assets/stylesCustom';
import { Ionicons, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { ConstEnv } from '../tools/ConstEnv';

export const BecomeCouturier = ({ navigation, route }) => {
    React.useEffect(() => {
        const bootdata = async () => {
            let token = await AsyncStorage.getItem('userToken');
            setApitoken(token);
            setActiveCouturier(await AsyncStorage.getItem('activeCouturier'));
            setRetouches(route.params.retouches);
        }
        bootdata();
    }, [])

    const { signOut } = React.useContext(AuthContext);
    const [activeCouturier, setActiveCouturier] = React.useState();
    const [apitoken, setApitoken] = React.useState();
    const [retouches, setRetouches] = React.useState(route.params.retouches);
    const [errorResponse, setErrorResponse] = React.useState();
    const [iban, setIban] = React.useState();
    const [bic, setBic] = React.useState();
    const [ownerName, setOwnerName] = React.useState();

    const becomeCouturier = () => {
        let data = {
            activeCouturier: true,
            bankAccount: {
                ownerName: ownerName,
                IBAN: iban,
                BIC: bic
            },
            userRetouchingPrice: retouches,
        }
        fetch(ConstEnv.host + ConstEnv.retouching, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': apitoken,
            },
            body: JSON.stringify(data)
        })
        .then((response)=> response.json())
        .then((responseJson)=>{
            if (responseJson.error === 'invalid credentials') {
                signOut()
            }
            if (!responseJson.error) {
                AsyncStorage.setItem('activeCouturier', 'true')
                navigation.navigate('ProfilCouturier');
            } else {
                setErrorResponse(<Error message={JSON.stringify(responseJson.message)} />);
            }
        })


    }

    let retouchesRenderView = <ActivityIndicator />;
    if (retouches) {
        retouchesRenderView = Object.keys(retouches).map((key, i) => {
            return (
                <View key={i}>
                    <View style={flexDirection.rowCenter}>
                        <Text style={{ flex: 6, fontSize: 16 }}>{retouches[key].type}</Text>
                        <TextInput
                            keyboardType='number-pad'
                            textContentType='oneTimeCode'
                            id={retouches[key].id}
                            onChangeText={(value) => {
                                if (value > 0) {
                                    retouches[key].value = Math.round(value);
                                    retouches[key].active = true;
                                } else {
                                    retouches[key].value = '';
                                    retouches[key].active = false;
                                }
                            }}
                            defaultValue={retouches[key].value}
                            style={input.retouche}
                        />
                        <FontAwesome style={flexTall.flex1} size={16} name='euro' />
                    </View>
                    <View key={i} style={flexDirection.row}>
                        <Text style={{ flex: 6, fontSize: 16 }}>cout fourniture</Text>
                        <TextInput

                            keyboardType='number-pad'
                            textContentType='oneTimeCode'
                            onChangeText={(value) => {
                                if (value > 0) {
                                    retouches[key].supplyCost = Math.round(value);
                                } else {
                                    retouches[key].supplyCost = '';
                                }
                            }}
                            defaultValue={retouches[key].supplyCost}
                            style={input.retouche}
                        />
                        <FontAwesome style={flexTall.flex1} size={16} name='euro' />
                    </View>
                </View>
            )
        })
    }

    return (
        <ScrollView style={main.scroll}>
            <View style={main.tile}>
                <Text style={text.sizeMedium}> Information Bancaire</Text>
                <TextInput
                    style={input.signUp}
                    placeholder={'Nom du titulaire du compte'}
                    defaultValue={ownerName}
                    onChangeText={setOwnerName}
                />
                <TextInput
                    style={input.signUp}
                    placeholder={'IBAN'}
                    defaultValue={iban}
                    onChangeText={setIban}
                />
                <TextInput
                    style={input.signUp}
                    placeholder={'BIC'}
                    defaultValue={bic}
                    onChangeText={setBic}
                />
            </View>
            <View style={main.tile}>
                <Text style={text.sizeMedium}>Vos tarifs</Text>
                {retouchesRenderView}
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={btn.primaire}
                    onPress={() => becomeCouturier()}
                >
                    <Text style={text.btnPrimaire}>Devenir Couturier</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 36}}>
                {errorResponse}
            </View>
        </ScrollView>
    )
}
