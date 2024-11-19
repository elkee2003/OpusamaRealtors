import { StyleSheet, Dimensions } from 'react-native'
import {Colors} from '../../../constants/Colors'

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginVertical:40,

    },
    logo:{
        resizeMode:'contain', 
        width:50,
        height:50,
        alignSelf:'center',
    },
    noListings:{
        textAlign:'center',
        fontWeight:'bold',
        color:'#afadad',
        fontSize:30,
        top:'40%',
        marginHorizontal:10,
    },
    loading:{
        color:' #050525',
    },
})

export default styles;
