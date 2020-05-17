import * as React from 'react';
import { ScrollView, View, Text, Switch, TouchableOpacity, TextInput, AsyncStorage, KeyboardAvoidingView, Modal, TouchableHighlight } from "react-native";
import { styles, main, modal, flexDirection, btn } from '../../assets/stylesCustom';
import { ConstEnv } from '../tools/ConstEnv';
import { Error } from '../tools/Error';
import { Success } from '../tools/Success';
import { AuthContext } from '../../Context/AuthContext';

export const Account = ({ navigation }) => {

    React.useEffect(() => {
        const bootData = async () => {
            setData(JSON.parse(await AsyncStorage.getItem('data')));
            setEmail(await AsyncStorage.getItem('email'));
            // setEmailConfirm(await AsyncStorage.getItem('email'));
            setFirstname(await AsyncStorage.getItem('firstname'));
            setUsertoken(await AsyncStorage.getItem('userToken'));
            setLastname(await AsyncStorage.getItem('lastname'));
            setId(await AsyncStorage.getItem('id'));
            setPrivateMode(await AsyncStorage.getItem('privateMode'));
        };
        bootData();
    }, [])

    const [data, setData] = React.useState();
    const [userToken, setUsertoken] = React.useState();
    const [emailConfirm, setEmailConfirm] = React.useState();
    const [firstname, setFirstname] = React.useState();
    const [lastname, setLastname] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [passwordConfirm, setPasswordConfirm] = React.useState();
    const [id, setId] = React.useState();
    const [privateMode, setPrivateMode] = React.useState();
    const [response, setResponse] = React.useState();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [confirmEmailHidden, setConfirmEmailHidden] = React.useState(styles.hidden)

    const { signOut } = React.useContext(AuthContext);

    const updateAccount = () => {
        let data = {
            id: Number(id),
            firstname: '',
            lastname: '',
            emailConfirm: '',
            email: '',
        }
        let errorData = {
            firstname: {
                error: false,
                text: 'Prénon non valide. '
            },
            lastname: {
                error: false,
                text: 'Nom non valide. '
            },
            username: {
                error: false,
                text: "nom d'utilisateur non valide. "
            },
            email: {
                error: false,
                text: 'Adresse email non valide. '
            },
            emailConfirm: {
                error: false,
                text: 'Confirmation adresse email non valide'
            }
        };

        firstname.length > 0 && toString(firstname)
            ? data.firstname = firstname : errorData.firstname.error = true;

        lastname.repeat(1).length > 0 && toString(lastname)
            ? data.lastname = lastname : errorData.lastname.error = true;

        emailConfirm && emailConfirm.repeat(1).length > 0 && toString(emailConfirm)
            ? data.emailConfirm = emailConfirm : errorData.emailConfirm.error = true;

        email.repeat(1).length > 0 && toString(email) && email.includes('@')
            ? data.email = email : errorData.email.error = true;
        let errors = JSON.stringify(errorData);
        if (!errors.includes("true")) {
            fetch(ConstEnv.host + ConstEnv.updateUser, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': userToken,
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.error === 'invalid credentials') {
                        signOut()
                    }
                    if (!responseJson.error) {
                        setResponse(<Success message={responseJson.message} />);
                        // AsyncStorage.setItem('username', username);
                        AsyncStorage.setItem('firstname', firstname);
                        AsyncStorage.setItem('lastname', lastname);
                        AsyncStorage.setItem('email', email);

                    } else {
                        setResponse(<Error message={responseJson.message} />);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            let message = '';
            for (const key in errorData) {
                if (errorData.hasOwnProperty(key)) {
                    const elem = errorData[key];
                    if (elem.error) {
                        message += elem.text;
                    }
                }
            }
            setResponse(<Error message={message} />);
        }
    };

    const updatePassword = () => {
        let data = {
            password: '',
            passwordConfirm: '',
        };
        let errorData = {
            password: {
                error: false,
                text: 'Valeur non valide (8 caratères minimun)'
            },
            passwordConfirm: {
                error: false,
                text: 'Valeur non valide (8 caratères minimun)'
            },
        };
        if (password.repeat(1).length > 7
            && passwordConfirm.repeat(1).length > 7
            && toString(password)
            && toString(passwordConfirm)
            && password === passwordConfirm
        ) {
            data.password = password;
            data.passwordConfirm = passwordConfirm;
        } else {
            errorData.password.error = true;
            errorData.passwordConfirm.error = true;
        }
        let errors = JSON.stringify(errorData);
        if (!errors.includes("true")) {
            fetch(ConstEnv.host + ConstEnv.updatePassword, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': userToken,
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.error === 'invalid credentials') {
                        signOut()
                    }
                    if (!responseJson.error) {
                        setResponse(<Success message={responseJson.message} />);
                    } else {
                        setResponse(<Error message={responseJson.message} />);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            let message = '';
            for (const key in errorData) {
                if (errorData.hasOwnProperty(key)) {
                    const elem = errorData[key];
                    if (elem.error) {
                        message += elem.text;
                    }
                }
            }
            setResponse(<Error message={message} />);
        }

    }

    const privateModeChange = () => {
        privateMode ? setPrivateMode(false) : setPrivateMode(true);

        fetch(ConstEnv.host + ConstEnv.privateMode, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': userToken,
            },
            body: JSON.stringify({ privateMode: privateMode }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error === 'invalid credentials') {
                    signOut()
                }
                if (!responseJson.error) {
                    setResponse(<Success message={responseJson.message} />);
                    AsyncStorage.setItem('privateMode', privateMode)
                } else {
                    setResponse(<Error message={responseJson.message} />);
                }
            })
            .catch((error) => {
                setResponse(<Error message={error} />);
                console.error(error);
            });
    }

    const sendDeleteAccount = () => {
        fetch(ConstEnv.host + ConstEnv.deleteAccount, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': userToken,
            },
            body: JSON.stringify({ email: email }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error === 'invalid credentials') {
                    signOut()
                }
                if (!responseJson.error) {
                    signOut()
                } else {
                    setResponse(<Error message={responseJson.message} />);
                }
            })
    }

    return (

        <ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
                {/* <KeyboardAvoidingView style={styles.container} behavior="padding" enabled> */}
                <View>
                    {response}
                </View>
                <View>
                    <Text>
                        Mode privé
                </Text>
                    <Switch
                        onValueChange={() => privateModeChange()}
                        value={!privateMode}
                    />
                </View>
                <View style={main.tile}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nom"
                        onChangeText={setLastname}
                        defaultValue={lastname}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Prénom"
                        onChangeText={setFirstname}
                        defaultValue={firstname}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Adresse email"
                        onChangeText={setEmail}
                        defaultValue={email}
                    />
                    {
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmation adresse email"
                            onChangeText={setEmailConfirm}
                            defaultValue={emailConfirm}
                        />
                    }
                    <TouchableOpacity
                        style={styles.btnEnter}
                        onPress={() => updateAccount()}
                    >
                        <Text style={styles.btnEnterText}>Valider</Text>
                    </TouchableOpacity>
                </View>
                <View style={main.tile}>
                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmer mot de passe"
                        onChangeText={setPasswordConfirm}
                        value={passwordConfirm}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={styles.btnEnter}
                        onPress={() => updatePassword()}
                    >
                        <Text style={styles.btnEnterText}>Valider</Text>
                    </TouchableOpacity>
                </View>
                <View style={main.tile}>
                    <Modal
                        animationType="fade"
                        visible={modalVisible}
                        presentationStyle='overFullScreen'
                        transparent={true}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={modal.centeredView}>
                            <View style={modal.modalView}>
                                <Text>Supprimer compte?</Text>
                                <View style={flexDirection.row}>
                                    <TouchableOpacity
                                        style={modal.btnCancel}
                                        onPress={() => {
                                            setModalVisible(!modalVisible);
                                        }}>
                                        <Text>Annuler</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={modal.btnConfirm}
                                        onPress={() => {
                                            setModalVisible(!modalVisible);
                                            sendDeleteAccount();
                                        }}>
                                        <Text>Confirmer</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <TouchableHighlight
                        style={btn.decline}
                        onPress={() => { setModalVisible(true) }}
                    >
                        <Text style={{textAlign:'center'}}>Supprimer le compte</Text>
                    </TouchableHighlight>
                </View>
            </View>
            {/* </KeyboardAvoidingView> */}
        </ScrollView>
    )
};