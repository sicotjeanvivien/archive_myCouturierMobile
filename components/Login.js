import * as React from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationSignin from "../Navigation/NavigationSignin";


const Stack = createStackNavigator();

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://127.0.0.1:8000/login_check',
            username: '',
            password: '',
            NavigationSignin: NavigationSignin,
        }
    }

    _signin = async () => {
        let data = {
            "security": {
                "credentials": {
                    "login": this.state.username,
                    "password": this.state.password
                }
            }
        };
        console.log(data)
        fetch(this.state.url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    };


    render() {
        return (
            <View style={styles.container} >
                <View>
                    <Text style={styles.title}>MyCouturier</Text>
                </View>
                <View >
                    <TextInput
                        style={styles.input}
                        placeholder="Nom d'utilisateur"
                        onChangeText={(username) => this.setState({ username })}
                        value={this.state.username}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />
                    <TouchableOpacity
                        style={styles.btnEnter}
                        onPress={this._signin}
                    >
                        <Text style={styles.btnEnterText}>Connexion</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.btnEnter}
                        onPress={() => this.props.navigation.navigate('SignUp')}
                    >
                        <Text style={styles.btnSignUp}>Inscription</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(119,136,153, 30)',
        flex: 1
    },
    title: {
        flexDirection: 'row',
        fontSize: 40,
        color: 'rgb(255,195,11)',

    },
    input: {
        margin: 15,
        height: 40,
        width: 256,
        padding: 5,
        fontSize: 16,
        backgroundColor: "rgb(255,255,255)",
        // borderWidth:1,
        // borderColor:'rgb(0.0.0)'
    },
    btnEnter: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "rgb(255,195,11)",
        alignItems: 'center',
        // width: 256,
    },
    btnEnterText: {
        color: 'rgb(255,255,255)',
        fontWeight: '100',
        fontSize: 20,
    },
    btnSignUp: {
        justifyContent: 'center',
        fontSize: 20,
        flexDirection: 'row',
        backgroundColor: 'rgba(119,136,153, 40)',
        color: 'rgb(255,195,11)',
        alignItems: 'center',
    }
});