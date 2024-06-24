import { StyleSheet, } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
    },
    contentContainer: {
        justifyContent: 'center',
        gap:4,
    },
    imageUploadContainer:{
        height:130,
        width:130,
        borderRadius:35,
        backgroundColor:'#a2a2a8',
        justifyContent:'center',
        marginVertical:8,
        alignSelf:'center',
    },
    image:{
        height:'100%',
        width:'100%',
        borderRadius:20,
    },
    imgUploadTxt:{
        color:'#186cda',
        alignSelf:"center",
        fontWeight:'bold',
    },
    label:{
        color:'#02061b',
        fontSize:15,
        fontStyle:'italic',
        marginLeft:5,
        marginTop:10,
    },
    input:{
        padding:10,
        borderWidth:3,
        borderColor:'#02061b', 
        borderRadius:20, 
        fontSize:15,
    },
    btnUpload:{
        padding:10,
        marginBottom:20,
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
    error:{
        marginLeft:5,
        marginBottom:14,
        color:'red',
        fontStyle:'italic'
    },
})

export default styles
