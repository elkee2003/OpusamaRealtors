import { StyleSheet,  } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:35,
        backgroundColor:'rgba(0,0,0,0.4)'
    },
    iconContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    backIconContainer:{
        marginLeft:15,
    },
    forwardIconContainer:{
        marginRight:15,
    },
    icon:{
        color:'#e3e3e4',
        fontSize:40,
    },
    mediaContainer:{
        position:'relative',
        height:350,
        width:220,
        backgroundColor:'#aeaebb',
        borderRadius:20,
    },
    mediaFullDisplayContainer:{
        justifyContent:'center',
        alignItems:'center',
        gap:5,
    },
    removebtn:{
        position:'absolute',
        color: '#c70f0f',
        top:-350,
        right:0,
        fontSize:40,
    },
    media:{
        height:"100%",
        width:"100%",
        borderRadius:20,
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
