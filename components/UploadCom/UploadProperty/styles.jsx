import { StyleSheet, } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative',
        marginTop:35,

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
    header:{
        fontSize:34,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:10
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
})

export default styles
