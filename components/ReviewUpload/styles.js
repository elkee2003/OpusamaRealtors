import { StyleSheet, } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative',
        marginTop:35,
        marginHorizontal:15,
    },
    backIconContainer:{
        position:'absolute',
        left:0,
        top:10,
    },
    icon:{
        color:'#020216',
        fontSize:40,
    },
    controlbtn:{
        fontSize:30,
        color:'blue',
    },
    header:{
        fontSize:34,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:10
    },
    inputDisplay:{
        marginTop:15,
    },
    inputReview:{
        fontSize:22,
        fontWeight: 'bold',
        marginBottom:5
    },
    displayLabel: {
        marginTop: 10,
        fontSize:18,
        fontStyle:'italic'
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
       
    },
    media:{
        height:"100%",
        width:"100%",

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
        height: '100%',
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
