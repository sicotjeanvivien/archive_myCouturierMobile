import { StyleSheet, Dimensions } from "react-native";


const color = {
    white: "rgb(255,255,255)",
    colorBackGrouds: 'rgba(192,192,192, 100)',
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor: color.colorBackGrouds,
    },
    blocCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.colorBackGrouds,
    },
    containerRow: {
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-around',
    },
    title: {
        flexDirection: 'row',
        fontSize: 30,
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
        alignContent: 'center',
        flexDirection: 'row',
        backgroundColor: "rgb(255,195,11)",
        alignItems: 'center',
        // width: 256,
    },
    btnEnterText: {
        color: 'rgb(255,255,255)',
        // fontWeight: '100',
        padding: 5,
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
    },
    show: {
        display: 'flex',
    },
    hidden: {
        display: 'none',
    },
    error_reponse: {
        color: '#d8000c',
        backgroundColor: '#ffd2d2',
        marginTop: 10,
        padding: 12,
    },
    success_reponse: {
        color: '#4f8a10',
        backgroundColor: '#dff2bf',
        marginTop: 10,
        padding: 12,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    thumbnail: {
        width: 100,
        height: 100,
        resizeMode: "contain"
    },


})

export default styles;



