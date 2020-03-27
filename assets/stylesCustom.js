import { StyleSheet, Dimensions } from "react-native";


const color = {
    white: "rgb(255,255,255)",
    colorBackGrouds: 'rgba(192,192,192, 100)',
    yellow: 'rgb(255,195,11)',
}

export const main = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: color.colorBackGrouds,
        padding: 10,
        paddingTop: 24,
    },
});

export const padding = StyleSheet.create({
    small: { padding: 16 }
})

export const margin = StyleSheet.create({
    small: { marginTop: 0 },

});

export const flexTall = StyleSheet.create({
    flex12: { flex: 12 },
    flex10: { flex: 10 },
    flex8: { flex: 8 },
    flex6: { flex: 6 },
    flex4: { flex: 4 },
    flex3: { flex: 3 },
    flex2: { flex: 2 },

})

export const positions = StyleSheet.create({
    start: { alignItems: 'flex-start' },
    end: { alignItems: 'flex-end' },
    center: { alignItems: 'center' }

});

export const styleImage = StyleSheet.create({
    imageCouturierMap: {
        width: 32,
        height: 32,
        resizeMode: "cover",
        borderRadius: 256
    },
});




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
        width: 256,
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






