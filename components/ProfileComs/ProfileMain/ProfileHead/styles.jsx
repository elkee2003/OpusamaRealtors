import { StyleSheet, } from 'react-native'

const styles = StyleSheet.create({
    container:{
        position:'relative',
        marginTop:30,
        marginHorizontal:20,
    },
    dotCon:{
        position:'absolute',
        top:20,
        right:0,
    },
    icon:{
        fontSize:25,
    },
    profilePicContainer:{
        height:130,
        width:130,
        borderRadius:35,
        backgroundColor:'#a2a2a8',
        justifyContent:'center',
        marginTop:10,
        marginBottom:5,
        position:'relative',
        overflow: 'hidden', 
    },
    plusIcon:{
        position:'absolute',
        top:-40,
        left:105,
        backgroundColor:'transparent',
    },
    img:{
        width:'100%',
        height:'100%',
        resizeMode:"contain",
        borderRadius:35,
    },
    row:{
        flexDirection:'row',
        gap:10,

        alignItems:'center'
    },
    name:{
        flex:1,
        fontSize:20,
        fontWeight:"bold",
        color:'#01011b',
    },
    txt:{
        flex:1,
        fontSize:15,
        color:'#01011b'
    },
    txtDesc:{
        flex:1,
        fontSize:15,
        fontWeight:'bold',
        color:'#484849'
    },
    readMoreLess:{
        color:'#009b0f',
    },
    profileSubrow:{
        marginVertical:15,
        flexDirection:'row',
        justifyContent:'space-around',
        gap:20,
    },
    subHeaderContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.1)',
        borderRadius:20,
        paddingHorizontal:5,
        paddingVertical:7,
    },

    subHeader:{
      fontSize:17,  
      fontWeight:'bold'
    },
})

export default styles;
