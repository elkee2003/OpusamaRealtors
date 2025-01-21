import { StyleSheet, } from 'react-native'

const styles = StyleSheet.create({
    container:{
        // flex:1,
        // marginTop:40,
        // marginHorizontal:10,
    },
    card:{
        padding:10,
        gap:5,
        backgroundColor:'#dbdada',
        borderRadius:20,
        marginTop:10,
        marginBottom:5,
    },
    details:{
        fontSize:16,
    },
    detailsSub:{
        fontWeight:'bold',
    },
    statusRow:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
    },
    status:{
        fontSize:16,
        fontWeight:'bold',
    },
    greenIcon:{
        width:10,
        height:10,
        borderRadius:5,
        backgroundColor:'#03eb03',
    },
    redIcon:{
        width:10,
        height:10,
        borderRadius:5,
        backgroundColor:'#eb1e03',
    },
    accOwner:{
        color:'#464545',
        fontStyle:'italic'
    },
})

export default styles;
