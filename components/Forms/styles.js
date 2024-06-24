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
    mediaUploadContainer:{
        height:300,
        width:'100%',
        borderRadius:35,
        backgroundColor:'#a2a2a8',
        justifyContent:'center',
        marginVertical:8,
    },
    media:{
        height:200,
        width:150,
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
    btnReview:{
        padding:10,
        marginBottom:20,
        marginHorizontal:50,
        borderRadius:20,
        borderWidth:2,
        borderColor:'#020213',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.1)'
    },
    uploadTxt:{
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center',
        color:'#020213',
    },
    error:{
        marginLeft:5,
        marginBottom:14,
        color:'red',
        fontStyle:'italic'
    },

})

export default styles
