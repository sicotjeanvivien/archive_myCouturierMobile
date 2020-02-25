import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';


import { AuthContext } from './Context/AuthContext';
import { ConstEnv } from "./ConstEnv";

import { SplashScreen } from './components/SplashScreen';
import { Login } from './components/Login';
import SingUp from './components/SignUp';
import { Search } from './components/Search/Search';
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
const RootStackScreen = ({ userToken }) => {
  return (
    <RootStack.Navigator headerMode="none">
      {userToken ? (
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
      tabBarIcon:({focused,color,size})=>{
        let iconName;
        if (route.name === 'Search') {
          return <Entypo  name='magnifying-glass' size={size} color={color} />
        } else if(route.name === 'Prestation') {
          return <Entypo  name='scissors' size={size} color={color} />
        }else if(route.name === 'Shop'){
          return <MaterialCommunityIcons name='hanger' size={size} color={color} />
        }else if (route.name === 'ProfilStack') {
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
        title:'recherche'
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
        title :'Profil'
      }}
    />
  </Tabs.Navigator>
)

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
        let header = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
        fetch(ConstEnv.host + ConstEnv.signIn, {
          method: 'POST',
          headers: header,
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
