import * as React from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, AsyncStorage } from "react-native";
import { AuthContext } from './../Context/AuthContext';

export const Login = ({navigation}) => {
    const { signIn } = React.useContext(AuthContext);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={styles.container} >
            <View>
                <Text style={styles.title}>MyCouturier</Text>
            </View>
            <View >
                <TextInput
                    style={styles.input}
                    placeholder="Nom d'utilisateur"
                    onChangeText={setUsername}
                    value={username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    onChangeText={setPassword}
                    value={password}
                />
                <TouchableOpacity
                    style={styles.btnEnter}
                    onPress={() => signIn({username, password})}
                >
                    <Text style={styles.btnEnterText}>Connexion</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.btnEnter}
                    onPress={() =>navigation.navigate('SignUp', { screen: 'SignUp' })}
                >
                    <Text style={styles.btnSignUp}>Inscription</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
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