import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from './Context/AuthContext';

import SplashScreen from './components/SplashScreen';
import { Home } from './components/Home';
import { Login } from './components/Login';
import SingUp from './components/SignUp';

const AuthStack = createStackNavigator();
const AuthStackScreen = ()=>(
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen 
      name ='Login'
      component={Login}
      options={{title:''}}
    />
    <AuthStack.Screen 
      name ='SignUp'
      component={SingUp}
      options={{title:''}}
    />
  </AuthStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            animationEnabled: false
          }}
        />
      )}
  </RootStack.Navigator>
);

const url = {
  signIn :'https://127.0.0.1:8000/login_check',
  signUp: '', 

};

export default () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const authContext = React.useMemo(() => {
    return {
      signIn: (elem) => {
        setIsLoading(false);
        let data = {
          "security": {
            "credentials": {
              "login": elem.username,
              "password": elem.password
            }
          }
        };
        console.log(data)
        fetch(url.signIn, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.token) {
              setUserToken(responseJson.token);
            } else {
              alert(responseJson.error)
            }
            console.log(AsyncStorage.getItem('userToken'))
            // console.log(this.props)
          })
          .catch((error) => {
            console.error(error);
          });
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      }
    };
  }, []);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
