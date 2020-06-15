import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, Vibration, ActivityIndicator } from 'react-native';

import { Notifications } from 'expo';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

// import AsyncStorage from '@react-native-community/async-storage';


import { AuthContext } from './Context/AuthContext';
import { ConstEnv } from "./components/tools/ConstEnv";

import { Login } from './components/Login';
import { SingUp } from './components/SignUp';
import { Search, SearchStackScreen } from './components/Search/Search';
import { ProfilStackScreen } from './Navigation/NavigationProfil';
import { PrestationStackScreen } from './components/Prestations/Prestation';
import { Shop } from './components/Shop/Shop';
import { CGV } from './components/Homepage/CGV';
import { PasswordForgotten } from './components/Homepage/PasswordForgotten';
import { Navigation } from 'react-native-navigation';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator >
        <AuthStack.Screen
            name='Login'
            component={Login}
            options={{
                title: ' ',
                headerShown: false,
            }}
        />
        <AuthStack.Screen
            name='SignUp'
            component={SingUp}
            options={{
                title: ' ',
                headerShown: false,
            }}
        />
        <AuthStack.Screen
            name='cgv'
            component={CGV}
            options={{
                title: ' ',
                headerShown: true,
            }}
        />
        <AuthStack.Screen
            name='passwordForgotten'
            component={PasswordForgotten}
            options={{
                title: ' ',
                headerShown: false,
            }}
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
                        // animationEnabled: false
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
        tabBarTestID
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
            component={SearchStackScreen}
            options={{
                title: 'recherche',
                unmountOnBlur: true
            }}
        />
        <Tabs.Screen
            name='Prestation'
            component={PrestationStackScreen}
            options={{
                title: 'Prestation',
                unmountOnBlur: true
            }}
        />
        {/* <Tabs.Screen
            name='Shop'
            component={Shop}
        /> */}
        <Tabs.Screen
            name='ProfilStack'
            component={ProfilStackScreen}
            options={{
                title: 'Profil',
                unmountOnBlur: true
            }}
        />
    </Tabs.Navigator>
)

export default () => {
    // const navigation = useNavigation();
    const [response, setResponse] = React.useState();
    const [notification, setNotification] = React.useState();
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
        const _notificationSubscription = () => Notifications.addListener(notification => {
            Vibration.vibrate();
            notification.actionId = 'vanillaButton';
            console.log(notification);
            setNotification(notification);
            Notifications.createCategoryAsync('myCategoryName', [
                {
                    actionId: 'vanillaButton',
                    buttonTitle: 'Plain Option',
                    isDestructive: false,
                    isAuthenticationRequired: false,
                },
                {
                    actionId: 'highlightedButton',
                    buttonTitle: 'Destructive!!!',
                    isDestructive: true,
                    isAuthenticationRequired: false,
                },
                {
                    actionId: 'requiredAuthenticationButton',
                    buttonTitle: 'Click to Authenticate',
                    isDestructive: false,
                    isAuthenticationRequired: true,
                },
                {
                    actionId: 'textResponseButton',
                    buttonTitle: 'Click to Respond with Text',
                    textInput: { submitButtonTitle: 'Send', placeholder: 'Type Something' },
                    isDestructive: false,
                    isAuthenticationRequired: false,
                },
            ])
        });
        const bootstrapAsync = async () => {
            let userToken;
            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
        bootstrapAsync();
        _notificationSubscription();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signInContext: async (apitoken) => {
                dispatch({ type: 'SIGN_IN', token: apitoken });
            },
            signUpContext: async (data) => {
                //todoo
                // ()=> navigation.navigate('ProfilClient')
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
