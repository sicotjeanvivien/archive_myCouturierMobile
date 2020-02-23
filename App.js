import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AuthContext } from './Context/AuthContext';

import {SplashScreen} from './components/SplashScreen';
import { Login } from './components/Login';
import SingUp from './components/SignUp';
import { Search } from './components/Search/Search';
import { Message } from './components/Messages/Message';
import {ProfilStackScreen } from './Navigation/NavigationProfil';

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
const RootStackScreen = ({ userToken }) =>{ 
 return(
    <RootStack.Navigator headerMode="none">
    { userToken ? (
      <RootStack.Screen
      name="Tab"
      component={TabsScreen}
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
} 

const Tabs = createBottomTabNavigator();
const TabsScreen = ()=>(
  <Tabs.Navigator>
    <Tabs.Screen 
      name='Search'
      component={Search}
    />
    <Tabs.Screen 
      name='Message'
      component={Message}
    />
    <Tabs.Screen 
      name='ProfilStack'
      component={ProfilStackScreen}
    />
  </Tabs.Navigator>
)




const url = {
  signIn :'https://127.0.0.1:8000/login_check',
  signUp: '', 

};

export default () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState('null');

  // AsyncStorage.getItem('userToken').then() === null ?null: AsyncStorage.getItem('userToken') 


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
              AsyncStorage.setItem('userToken', responseJson.token)
            } else {
              alert(responseJson.error)
            }
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
        AsyncStorage.removeItem('userToken');
        // console.log(AsyncStorage.getItem('userToken'))
      }
    };
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  // AsyncStorage.getItem('userToken') === null ? setUserToken(null) : setUserToken(1) ;

  // console.log(userToken);
  // console.log(AsyncStorage.getItem('userToken'))

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
