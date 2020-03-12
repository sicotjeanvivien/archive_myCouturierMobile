import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

// import AsyncStorage from '@react-native-community/async-storage';


import { AuthContext } from './Context/AuthContext';
import { ConstEnv } from "./ConstEnv";

import { Login } from './components/Login';
import {SingUp} from './components/SignUp';
import  Search  from './components/Search/Search';
import { ProfilStackScreen } from './Navigation/NavigationProfil';
import { PrestationStackScreen } from './components/Prestations/Prestation';
import { Shop } from './components/Shop/Shop';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name='Login'
      component={Login}
      options={{ title: '' }}
    />
    <AuthStack.Screen
      name='SignUp'
      component={SingUp}
      options={{ title: '' }}
    />
  </AuthStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ state }) => {
  return (
    <RootStack.Navigator headerMode="none">
      {state.userToken ? (
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
const TabsScreen = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Search') {
          return <Entypo name='magnifying-glass' size={size} color={color} />
        } else if (route.name === 'Prestation') {
          return <Entypo name='scissors' size={size} color={color} />
        } else if (route.name === 'Shop') {
          return <MaterialCommunityIcons name='hanger' size={size} color={color} />
        } else if (route.name === 'ProfilStack') {
          return <FontAwesome name='user' size={size} color={color} />
        }
        return <FontAwesome name='question' size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tabs.Screen
      name='Search'
      component={Search}
      options={{
        title: 'recherche'
      }}
    />
    <Tabs.Screen
      name='Prestation'
      component={PrestationStackScreen}
      options={{
        title: 'Prestation'
      }}
    />
    <Tabs.Screen
      name='Shop'
      component={Shop}
    />
    <Tabs.Screen
      name='ProfilStack'
      component={ProfilStackScreen}
      options={{
        title: 'Profil'
      }}
    />
  </Tabs.Navigator>
)

export default () => {
  const [response, setResponse] = React.useState();
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (elem) => {
        // dispatch({ type: 'SIGN_IN', token: 'responseJson.apitoken' });
        console.log( ConstEnv.host + ConstEnv.signIn)
        let data = {
          "security": {
            "credentials": {
              "login": elem.username,
              "password": elem.password
            }
          }
        };
        let header = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
        console.log(data)
        fetch(ConstEnv.host + ConstEnv.signIn, {
          method: 'POST',
          headers: header,
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.apitoken) {
              console.log(responseJson)
              dispatch({ type: 'SIGN_IN', token: responseJson.apitoken });
              AsyncStorage.setItem('userToken', responseJson.apitoken);
              AsyncStorage.setItem('username', responseJson.username);
              AsyncStorage.setItem('firstname', responseJson.firstname);
              AsyncStorage.setItem('lastname', responseJson.lastname);
              AsyncStorage.setItem('email', responseJson.email);
              AsyncStorage.setItem('id', responseJson.id);
              AsyncStorage.setItem('privateMode', responseJson.privateMode);
              AsyncStorage.setItem('imageProfil', responseJson.imageProfil);
              AsyncStorage.setItem('bio', responseJson.bio);
              AsyncStorage.setItem('activeCouturier', responseJson.activeCouturier);
            } else {
              console.log(<Error message={responseJson.message} />)
              dispatch({ type: 'SIGN_OUT' })
            }
          })
          .catch((error) => {
            console.error(error);
          });
         
      },
      signUpContext: async (data) => {
        //todoo
        console.log(data)

        dispatch({ type: 'SIGN_IN', token: data });
      },
      signOut: () => {
        AsyncStorage.clear();
        dispatch({ type: 'SIGN_OUT' })
        AsyncStorage.getAllKeys();
      },
    }),
    []
  );

  if (state.isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen state={state} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
