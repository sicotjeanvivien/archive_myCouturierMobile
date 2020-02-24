import * as React from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, AsyncStorage } from "react-native";
import { AuthContext } from '../Context/AuthContext';
import styles from '../assets/stylesCustom'

export const Login = ({navigation}) => {
    const { signIn } = React.useContext(AuthContext);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={styles.container} >
            <View>
                <Text style={styles.title}>MyCouturier</Text>
            </View>
            <View>
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


