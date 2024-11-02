import { StyleSheet, } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative',
        marginHorizontal:10,
    },
    row:{
        flexDirection:'column',
    },
    inputDisplay:{
        marginTop:15,
    },
    inputReview:{
        color:'#d1cfcf',
        padding:7,
        fontSize:18,
        marginBottom:5,
        backgroundColor:'#0b0b29',
        borderRadius:15,
    },
    displayLabel: {
        marginTop: 10,
        fontSize:20,
        fontWeight:'bold',
        fontStyle:'italic',
    },
    btnUpload:{
        padding:10,
        marginVertical:20,
        marginHorizontal:20,
        borderRadius:20,
        alignItems:'center',
        backgroundColor:'#020213'
    },
    uploadTxt:{
        fontSize:25,
        textAlign:'center',
        color:'#fffefe',
    },
    mediaContainer:{
        position:'relative',
        height:210,
        width:150,
        backgroundColor:'#aeaebb',
        borderRadius:10
    },
    media:{
        height:"100%",
        width:"100%",
        resiz:'contain',
        overflow:'hidden',
    },
    mediaFullDisplayContainer:{
        justifyContent:'center',
        alignItems:'center',
        gap:3,
    },
    videoWrapper: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    videoOverlayContainer: {
        position: 'absolute',
        width: '100%',
        height: '30%',
        top:70,
        flexDirection: 'row',
    },
    videoOverlayLeft: {
        flex: 1,
    },
    videoOverlayCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoOverlayRight: {
        flex: 1,
    },
})

export default styles
