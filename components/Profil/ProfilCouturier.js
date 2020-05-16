import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage, ScrollView, Image, ActivityIndicator, Picker, TouchableHighlight, Modal } from "react-native";
import { styles, main, widthTall, input, text, flexDirection, flexTall, btn, modal } from '../../assets/stylesCustom';
import { Ionicons, AntDesign, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { ConstEnv } from '../tools/ConstEnv';
import * as ImagePicker from 'expo-image-picker';

import { Error } from '../tools/Error';
import { Success } from '../tools/Success';
import { AuthContext } from '../../Context/AuthContext';
import { Navigation } from 'react-native-navigation';

export const ProfilCouturier = ({ navigation }) => {

    React.useEffect(() => {
        const bootData = async () => {
            let data = await AsyncStorage.getItem('imageProfil');
            let token = await AsyncStorage.getItem('userToken');
            let usernameStorage = await AsyncStorage.getItem('username');
            let bioStorage = await AsyncStorage.getItem('bio');
            let activeCouturierStorage = await AsyncStorage.getItem('activeCouturier');
            data != null ? setImageProfil(data) : '';
            token != null ? setApitoken(token) : setApitoken(null);
            usernameStorage != null ? setUsername(usernameStorage) : setUsername(null);
            activeCouturierStorage === 'true' ? setActiveCouturier(true) : setActiveCouturier(false);
            if (bioStorage != null) {
                setBio(bioStorage);
            };
            //LOAD retouche
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
                        let array = [];
                        responseJson.forEach(element => {
                            array.push({
                                id: element.id,
                                active: false,
                                value: element.value,
                                type: element.type,
                                description: element.description,
                                categoryRetouching: element.categoryRetouching,
                                supplyCost: '',
                            });
                        });
                        setSendData(array)
                    } else {
                        setDataRetouche(null)
                    }
                })
            //LOAD wallet
            fetch(ConstEnv.host + ConstEnv.mangopayWallet, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': token,
                },
            })
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.error === 'invalid credentials') {
                        signOut()
                    } if (!responseJson.error) {
                        setMangoWallet(responseJson.wallet)
                    }
                })
        };
        bootData();
    }, [])

    const [dataRetouche, setDataRetouche] = React.useState();
    const [imageProfil, setImageProfil] = React.useState();
    const [apitoken, setApitoken] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const [bio, setBio] = React.useState('');
    const [mangoWallet, setMangoWallet] = React.useState();
    const [sendData, setSendData] = React.useState();
    const [errorResponse, setErrorResponse] = React.useState();
    const [errorResponse2, setErrorResponse2] = React.useState();
    const [errorResponse3, setErrorResponse3] = React.useState();
    const [modalVisibleT, setModalVisibleT] = React.useState(false);
    const [modalVisibleBA, setModalVisibleBA] = React.useState(false);
    const [activeCouturier, setActiveCouturier] = React.useState();
    const [bankAccounts, setBankAccounts] = React.useState();
    const [iban, setIban] = React.useState();
    const [bic, setBic] = React.useState();
    const [ownerName, setOwnerName] = React.useState();
    const [bankAccountSelect, setBankAccountSelect] = React.useState();
    const [debitAmount, setDebitAmount] = React.useState();

    const imageProfilDefault = '../../assets/default-profile.png';

    const { signOut } = React.useContext(AuthContext);

    //Update Retouche
    const updateProfil = () => {
        let errorData = false;
        if (bio.length > 250) {
            errorData = true;
            setErrorResponse(<Error message={'bio trop longue. (max 250 caratères)'} />);
        }
        if (!errorData) {
            const bodyContent = {
                bio: bio,
                activeCouturier: activeCouturier,
            };
            fetch(ConstEnv.host + ConstEnv.updateUser, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': apitoken,
                },
                body: JSON.stringify(bodyContent)
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.error === 'invalid credentials') {
                        signOut()
                    }
                    if (!responseJson.error) {
                        setErrorResponse(<Success message={responseJson.message} />);
                        AsyncStorage.setItem('bio', bio)
                    } else {
                        setErrorResponse(<Error message={responseJson.message} />);
                    }
                })
        }
    }

    //IMAGE PICKER
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({ base64: true });
        if (pickerResult.cancelled === true) {
            return;
        }
        setImageProfil('data:image/jpeg;base64,' + pickerResult.base64);
        AsyncStorage.setItem('imageProfil', 'data:image/jpeg;base64,' + pickerResult.base64)
        const blob = new Blob([JSON.stringify('data:image/jpeg;base64,' + pickerResult.base64, null, 2)]);
        fetch(ConstEnv.host + ConstEnv.imageProfil, {
            method: 'POST',
            headers: {
                'X-AUTH-TOKEN': apitoken
            },
            body: blob,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error === 'invalid credentials') {
                    signOut()
                }
                // TODO 
                if (!responseJson.error) {
                    setErrorResponse(<Success message={responseJson.message} />);
                } else {
                    setErrorResponse(<Error message={responseJson.message} />);
                }
            })
    };

    let imageSource = <Image resizeMethod="resize" source={require(imageProfilDefault)} style={styles.thumbnail} />;
    if (imageProfil) {
        imageSource = <Image resizeMethod="resize" source={{ uri: imageProfil }} style={styles.thumbnail} />
    }

    let walletView = <ActivityIndicator />
    if (mangoWallet) {
        walletView = (
            <View style={{ flex: 5, backgroundColor: 'white', flexDirection: 'row', margin: 10 }}>
                <View style={flexTall.flex4}></View>
                <Text style={{ fontSize: 24 }} >{mangoWallet.Balance.Amount}  <FontAwesome style={flexTall.flex1} size={24} name='euro' /></Text>
            </View>
        )
    }

    const loadBanbkAccounts = () => {
        setModalVisibleT(true);
        fetch(ConstEnv.host + ConstEnv.bankAccount, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': apitoken,
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.error === 'invalid credentials') {
                    signOut()
                } if (!responseJson.error) {
                    setBankAccounts(responseJson.bankAccounts)
                }
            })
    }

    const createBankAccount = () => {
        let data = {
            activeCouturier: true,
            bankAccount: {
                ownerName: ownerName,
                IBAN: iban,
                BIC: bic
            },
        }
        fetch(ConstEnv.host + ConstEnv.bankAccount, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': apitoken,
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error === 'invalid credentials') {
                    signOut()
                }
                if (!responseJson.error) {
                    setModalVisibleBA(!modalVisibleBA)
                    loadBanbkAccounts();
                    setErrorResponse2(undefined);
                } else {
                    setErrorResponse2(<Error message={JSON.stringify(responseJson.bankAccount.Message)} />);
                }
            })
    }
    const bankAccountSelected = (item) => {
        setBankAccountSelect(item.Id);
    }

    let listBankAccountsView = <ActivityIndicator />;
    if (bankAccounts) {
        if (bankAccounts.length > 0) {
            listBankAccountsView = (bankAccounts).map((item, i) => {
                return (
                    <View key={i} style={bankAccountSelect === item.Id ? main.tileCardSelect : main.tileCard}>
                        <TouchableOpacity
                            onPress={() => bankAccountSelected(item)}
                        >
                            <View style={flexDirection.rowBetween}>
                                <Text style={text.sizeSmall}>IBAN: {item.Details.IBAN}</Text>
                            </View>
                            {/* <Text style={text.sizeSmall}>Numéro de carte: {item.Alias}</Text> */}
                        </TouchableOpacity>
                    </View>
                )
            })
        } else {
            listBankAccountsView = <View style={{ margin: 15 }}><Text>Aucun</Text></View>
        }

    }

    const sendPayOutBankWire = () => {
        if (bankAccountSelect && debitAmount > 0 && debitAmount <= mangoWallet.Balance.Amount) {
            let data = {
                'debitAmount': debitAmount * 100,
                'bankAccountId': bankAccountSelect
            };
            fetch(ConstEnv.host + ConstEnv.payOutBankWire, {
                method: 'POST',
                headers: {
                    'X-AUTH-TOKEN': apitoken,
                    "Accept": 'application/json',
                    "Content-type": 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson)
                    if (responseJson.error === 'invalid credentials') {
                        signOut()
                    }
                    if (!responseJson.error) {
                        setModalVisibleT(!modalVisibleT)
                        setErrorResponse3(undefined);
                        setErrorResponse(<Error message={responseJson.message} />)
                    } else {
                        setErrorResponse3(<Error message={JSON.stringify(responseJson.payOut.ResultMessage)} />);
                    }
                })
        }
    }

    return (
        <ScrollView style={main.scroll}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
                <View style={main.tile}>
                    <View style={flexDirection.row}>
                        <View style={flexTall.flex1}></View>
                        <View style={flexTall.flex2}>
                            <TouchableOpacity onPress={openImagePickerAsync} >
                                {imageSource}
                            </TouchableOpacity>
                            <Text style={{ textAlign: 'center', fontSize: 24 }}>{username}</Text>
                        </View>
                        <View style={flexTall.flex1}>
                            <TouchableOpacity
                                style={btn.primaire}
                                onPress={() => navigation.navigate('BecomeCouturier', {
                                    retouches: sendData
                                })}
                            >
                                <Text style={text.sizeSmall}>Mode Client</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={flexDirection.row}>
                        <View style={flexTall.flex1}></View>
                        <View style={flexTall.flex5}>
                            <TextInput
                                multiline={true}
                                numberOfLines={5}
                                style={input.textarea}
                                placeholder='Entré votre bio'
                                onChangeText={setBio}
                                defaultValue={bio}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                                <TouchableOpacity style={btn.primaire} onPress={() => updateProfil()}>
                                    <Text style={text.sizeSmall}>Valider</Text>
                                </TouchableOpacity>
                            </View>
                            {/* {errorResponse} */}
                        </View>
                        <View style={flexTall.flex1}></View>
                    </View>
                </View>
                <View style={main.tile}>
                    <Text style={text.sizeMedium}>Porte-Monnaie</Text>
                    <View style={flexDirection.row}>
                        <View style={flexTall.flex1}></View>
                        {walletView}
                        <View style={flexTall.flex1}></View>
                    </View>
                    <View style={flexDirection.row}>
                        <View style={flexTall.flex1}></View>
                        <View style={flexTall.flex5}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                                <TouchableOpacity style={btn.primaire} onPress={() => { loadBanbkAccounts() }}>
                                    <Text style={text.sizeSmall}>Virement</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={flexTall.flex1}></View>
                    </View>
                </View>
            </View>
            {errorResponse}



            {/* MODAL PayOut*/}
            <Modal
                visible={modalVisibleT}
                animationType="fade"
                transparent={true}>
                <View style={modal.centeredView}>
                    <View style={modal.modalView}>
                        <Text style={{ fontSize: 24, marginBottom: 10, textAlign: 'right' }}>Choisir un compte</Text>
                        <View style={flexDirection.row}>
                            <View style={flexTall.flex3}></View>
                            <View style={flexTall.flex2}>
                                <TouchableOpacity
                                    style={btn.primaire}
                                    onPress={() => setModalVisibleBA(true)}
                                >
                                    <Text style={text.sizeSmall}><AntDesign name="plus" size={20} color="black" /> Compte</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            {listBankAccountsView}
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <TextInput
                                keyboardType={'numeric'}
                                style={input.signUp}
                                placeholder={'Montant'}
                                defaultValue={debitAmount}
                                onChangeText={setDebitAmount}
                            />
                        </View>
                        <View style={flexDirection.row}>
                            <View style={flexTall.flex2}>
                                <TouchableHighlight
                                    style={btn.decline}
                                    onPress={() => { setModalVisibleT(!modalVisibleT) }}>
                                    <Text style={{ fontSize: 16 }}>Fermer</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={flexTall.flex1}></View>
                            <View style={flexTall.flex2}>
                                <TouchableHighlight
                                    style={btn.accept}
                                    onPress={() => { sendPayOutBankWire() }}>
                                    <Text style={{ fontSize: 16 }}>Confirmer</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        {errorResponse3}
                    </View>
                </View>
            </Modal>
            {/* MODAL +BankAccount */}
            <Modal
                visible={modalVisibleBA}
                animationType="fade"
                transparent={true}>
                <View style={modal.centeredView}>
                    <View style={modal.modalView}>
                        <View>
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
                        <View style={flexDirection.justRow}>
                            <View style={flexTall.flex3}>
                                <TouchableHighlight
                                    style={btn.decline}
                                    onPress={() => {
                                        setModalVisibleBA(!modalVisibleBA);
                                    }}
                                >
                                    <Text style={{ fontSize: 24 }}>Fermer</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={flexTall.flex1}></View>
                            <View style={flexTall.flex3}>
                                <TouchableHighlight
                                    style={btn.primaire}
                                    onPress={() => createBankAccount()}>
                                    <Text style={text.btnPrimaire}>Virement</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{ marginBottom: 36 }}>
                                {errorResponse2}
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal visible={modalVisibleConfirm}
                animationType="fade"
                transparent={true}>
                <View style={modal.centeredView}>
                    <View style={modal.modalView}>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}