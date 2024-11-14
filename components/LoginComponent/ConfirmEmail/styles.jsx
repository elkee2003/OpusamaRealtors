import { StyleSheet,} from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:40,
        marginHorizontal:10,
    },
    titleCon:{
        flexDirection:'row',
        width:300,
        alignSelf:'center'
    },
    title:{
        fontSize:22,
        fontWeight:'bold'
    },
    inputSection:{
        alignSelf:'center'
    },
    inputSub:{
        marginTop:20,
        marginBottom:5,
        fontSize:18,
    },
    input:{
        borderWidth:1,
        fontSize:16,
        padding:7,
        width:300,
        borderRadius:10,
    },
    btnCon:{
        width: 300,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:'#0a0635',
        borderRadius:10,
        marginTop:20,
    },
    btnTxt:{
        fontSize:20,
        fontWeight:'bold',
        color:'white'
    },
    secBtnSection:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        // width:300,
        marginTop:10,
        marginHorizontal:35,
    },
    secBtnCon:{
        marginTop:15,
    },
    secBtnTxt:{
        fontSize:18,
        fontWeight:'bold',
        color:'#0a0635'
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    errorBorder: {
        borderColor: 'red',
    },
})

export default styles
