import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

// import AsyncStorage from '@react-native-community/async-storage';


import { AuthContext } from './Context/AuthContext';
import { ConstEnv } from "./components/tools/ConstEnv";

import { Login } from './components/Login';
import { SingUp } from './components/SignUp';
import { Search } from './components/Search/Search';
import { ProfilStackScreen } from './Navigation/NavigationProfil';
import { PrestationStackScreen } from './components/Prestations/Prestation';
import { Shop } from './components/Shop/Shop';
import { CGV } from './components/Homepage/CGV';
import { PasswordForgotten } from './components/Homepage/PasswordForgotten';

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
    <AuthStack.Screen
      name='cgv'
      component={CGV}
    />
    <AuthStack.Screen
      name='passwordForgotten'
      component={PasswordForgotten}
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
      signInContext: async (apitoken) => {
        dispatch({ type: 'SIGN_IN', token: apitoken });
      },
      signUpContext: async (data) => {
        //todoo
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
