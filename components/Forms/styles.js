import { StyleSheet, } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:35,
        marginHorizontal:10,
    },
    contentContainer: {
        justifyContent: 'center',
        gap:4,
    },
    header:{
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:10,
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
    reviewTxt:{
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
