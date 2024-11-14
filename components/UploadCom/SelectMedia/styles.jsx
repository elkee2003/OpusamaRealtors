import { StyleSheet, } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    icon:{
        color:'#060647',
        fontSize:100,
        alignSelf:"center",
    },
    txt:{
        fontSize:16,
        textAlign:'center',
    },
    disclaimer:{
        marginTop:10,
        fontSize:17,
        fontStyle:'italic',
        fontWeight:'bold',
        textAlign:'center'
    },
    mediaFullDisplayContainer:{
        justifyContent:'center',
        alignItems:'center',
        gap:5,
    },
    mediaContainer:{
        position:'relative',
        height:350,
        width:220,
        backgroundColor:'#aeaebb',
        borderRadius:20,
    },
    media:{
        height:"100%",
        width:"100%",
        borderRadius:20,
    },
})

export default styles
