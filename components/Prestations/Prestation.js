import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "../../assets/stylesCustom";

const Prestations = ({ navigation})=>{
    return (
        <View style={styles.container}>
            <Text>...</Text>
           
        </View>
    );
}

const PrestationStack = createStackNavigator()
export const  PrestationStackScreen = () =>{
    return(
        <PrestationStack.Navigator>
            <PrestationStack.Screen
                name='Prestaions'
                component={Prestations}
                options={{
                    headerShown: false,
                }}
            />
        </PrestationStack.Navigator>
    )
}