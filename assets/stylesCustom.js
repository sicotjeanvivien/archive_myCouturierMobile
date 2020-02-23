import {StyleSheet } from "react-native";


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
    },
    profilStack: {
        borderTopWidth: 5,
        borderColor: 'rgba(119,136,53, 100)'
    }

})

export default styles;