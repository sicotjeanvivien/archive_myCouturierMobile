import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import styles from '../assets/stylesCustom';



export default class SingUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: 'https://127.0.0.1:8000/userapp_create',
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',

    }
  }
  _signupSend = async () => {
    let data = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
    }

    let errorData = {
      firstname: {
        error: false,
        text: 'Valeur non valide'
      },
      lastname: {
        error: false,
        text: 'Valeur non valide'
      },
      username: {
        error: false,
        text: 'Valeur non valide'
      },
      password: {
        error: false,
        text: 'Valeur non valide (8 caratères minimun)'
      },
      passwordConfirm: {
        error: false,
        text: 'Valeur non valide (8 caratères minimun)'
      },
      email: {
        error: false,
        text: 'Adresse email non valide'
      },
    };

    this.state.firstname.length > 0 && toString(this.state.firstname)
      ? data.firstname = this.state.firstname : errorData.firstname.error = true;

    this.state.lastname.length > 0 && toString(this.state.lastname)
      ? data.lastname = this.state.lastname : errorData.lastname.error = true;

    this.state.username.length > 0 && toString(this.state.username)
      ? data.username = this.state.username : errorData.username.error = true;

    this.state.email.length > 0 && toString(this.state.email) && this.state.email.includes('@')
      ? data.email = this.state.email : errorData.email.error = true;

    if (this.state.password.length > 7
      && this.state.passwordConfirm.length > 7
      && toString(this.state.password)
      && toString(this.state.passwordConfirm)
      && this.state.password === this.state.passwordConfirm
    ) {
      data.password = this.state.password;
      data.passwordConfirm = this.state.passwordConfirm;
    } else {
      errorData.password.error = true;
      errorData.passwordConfirm.error = true;
    }
    let errors = JSON.stringify(errorData);

    if (!errors.includes("true")) {
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
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
    }
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nom d'utilisateur"
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
          />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            onChangeText={(lastname) => this.setState({ lastname })}
            value={this.state.lastname}
          />
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            onChangeText={(firstname) => this.setState({ firstname })}
            value={this.state.fisrtname}
          />
          <TextInput
            style={styles.input}
            placeholder="Adresse email"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            autoCompleteType='password'
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmer mot de passe"
            onChangeText={(passwordConfirm) => this.setState({ passwordConfirm })}
            value={this.state.passwordConfirm}
            autoCompleteType='password'
          />
          <TouchableOpacity
            style={styles.btnEnter}
            onPress={this._signupSend}
          >
            <Text style={styles.btnEnterText}>Inscription</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.btnEnter}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={styles.btnSignUp}>connexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
