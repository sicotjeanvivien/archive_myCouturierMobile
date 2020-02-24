import {StyleSheet } from "react-native";


const color = {
    white: "rgb(255,255,255)", 
    colorBackGrouds: 'rgba(192,192,192, 100)',
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.colorBackGrouds,
        flex: 1
    },
    title: {
        flexDirection: 'row',
        fontSize: 40,
        color: 'rgb(255,195,11)',

    },
    input: {
        margin: 15,
        // height: 40,
        width: 256,
        padding: 5,
        fontSize: 16,
        backgroundColor: color.white,
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
        backgroundColor: color.colorBackGrouds,
        color: 'rgb(255,195,11)',
        alignItems: 'center',
    },
    profilStack: {
        borderTopWidth: 3,
        borderColor: 'rgba(224,224,224, 100)'
    }

})

export default styles;