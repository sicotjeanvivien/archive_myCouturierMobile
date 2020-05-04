import { StyleSheet, Dimensions } from "react-native";

const widthWindows = Dimensions.get('window').width;
const heightWindows = Dimensions.get('window').height;

const color = {
    white: "rgb(255,255,255)",
    colorBackGrouds: 'rgba(192,192,192, 100)',
    yellow: 'rgb(255,195,11)',
    black: 'black',
    red: 'red',
    green: 'green'
};

export const main = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: color.colorBackGrouds,
        // padding: 10,
        paddingTop: 24,
        width: Dimensions.get('window').width
    },
    scroll: {
        flex: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: color.colorBackGrouds,
        padding: 10,
        paddingTop: 24,
        paddingBottom: 48,
        // marginBottom:64,
    },
    backgroundColor: { backgroundColor: color.colorBackGrouds, zIndex: 100 },
    tile: {
        width: Dimensions.get('screen').width * 0.8,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: color.white,
        borderBottomWidth: 0,
        shadowColor: color.black,
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 0.5,
        shadowRadius: 25,
        padding: 5,
        elevation: 2,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 25,
    },
    tileMap: {
        flexDirection: 'row',
        padding: 5,
        opacity: 0.9,
        backgroundColor: color.white,

    }
});

export const tab = StyleSheet.create({
    btnCouturier:{
        padding: 10,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        width: Dimensions.get('screen').width * 0.5,
    },
    btnCouturierActif:{
        padding: 10,
        borderWidth:2,
        width: Dimensions.get('screen').width * 0.5,
    },
    btnText:{
        textAlign: 'center',
        fontSize: 16
    },
    btnClient:{
        textAlign: 'center',
        fontSize: 28,
        padding: 10,
        borderWidth:2,
        width: Dimensions.get('screen').width ,
    }
});

export const presta = StyleSheet.create({
    listTile:{
        width: Dimensions.get('screen').width * 0.9,
        padding: 10,
    },
    listText:{
        fontSize: 24,
        color: color.yellow,
    },
    listItem:{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: color.white,
        borderBottomWidth: 0,
        shadowColor: color.black,
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 0.5,
        shadowRadius: 25,
        padding: 5,
        elevation: 2,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 25,
    }
});

export const padding = StyleSheet.create({
    small: { padding: 16 }
});

export const margin = StyleSheet.create({
    small: { marginTop: 0 },

});

export const flexDirection = StyleSheet.create({
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    justRow:{flexDirection: 'row'},
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'space-between',
        alignItems: 'flex-start',
    }
})

export const flexTall = StyleSheet.create({
    flex12: { flex: 12 },
    flex10: { flex: 10 },
    flex8: { flex: 8 },
    flex6: { flex: 6 },
    flex4: { flex: 4 },
    flex3: { flex: 3 },
    flex2: { flex: 2 },
    flex1: { flex: 1 },
});

export const widthTall = StyleSheet.create({
    width08: { width: Dimensions.get('screen').width * 0.8, backgroundColor: color.colorBackGrouds, zIndex: 100 }
})

export const positions = StyleSheet.create({
    start: { alignItems: 'flex-start' },
    end: { alignItems: 'flex-end', justifyContent: 'flex-end', alignContent: 'flex-end' },
    center: { alignItems: 'center' }

});

export const linkNavigation = StyleSheet.create({
    profil: {
        padding: 10
    },
    link: {
        borderTopWidth: 3,
        borderColor: 'rgba(224,224,224, 100)',
        padding: 10
    }
})

export const styleImage = StyleSheet.create({
    imageCouturierMap: {
        width: 32,
        height: 32,
        resizeMode: "cover",
        borderRadius: 256
    },
});

export const btn = StyleSheet.create({
    primaire: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: color.yellow,
        maxWidth: Dimensions.get('screen').width * 0.8
    },
    secondaire: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: color.colorBackGrouds,
    },
    accept:{
        backgroundColor: color.green
    },
    decline:{
        backgroundColor: color.red,
        
    }

});

export const text = StyleSheet.create({
    btnPrimaire: {
        color: color.white,
        fontSize: 24,
    },
    btnSecondaire: {
        color: color.yellow,
        fontSize: 24,
    },
    btnTertiaire: {
        color: color.yellow,
        fontSize: 18,
    },
    h1: {
        color: color.yellow,
        fontSize: 52,
        textAlign: "center",
    },
    white: { color: color.white },
    yellow: { color: color.yellow },
    sizeSmall: { fontSize: 12 },
    sizeMedium: { fontSize: 20, color: color.yellow },
    sizeLarge: { fontSize: 24, color: color.yellow },
})

export const input = StyleSheet.create({
    textarea: {
        width: 256,
        height: 128,
        backgroundColor: color.white,
        color: 'black',
        textAlignVertical: 'top',
        textAlign: 'left',
    }
})


export const modal = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: color.black,
        opacity: 0.6,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    btnCancel: {
        backgroundColor: color.red,
        borderRadius: 20,
        margin: 10,
        padding: 5
    },
    btnConfirm: {
        backgroundColor: color.green,
        borderRadius: 20,
        margin: 10,
        padding: 5
    }
})

export const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: color.colorBackGrouds,
        padding: 10,
        paddingTop: 24,
    },
    scrollView: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        // backgroundColor: color.colorBackGrouds,
    },
    blocCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    blocCenterEnd: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: color.colorBackGrouds,
    },
    blocCenterStart: {
        // flex: 2,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        // backgroundColor: color.colorBackGrouds,
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.colorBackGrouds,
    },
    containerRow: {
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-around',
    },
    containerRowEnd: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    },
    title: {
        flexDirection: 'row',
        fontSize: 30,
        color: 'rgb(255,195,11)',

    },
    input: {
        margin: 15,
        // height: 40,
        // width: 256,
        padding: 5,
        backgroundColor: color.white,
        // borderWidth:1,
        // borderColor:'rgb(0.0.0)'
    },
    btnEnter: {
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        backgroundColor: color.yellow,
        alignItems: 'center',
        // padding: 5,
        // width: 256,
        color: 'rgb(255,255,255)',
    },
    btnValide: {
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        backgroundColor: color.yellow,
        alignItems: 'center',
        padding: 5,
        // width: 256,
    },
    btnEnterText: {
        // color: 'rgb(255,255,255)',
        // fontWeight: '100',
        padding: 5,
        fontSize: 20,
    },
    btnSignUp: {
        justifyContent: 'center',
        fontSize: 20,
        flexDirection: 'row',
        backgroundColor: color.colorBackGrouds,
        color: color.yellow,
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
        marginBottom: 10,
        padding: 12,
    },
    success_reponse: {
        color: '#4f8a10',
        backgroundColor: '#dff2bf',
        marginBottom: 10,
        marginTop: 10,
        padding: 12,
    },
    mapStyle: {
        flex: 1,
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
    },
    thumbnail: {
        width: 150,
        height: 150,
        resizeMode: "cover",
        borderRadius: 256
    },
    retoucheView: {
        margin: 15,
        width: 256,
        padding: 5,
        borderWidth: 1,
    },
    text: {
        color: 'black',
        fontSize: 14
    },
    textInfo: {
        color: 'rgb(0,0,0)',
        fontSize: 11,
    },
    inputRetouche: {
        backgroundColor: 'rgb(255,255,255)',
        width: 32,
    },
    inputBecomeCouturier: {
        width: 64,
        margin: 10,
        fontSize: 12,
        color: color.yellow,
    },
    inputPicker: {
        width: 200,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.white,
        margin: 16

    },
    inputPickerItem: {
        // backgroundColor: color.white,
    },
    headerLogo: {
        flex: 1,
        // marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    }
})






