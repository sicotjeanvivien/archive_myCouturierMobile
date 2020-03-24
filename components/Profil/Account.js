import * as React from 'react';
import { ScrollView, View, Text, Switch, TouchableOpacity, TextInput, AsyncStorage } from "react-native";
import {styles} from '../../assets/stylesCustom';
import { ConstEnv } from '../../ConstEnv';
import Test from '../Test'
import { Error } from '../tools/Error';
import { Success } from '../tools/Success';

export const Account = ({ navigation }) => {

    React.useEffect(() => {
        const bootData = async () => {
            setEmail(await AsyncStorage.getItem('email'));
            setFirstname(await AsyncStorage.getItem('firstname'));
            setUsertoken(await AsyncStorage.getItem('userToken'));
            setUername(await AsyncStorage.getItem('username'));
            setLastname(await AsyncStorage.getItem('lastname'));
            setId(await AsyncStorage.getItem('id'));
            setPrivateMode(await AsyncStorage.getItem('privateMode'));
        };
        bootData();
    }, [])
    const [userToken, setUsertoken] = React.useState('');
    const [username, setUername] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [id, setId] = React.useState();
    const [privateMode, setPrivateMode] = React.useState();
    const [response, setResponse] = React.useState();

    const updateAccount = () => {
        console.log('start upade account');
        let data = {
            id: Number(id),
            firstname: '',
            lastname: '',
            username: '',
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
        };

        firstname.repeat(1).length > 0 && toString(firstname)
            ? data.firstname = firstname : errorData.firstname.error = true;

        lastname.repeat(1).length > 0 && toString(lastname)
            ? data.lastname = lastname : errorData.lastname.error = true;

        username.repeat(1).length > 0 && toString(username)
            ? data.username = username : errorData.username.error = true;

        email.repeat(1).length > 0 && toString(email) && email.includes('@')
            ? data.email = email : errorData.email.error = true;
        let errors = JSON.stringify(errorData);
        if (!errors.includes("true")) {
            fetch(ConstEnv.host + ConstEnv.updateUser, {
                method: 'PATH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': userToken,
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if (!responseJson.error) {
                        setResponse(<Success message={responseJson.message} />);
                        AsyncStorage.setItem('username', username);
                        AsyncStorage.setItem('firstname', firstname);
                        AsyncStorage.setItem('lastname', lastname);
                        AsyncStorage.setItem('email', email);

                    }else{
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
        console.log('start update password')

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
                    console.log(responseJson)
                    if (!responseJson.error) {
                        setResponse(<Success message={responseJson.message} />);
                    }else{
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
        console.log('start private mode Todoo');
        privateMode ? setPrivateMode(false) : setPrivateMode(true);
        
        fetch(ConstEnv.host + ConstEnv.privateMode, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': userToken,
            },
            body: JSON.stringify({privateMode:privateMode}),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (!responseJson.error) {
                setResponse(<Success message={responseJson.message} />);
                AsyncStorage.setItem('privateMode', privateMode)
            }else{
                setResponse(<Error message={responseJson.message} />);
            }
        })
        .catch((error) => {
            setResponse(<Error message={error} />);
            console.error(error);
        });
        
        console.log(privateMode);
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View>
                {response}
            </View>
            <View style={styles.blocCenter}>
                <Text>
                    Mode privé
                </Text>
                <Switch
                    onValueChange={() => privateModeChange()}
                    value={!privateMode}
                />
            </View>
            <View style={styles.blocCenter}>
                <TextInput
                    style={styles.input}
                    placeholder="Nom d'utilisateur"
                    onChangeText={setUername}
                    defaultValue={username}
                />
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
                <TouchableOpacity
                    style={styles.btnEnter}
                    onPress={() => updateAccount()}
                >
                    <Text style={styles.btnEnterText}>Valider</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.blocCenter}>
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
        </ScrollView>
    )
};